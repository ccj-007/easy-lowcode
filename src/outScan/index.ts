/**
 * 构建文件依赖树
 */
import LANG_MAPS from "./origin";
import { clone, cloneDeep } from "lodash";

interface CodeOption {
  langs: 'vue' | 'react'
}

export function getFileCodeTree(globalObj: any, options: CodeOption = {
  langs: 'react'
}) {
  const MAP = LANG_MAPS[options.langs] as any
  const {COMPONENTS_TREE, FILE_TREE, IMPORT_TREE} = MAP
  let compStrs = ''
  if(globalObj.content.find((item: any) => item == null)) {
    throw new Error("内容存在空数据，无法出码")
  }
  const len = globalObj.content.length
  for (let i = 0; i < len; i++) {
    const comp = globalObj.content[i]
    if(comp.componentName) {
      let str = COMPONENTS_TREE[comp.componentName]
      let suffix = i === len - 1 ?  '' : '\n      '
      let res = str.replace(/{{children}}/ig, comp.componentName).replace(/{{id}}/ig, '"' + comp.id + '"') + suffix
      compStrs += res
    }
  }
  const res = FILE_TREE.root[0]['App.js'].replace(/{{importURL}}/ig, IMPORT_TREE[0]).replace(/{{compContent}}/ig, compStrs)
  FILE_TREE.root[0]['App.js'] = res
  return FILE_TREE 
}