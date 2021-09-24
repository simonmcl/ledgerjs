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


module.exports = {
    sendAPDU: sendAPDU
}
