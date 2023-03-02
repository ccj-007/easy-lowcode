/*
 * @Author: chen 596487930@qq.com
 * @Date: 2023-03-02 00:34:29
 * @LastEditors: chen 596487930@qq.com
 * @LastEditTime: 2023-03-03 00:25:28
 * @FilePath: \easy-lowcode\src\outScan\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 构建文件依赖树
 */
import { COMPONENTS_TREE, FILE_TREE, IMPORT_TREE} from "./origin";

export function getFileCodeTree(globalObj: any) {
  let compStrs = ''
  for (const comp of globalObj.content) {
    let str = COMPONENTS_TREE[comp.componentName]
    let res = str.replace(/{{children}}/ig, comp.componentName).replace(/{{id}}/ig, '"' + comp.id + '"')
    compStrs += res
  }
  FILE_TREE.root[0]['App.js'] = FILE_TREE.root[0]['App.js'].replace(/{{importURL}}/ig, IMPORT_TREE[0]).replace(/{{compContent}}/ig, compStrs)
  
  console.log(FILE_TREE.root[0]['App.js']);
  
  return FILE_TREE
}