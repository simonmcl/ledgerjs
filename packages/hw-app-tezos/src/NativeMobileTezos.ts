/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/



/*
This is a version of the original hw-app-tezos file, but modifed to be more
friendly to native mobile applications, not using React Native. This file needs to be
built sperately using the included web-pack file and imported to a swift application,
and leveraged using JSContext
*/



import invariant from "invariant";
import bs58check from "bs58check";
import blake2b from "blake2b";




/*
Native Transport

Modified version of react-native-hw-trasnport-ble. The construnctor takes in a write function,
that will be bound to a ntaive swift function during setup. This allows the JS code to invoke
the native Swift bluetooth functions
*/
class NativeTransport {
	
	mtuSize = 20;
	nativeWriteFunction: (data: String) => void;
	
	constructor(nativeWriter: (data: String) => void) {
		this.nativeWriteFunction = nativeWriter
	}
	
	send = async (cla: number, ins: number, p1: number, p2: number, data: Buffer = Buffer.alloc(0)): Promise<Buffer> => {

		const buffer = Buffer.concat([
			Buffer.from([cla, ins, p1, p2]),
			Buffer.from([data.length]),
			data,
		])

		const msgIn = buffer.toString("hex")
		this.nativeWriteFunction(msgIn)

		return buffer
	};

	setScrambleKey() { }
}





/*
APDU handling
*/
const TagId = 0x05;

function chunkBuffer(buffer: Buffer, sizeForIndex: (arg0: number) => number): Array<Buffer> {
	const chunks: Buffer[] = [];

	for (let i = 0, size = sizeForIndex(0); i < buffer.length; i += size, size = sizeForIndex(i)) {
		chunks.push(buffer.slice(i, i + size));
	}

	return chunks;
}

/*
Take the entire data, wrap it up in an APDU and "chunk" the data into the correct sized packets.
Native mobile can't receive many packets, so instead return a single string with spaces seperating each packet.
It will be up to the native code to seperate this into multiple strings and send each one.

Also removed the returned Observable. Its up to the native code to detect errors and decide whether or not to
call the next function, or surface an error to the user.
*/
const sendAPDU = (apduString: string, mtuSize: number): String => {

	let apdu = new Buffer(apduString, "hex")

	const chunks = chunkBuffer(apdu, (i) => mtuSize - (i === 0 ? 5 : 3)).map((buffer, i) => {
		const head = Buffer.alloc(i === 0 ? 5 : 3);
		head.writeUInt8(TagId, 0);
		head.writeUInt16BE(i, 1);

		if (i === 0) {
			head.writeUInt16BE(apdu.length, 3);
		}

		return Buffer.concat([head, buffer]);
	});

	var chunkedString = ""

	for (const chunk of chunks) {
		chunkedString += chunk.toString("hex")
		chunkedString += " "
	}

	return chunkedString;
};


/*
Its up to the native code to package all the packets into a single string.
This function will then return an object of { data: String ("hex"), error: String}.

Its up to the native code to handle all these situations, its not posisble (or incredibly complicated)
to keep passing data in / out.
*/
const receiveAPDU = (apduString: string): any => {

	let apdu = new Buffer(apduString, "hex")

	let notifiedIndex = 0;
	let notifiedDataLength = 0;
	let notifiedData = Buffer.alloc(0);

	const tag = apdu.readUInt8(0);
	const index = apdu.readUInt16BE(1);
	let data = apdu.slice(3);

	if (tag !== TagId) {
		return { data: "null", error: "Invalid tag " + tag.toString(16) };
	}

	if (notifiedIndex !== index) {
		return { data: "null", error: "BLE: Invalid sequence number. discontinued chunk. Received " + index + " but expected " + notifiedIndex }
	}

	if (index === 0) {
		notifiedDataLength = data.readUInt16BE(0);
		data = data.slice(2);
	}

	notifiedIndex++;
	notifiedData = Buffer.concat([notifiedData, data]);

	if (notifiedData.length > notifiedDataLength) {
		return { data: "null", error: "BLE: received too much data. discontinued chunk. Received " + notifiedData.length + " but expected " + notifiedDataLength };
	}

	if (notifiedData.length === notifiedDataLength) {
		return { data: notifiedData.toString("hex"), error: "null" };
	}

	return { data: "null", error: "null" }
};





