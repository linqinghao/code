/**
 * 抽象工厂模式
 */

function MobileAbstractFactory(moblieName, price) {
  this.moblieName = moblieName
  this.price = price
  if (new.target == MobileAbstractFactory) {
    throw new Error("you're not instantiated abstract class")
  }
}



function XiaomiFactory(moblieName, name, model) {
  MobileAbstractFactory.call(this, moblieName, price)
}

function MeizuFactory(moblieName, name) {
  MobileAbstractFactory.call(this, moblieName, price)
}
