/*
 * @Author: chen 596487930@qq.com
 * @Date: 2023-03-02 00:35:38
 * @LastEditors: chen 596487930@qq.com
 * @LastEditTime: 2023-03-03 00:27:40
 * @FilePath: \easy-lowcode\src\outScan\origin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const COMPONENTS_TREE = {
  'Button': `<div id={{id}}><button>{{children}}</button></div>`
}   

export const FILE_TREE = {
  'root': [{
    'App.js': `
    {{importURL}}
    const App = (props) => {
      return (
        <>
         {{compContent}}
        </>
      )
    }
    export default App`
  }]
}

export const IMPORT_TREE = ["import React from 'react'"]

