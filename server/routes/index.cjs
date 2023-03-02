const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const http = require('http')

let codeTree = {}
const dir = path.join(__dirname, '../public/App.js')

/**
 * @description 根据最新的依赖树更新模板文件
 */
router.post('/setCodeTree', async (ctx, next) => {
  const { codeObj } = (ctx.request.body)
  codeTree = codeObj
  const source = codeTree.root[0]['App.js']
  //得到依赖树写入模板
  const code = prettier.format(source, { semi: false, parser: "babel" });
  const writer = fs.createWriteStream(dir)
  writer.write(code)
  ctx.body = { code: 200, data: null, message: 'success' }
})

router.get('/project', async (ctx, next) => {
  ctx.set('Content-Type', 'multipart/form-data')
  ctx.body = fs.createReadStream(dir)
})

module.exports = router