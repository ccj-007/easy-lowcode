/**
 * 这里分为低代码组件的依赖树、代码主体的依赖树、导入依赖的树，也就意味着你可以抽象成一个配置生产最终的代码，并跨平台
 */
const COMPONENTS_TREE = {
'Button': `<div id={{id}}><button>{{children}}</button></div>`,
'Input': `<input id={{id}} className='e-input' placeholder='{{placeholder}}' {...props} />`
}   

const FILE_TREE = {
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

const IMPORT_TREE = ["import React from 'react'"]

const REACT_MAP = {
  COMPONENTS_TREE,
  FILE_TREE,
  IMPORT_TREE
}
export default REACT_MAP