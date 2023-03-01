/**
 * 构建文件依赖树
 */
import { COMPONENTS_TREE, FILE_TREE, IMPORT_TREE} from "./origin";

export function getFileCodeTree(globalObj: any) {
  let compStrs = ''
  for (const comp of globalObj.content) {
    let str = COMPONENTS_TREE[comp.componentName]
    let res = str.replace(/{{children}}/ig, comp.componentName).replace(/{{id}}/ig, comp.id)
    compStrs += res
  }
  FILE_TREE.root[0]['App.js'] = FILE_TREE.root[0]['App.js'].replace(/{{importURL}}/ig, IMPORT_TREE[0]).replace(/{{compContent}}/ig, compStrs)
  
  console.log(FILE_TREE.root[0]['App.js']);
  
  return FILE_TREE.root[0]['App.js']
}