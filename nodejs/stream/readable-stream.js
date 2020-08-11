const { Readable } = require("stream");
const EventEmitter = require("events");

class DataSource extends EventEmitter {
  constructor(str) {
    super();
    this._str = str;
    this._offset = 0;
  }

  read() {
    if (this._offset < this._str.length) {
      // 每次读取一个字符
      this.emit("data", this._str[this._offset]);
      this._offset += 1;
    } else {
      // 读取完成
      this.emit("end");
    }
  }

  stop() {
    this._offset -= 1;
  }
}


class LowerReadable extends Readable {
  constructor(src) {
    super();
    this._src = src;

    this._src.on("data", (chunk) => {
      // 一个字符，一个字符的push，而不是一次性push多个字符
      if (!this.push(chunk.toLocaleLowerCase())) {
        this._src.stop();
      }
      // 这里没必要显示地调用 DataSource.read()，否则爆栈
      // 因为 this._read() 会被一直调用，从而触发 data 事件
      // this._src.read();
    });

    this._src.on("end", () => this.push(null));
  }

  _read(size) {
    // 从数据源读取按照读取一个字符长度的数据
    this._src.read();
  }
}

// test code
const dataSrc = new DataSource("HELLO WORLD!");
const lowerStream = new LowerReadable(dataSrc);
lowerStream.pipe(process.stdout);