/*
Tezos App

Modified version of the Tezos app in the same directory. Async methods have been turned into non-async public methods.
Instead of subscribing to observable from transport, the transport function is called and control passed to that.
Its the responsiblity of the native swift code to then call the correspoding function to complete the process,
by formatting or using the data that comes back
*/
const TezosCurves = {
	ED25519: 0x00,
	SECP256K1: 0x01,
	SECP256R1: 0x02,
};
 
type Curve = typeof TezosCurves[keyof typeof TezosCurves];

type GetAddressResult = {
	address: string;
	publicKey: string;
};
 
type SignOperationResult = {
	signature: string;
};
 
type GetVersionResult = {
	major: number;
	minor: number;
	patch: number;
	bakingApp: boolean;
};

/**
* Tezos API
*
* @example
* import Tezos from "@ledgerhq/hw-app-tezos";
* const tez = new Tezos(transport)
*/
 
class Tezos {
	transport: NativeTransport;
 
	constructor(transport: NativeTransport) {
		this.transport = transport;
	}
 
	/**
	Modified to be a non-async public method, returning void. 
	The purpose of this function is to generate the APDU needed to fetch the data, and then pass that APDU to the native Swift code.
	Swift will then get the response, pass it into a receiveAPDU and call the convert function `convertAPDUtoAddress` with the result



	* get Tezos address for a given BIP 32 path.
	* @param path a path in BIP 32 format, must begin with 44'/1729'
	* @option options.verify optionally enable or not the display
	* @option options.curve
	* @option options.ins to use a custom apdu. This should currently only be unset (which will choose
			an appropriate APDU based on the boolDisplay parameter), or else set to 0x0A
			for the special "display" APDU which uses the alternate copy "Your Key"
	* @return an object with address, publicKey
	* @example
	* tez.getAddress("44'/1729'/0'/0'").then(o => o.address)
	* tez.getAddress("44'/1729'/0'/0'", { verify: true })
	*/
	public getAddress(path: string, options: {verify?: boolean; curve?: Curve; ins?: number; /* TODO specify*/ } = {}): void {
		const cla = 0x80;
		let ins = options.ins;
 
		if (!ins) {
			if (options.verify) {
				ins = 0x03;
			} else {
				ins = 0x02;
			}
		}
 
		const p1 = 0;
		const p2 = options.curve || 0;
		const paths = splitPath(path);
		const buffer = Buffer.alloc(1 + paths.length * 4);

		buffer[0] = paths.length;
		paths.forEach((element, index) => {
			buffer.writeUInt32BE(element, 1 + 4 * index);
		});

		this.transport.send(cla, ins, p1, p2, buffer);
	}
	
	/*
	Modified to be a non-async public method, returning void. 
	The purpose of this function is to generate the APDU needed to fetch the data, and then pass that APDU to the native Swift code.
	Swift will then get the response, pass it into a receiveAPDU and call the convert function `convertAPDUtoSignature` with the result
	*/
	public signOperation(path: string, rawTxHex: string, parse: Boolean, options: {curve?: Curve;} = {}): void {
		const curve = options.curve || 0;
		const instruction = parse ? 0x04 : 0x05
		const paths = splitPath(path);
		let offset = 0;
		
		const rawTx = Buffer.from(rawTxHex, "hex");
		const toSend: Buffer[] = [];
		
		// Initial key setting
		{
			const buffer = Buffer.alloc(paths.length * 4 + 1);
			buffer[0] = paths.length;
			paths.forEach((element, index) => {
				buffer.writeUInt32BE(element, 1 + 4 * index);
			});
			toSend.push(buffer);
		}
 
		while (offset !== rawTx.length) {
			const maxChunkSize = 230;
			let chunkSize;
 
			if (offset + maxChunkSize >= rawTx.length) {
				chunkSize = rawTx.length - offset;
			} else {
				chunkSize = maxChunkSize;
			}
 
			const buffer = Buffer.alloc(chunkSize);
			rawTx.copy(buffer, 0, offset, offset + chunkSize);
			toSend.push(buffer);
			offset += chunkSize;
		}
 
		let response;
 
		for (let i = 0; i < toSend.length; i++) {
			const data = toSend[i];
			let code = 0x01;
 
			if (i === 0) {
				code = 0x00;
			} else if (i === toSend.length - 1) {
				code = 0x81;
			}
 
			this.transport.send(0x80, instruction, code, curve, data);
		}
	}
 
