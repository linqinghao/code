const fs = require('fs')
const path = require('path')
const Parser = require('./Parser')

class Compiler {
  constructor(options) {
    // 配置
    const { entry, output } = options

    // 入口

    this.entry = entry

    // 出口
    this.output = output

    // 模块
    this.modules = []
  }

  // 构建启动
  run() {
    // 解析入口文件
    const info = this.build(this.entry)
    this.modules.push(info)
    this.modules.forEach(({ dependencies }) => {
      // 判断有依赖对象，递归解析所有依赖项
      if (dependencies) {
        for (const dependency in dependencies) {
          this.modules.push(this.build(dependencies[dependency]))
        }
      }
    })
    // 生产依赖关系图
    const dependencyGraph = this.modules.reduce((graph, item) => {
      return {
        ...graph,
        [item.filename]: {
          dependencies: item.dependencies,
          code: item.code,
        },
      }
    }, {})

    this.generate(dependencyGraph)
  }

  build(filename) {
    const { getAst, getDependencies, getCode } = Parser
    const ast = getAst(filename)

    const dependencies = getDependencies(ast, filename)
    const code = getCode(ast)
    return {
      filename,
      dependencies,
      code,
    }
  }

  // 重写require函数，输出bundle
  generate(code) {
    // 输出文件路径
    const filePath = path.join(this.output.path, this.output.filename)
    const bundle = `(function(graph){
      function require(moduleId){ 
        function localRequire(relativePath){
          return require(graph[moduleId].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[moduleId].code);
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`

    // 把文件内容写入到文件系统
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compiler
