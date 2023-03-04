/**
 * 模板暂时用的react
 */
const COMPONENTS_TREE = {
'Button': `<div id={{id}} className='e-button'><button>{{children}}</button></div>`,
}   

const FILE_TREE = {
'root': [{
  'App.js': `
  {{importURL}}
  const App = (props) => {
    return (
      <>
        目前暂时使用的是react, 非vue
        {{compContent}}
      </>
    )
  }
  export default App`
}]
}

const IMPORT_TREE = ["import React from 'react'"]

const VUE_MAP = {
  COMPONENTS_TREE,
  FILE_TREE,
  IMPORT_TREE
}
export default VUE_MAP