	async getVersion(): Promise<GetVersionResult> {

		const [appFlag, major, minor, patch] = await this.transport.send(
			0x80,
			0x00,
			0x00,
			0x00,
			Buffer.alloc(0)
		);

		const bakingApp = appFlag === 1;
		return {
			major,
			minor,
			patch,
			bakingApp,
		};
	}
}

function convertAPDUtoAddress(hex: string): any {
	let payload = new Buffer(hex, "hex")
 
	const publicKeyLength = payload[0];
	if (!publicKeyLength) {
		// it seems to be a bug that apps returns empty answer
		return { error: "invalid public key" }
	}

	const publicKey = payload.slice(1, 1 + publicKeyLength);
	const res: GetAddressResult = {
		publicKey: publicKey.toString("hex"),
		address: encodeAddress(publicKey, 0),
	};

	return res;
}

function convertAPDUtoSignature(hex: string): any {
	let response = new Buffer(hex, "hex")

	invariant(response, "hw-app-xtz: response is set");
	const signature = response.slice(0, response.length - 2).toString("hex");
		
	return { signature: signature };
}
 
// TODO use bip32-path library
function splitPath(path: string): number[] {
	const result: number[] = [];
	const components = path.split("/");
	
	components.forEach((element) => {
		let number = parseInt(element, 10);
 
		if (isNaN(number)) {
			return; // FIXME shouldn't it throws instead?
		}
 
		if (element.length > 1 && element[element.length - 1] === "'") {
			number += 0x80000000;
		}
 
		result.push(number);
	});

	return result;
}
 
type CurveData = {
	pkB58Prefix: Buffer;
	pkhB58Prefix: Buffer;
	compressPublicKey: (publicKey: Buffer, curve: Curve) => Buffer;
};
 
const compressPublicKeySECP256 = (publicKey: Buffer, curve: Curve) => Buffer.concat([
	Buffer.from([curve, 0x02 + (publicKey[64] & 0x01)]),
	publicKey.slice(1, 33),
]);
 
const curves: Array<CurveData> = [
	{
		pkB58Prefix: Buffer.from([13, 15, 37, 217]),
		pkhB58Prefix: Buffer.from([6, 161, 159]),
		compressPublicKey: (publicKey: Buffer, curve: Curve) => {
			publicKey = publicKey.slice(0);
			publicKey[0] = curve;
			return publicKey;
		},
	},
	{
		pkB58Prefix: Buffer.from([3, 254, 226, 86]),
		pkhB58Prefix: Buffer.from([6, 161, 161]),
		compressPublicKey: compressPublicKeySECP256,
	},
	{
		pkB58Prefix: Buffer.from([3, 178, 139, 127]),
		pkhB58Prefix: Buffer.from([6, 161, 164]),
		compressPublicKey: compressPublicKeySECP256,
	},
];
 
const encodeAddress = (publicKey: Buffer, curve: Curve) => {
	const curveData = curves[curve];
	invariant(curveData, "%s curve not supported", curve);
	const publicKeyBuf = curveData.compressPublicKey(publicKey, curve);
	const key = publicKeyBuf.slice(1);
	const keyHashSize = 20;
	
	let hash = blake2b(keyHashSize);
	hash.update(key);
	hash.digest((hash = Buffer.alloc(keyHashSize)));
	
	const address = bs58check.encode(
		Buffer.concat([curveData.pkhB58Prefix, hash])
	);

	return address;
};



/*
Module Exports
*/

module.exports = {
	TezosCurves: TezosCurves,
	Tezos: Tezos,
	convertAPDUtoAddress: convertAPDUtoAddress,
	convertAPDUtoSignature: convertAPDUtoSignature,
	NativeTransport: NativeTransport,
	sendAPDU: sendAPDU,
	receiveAPDU: receiveAPDU
}