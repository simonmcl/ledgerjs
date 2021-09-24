import { Transport } from "./Transport";
import { Observable, defer, merge, from } from "rxjs";


class NativeTransport extends Transport {

    mtuSize = 20;
    nativeWriteFunction: (data: String) => void;


    constructor(nativeWriter: (data: String) => void) {
      super();

      this.nativeWriteFunction = nativeWriter

      nativeWriter("inside constructor")
    }



    decorateAppAPIMethods(
      self: Record<string, any>,
      methods: Array<string>,
      scrambleKey: string
    ) {
      for (const methodName of methods) {
        self[methodName] = this.decorateAppAPIMethod(
          methodName,
          self[methodName],
          self,
          scrambleKey
        );
      }
    }

    send = async (cla: number, ins: number, p1: number, p2: number, data: Buffer = Buffer.alloc(0)): Promise<Buffer> => {
      
      const buffer = Buffer.concat([
        Buffer.from([cla, ins, p1, p2]),
        Buffer.from([data.length]),
        data,
      ])
      
      // sendAPDU(this.nativeWriteFunction, buffer, this.mtuSize)

      const msgIn = buffer.toString("hex")
      this.nativeWriteFunction(msgIn)

      return buffer
    };

    setScrambleKey() {}
  }
  
  module.exports = {
    NativeTransport: NativeTransport
  }