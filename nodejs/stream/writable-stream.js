/**
 * 可写流
 */

const { Writable } = require("stream");

class LowerWritable extends Writable {
  constructor(options) {
    super(options);
    this._data = "";
  }

  _write(chunk, encoding, callback) {
    try {
      chunk = encoding === "buffer" ? chunk.toString() : chunk;
      this._data += chunk.toLocaleLowerCase();
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  _final(callback) {
    this._data += "\nfinish";
    callback(null);
  }
}

const lw = new LowerWritable();
lw.write("HELLO ");
lw.write(Buffer.from("WORLD!"));
lw.end();

lw.on("finish", () => {
  console.log(lw._data);
});
