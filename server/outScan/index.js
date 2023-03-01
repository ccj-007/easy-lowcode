/**
 * 前端构建文件依赖树，给后端以生成对应的文件并请求返回
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