/**
 * 抽象工厂模式
 */

function AbstractProduct() {
  this.productName = null;
  this.type = null;
}

AbstractProduct.prototype.call = function() {
  return new Error('you\'re not call abstract method')
}