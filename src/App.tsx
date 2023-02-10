import React, { useState, useRef, useMemo } from 'react'
import './App.css'
import Navbar from "./layout/Navbar";
import CompBar from './layout/CompBar';
import Editor from './layout/Editor';
import Main from './layout/Main';
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
export const Context = React.createContext<any>('')
import json from "./components/jsonObj";

let defaultGlobalObj = JSON.parse(localStorage.getItem('global_json')) || ({
  page: 'default',
  content: [
    json.Button,
    json.Input
  ]
})

function App() {
  const mainRef = useRef<any>(null)
  const [globalObj, setGlobalObj] = useState<any>(defaultGlobalObj)
  const [activeCompId, setActiveCompId] = useState(null)

  const handleGlobalObj = (data: any) => {
    let newData = _.cloneDeep(data)
    newData.id = uuidv4()
    setGlobalObj({ ...globalObj, content: [...globalObj.content, newData] })
    saveJSON()

  }
  const editGlobalObj = (target: any, value: any) => {
    const selectComp = globalObj.content.find((item: any) => item.id === activeCompId)
    selectComp.data[target] = value
    let newData = _.cloneDeep(globalObj)
    setGlobalObj(newData)
    saveJSON()
  }

  const saveJSON = () => {
    localStorage.setItem('global_json', JSON.stringify(globalObj))
  }

  const [selectComp, compName] = React.useMemo(() => {
    const selectComp = globalObj.content.find((item: any) => item.id === activeCompId)
    const componentName = selectComp ? selectComp.componentName : null
    return [selectComp, componentName]
  }, [activeCompId])

  return (
    <Context.Provider value={{
      mainRef: mainRef,
      globalObj,
      activeCompId,
      compName,
      selectComp,
      handleGlobalObj,
      editGlobalObj
    }}>
      <div className="App">
        <Navbar></Navbar>
        <div className='layout-main'>
          <CompBar className='layout-base' style={{ width: '20vw' }} ></CompBar>
          <Main className='layout-base' style={{ width: '60vw' }} ref={mainRef} setActiveCompId={setActiveCompId}></Main>
          <Editor className='layout-base' style={{ width: '20vw' }}></Editor>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
