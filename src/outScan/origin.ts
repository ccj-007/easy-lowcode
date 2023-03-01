export const COMPONENTS_TREE = {
  'Button': `<div id={{id}}><button>{{children}}</button></div>`
}   

export const FILE_TREE = {
  'root': [{
    'App.js': `
    {{importURL}}
    const App = (props) => {
      return (
        {{compContent}}
      )
    }
    export default App`
  }]
}

export const IMPORT_TREE = ["import React from 'react'"]

