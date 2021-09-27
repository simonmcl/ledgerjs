import { Observable } from "rxjs";
// import { log } from "@ledgerhq/logs";

const TagId = 0x05;

function chunkBuffer(buffer: Buffer, sizeForIndex: (arg0: number) => number): Array<Buffer> {
  const chunks: Buffer[] = [];

  for (let i = 0, size = sizeForIndex(0); i < buffer.length; i += size, size = sizeForIndex(i)) {
      chunks.push(buffer.slice(i, i + size));
  }

  return chunks;
}

const sendAPDU = (write: (data: String) => void, apduString: string, mtuSize: number): Observable<Buffer> => {
    
    let apdu = new Buffer(apduString, "hex")

  const chunks = chunkBuffer(apdu, (i) => mtuSize - (i === 0 ? 5 : 3)).map( (buffer, i) => {
      const head = Buffer.alloc(i === 0 ? 5 : 3);
      head.writeUInt8(TagId, 0);
      head.writeUInt16BE(i, 1);

      if (i === 0) {
        head.writeUInt16BE(apdu.length, 3);
      }

      return Buffer.concat([head, buffer]);
    }
  );
  
  
  var chunkedString = ""
  
  for (const chunk of chunks) {
      chunkedString += chunk.toString("hex")
      chunkedString += " "
    }
    write(chunkedString);

  return new Observable((o) => {
  });
};


const receiveAPDU = (apduString: string): any => {
    
  let apdu = new Buffer(apduString, "hex")

let notifiedIndex = 0;
let notifiedDataLength = 0;
let notifiedData = Buffer.alloc(0);
  
const tag = apdu.readUInt8(0);
  const index = apdu.readUInt16BE(1);
  let data = apdu.slice(3);

    if (tag !== TagId) {
      return { data: null, error: "Invalid tag " + tag.toString(16) };
    }

    if (notifiedIndex !== index) {
      return { data: null, error: "BLE: Invalid sequence number. discontinued chunk. Received " + index + " but expected " + notifiedIndex }
    }

    if (index === 0) {
      notifiedDataLength = data.readUInt16BE(0);
      data = data.slice(2);
    }

    notifiedIndex++;
    notifiedData = Buffer.concat([notifiedData, data]);

    if (notifiedData.length > notifiedDataLength) {
      return { data: null, error: "BLE: received too much data. discontinued chunk. Received " + notifiedData.length + " but expected " + notifiedDataLength };
    }

    if (notifiedData.length === notifiedDataLength) {
      return { data: notifiedData.toString("hex"), error: null };
    }

    return { data: null, error: null }
};

module.exports = {
    sendAPDU: sendAPDU,
    receiveAPDU: receiveAPDU
}
