/**
 * 前端发送服务端json，服务端通过接口返回给前端对应的源码文件
 */
import Handlebars from "Handlebars";
import fs from "fs";

const source = fs.readFileSync('./Tpl.tsx', 'utf-8')

var template = Handlebars.compile(source);

let globalObj = {}

var data = {
  "name": "默认按钮"
};
var result = template(data);

fs.writeFileSync('./dist/Tpl.tsx', result)

console.log(result);