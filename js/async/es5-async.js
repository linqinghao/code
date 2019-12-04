"use strict";

function foo() {
  var ret;
  return regeneratorRuntime.async(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bar());

        case 2:
          ret = _context.sent;
          console.log(ret);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function bar() {
  return regeneratorRuntime.async(function bar$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", 'hello bar');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

foo();
