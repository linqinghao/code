/**
 * 状态模式
 */

const upperCase = inputString => inputString.toUpperCase()
const lowerCase = inputString => inputString.toLowerCase()
const defaultTransform = inputString => inputString

class TextEditor {
  constructor(transform) {
    this._transform = transform
  }

  setTransform(transform) {
    this._transform = transform
  }

  type(words) {
    console.log(this._transform(words))
  }
}

const editor = new TextEditor(defaultTransform)

editor.type('First line')

editor.setTransform(upperCase)

editor.type('Second line')
editor.type('Third line')

editor.setTransform(lowerCase)

editor.type('Fourth line')
editor.type('Fifth line')

// Output:
// First line
// SECOND LINE
// THIRD LINE
// fourth line
// fifth line
