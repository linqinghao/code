const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const { default: generate } = require('@babel/generator')

function readFile(fileName) {
  // 读取文件
  const content = fs.readFileSync(fileName, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module',
  })
  const dependencies = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(fileName)
      const newFile = './' + path.join(dirname, node.source.value)
      // 保存依赖的模块
      dependencies[node.source.value] = newFile
    },
  })
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  })

  return {
    fileName,
    dependencies,
    code,
  }
}

function genrateGraph(entry) {
  const entryModule = readFile(entry)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    for (let j in dependencies) {
      graphArray.push(readFile(dependencies[j]))
    }
  }

  const graph = {}
  graphArray.forEach(item => {
    graph[item.fileName] = {
      dependencies: item.dependencies,
      code: item.code,
    }
  })
  return graph
}

function generateCode(entry) {
  const graph = JSON.stringify(genrateGraph(entry))
  return `
  (function(graph) {
      //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
      function require(module) {
          //localRequire的本质是拿到依赖包的exports变量
          function localRequire(relativePath) {
              return require(graph[module].dependencies[relativePath]);
          }
          var exports = {};
          (function(require, exports, code) {
              eval(code);
          })(localRequire, exports, graph[module].code);
          return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
      }
      require('${entry}')
  })(${graph})`
}

console.log(generateCode('./test/index.js'))
