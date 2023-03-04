/**
 * 构建文件依赖树
 */
import { COMPONENTS_TREE, FILE_TREE, IMPORT_TREE} from "./origin";

export function getFileCodeTree(globalObj: any) {
  let compStrs = ''
  if(globalObj.content.find((item: any) => item == null)) {
    throw new Error("内容存在空数据，无法出码")
  }
  for (const comp of globalObj.content) {
    let str = COMPONENTS_TREE[comp.componentName]
    let res = str.replace(/{{children}}/ig, comp.componentName).replace(/{{id}}/ig, '"' + comp.id + '"')
    compStrs += res
  }
  FILE_TREE.root[0]['App.js'] = FILE_TREE.root[0]['App.js'].replace(/{{importURL}}/ig, IMPORT_TREE[0]).replace(/{{compContent}}/ig, compStrs)
  
  return FILE_TREE
}