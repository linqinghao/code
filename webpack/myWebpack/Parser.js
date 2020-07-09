const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const { transformFromAst } = require('@babel/core')
const traverse = require('@babel/traverse').default

const Parser = {
  getAst: path => {
    // 读取入口文件
    const content = fs.readFileSync(path, 'utf-8')
    // 将文件内容转换为AST
    return parser.parse(content, { sourceType: 'module' })
  },
  getDependencies: (ast, filename) => {
    const denpendencies = {}
    // 遍历所有模块，存入denpendencies
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        const filePath = './' + path.join(dirname, node.source.value)
        denpendencies[node.source.value] = filePath
      },
    })
    return denpendencies
  },
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return code
  },
}

module.exports = Parser
