const Complier = require('./myWebpack/Compiler')
const options = require('./webpack.config')
new Complier(options).run()
