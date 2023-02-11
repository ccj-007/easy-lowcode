import React, { useState, useRef, useMemo } from 'react'
import './App.css'
import Navbar from "./layout/Navbar";
import CompBar from './layout/CompBar';
import Editor from './layout/Editor';
import Main from './layout/Main';
import _, { values } from "lodash";
import { v4 as uuidv4 } from 'uuid';
export const Context = React.createContext<any>('')
import json, { getCompId } from "./components/jsonObj";
import editJSON from "./editor/editObj";

const saveJSON = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
const getJSON = (key: string) => {
  return JSON.parse(localStorage.getItem(key))
}

export const defaultGlobalObj = ({
  page: 'default',
  content: [
    // json.Button,
    // json.Input
  ]
})

function App() {
  const mainRef = useRef<any>(null)
  const [globalObj, setGlobalObj] = useState<any>(getJSON('global_json') || defaultGlobalObj)
  const [editObj, setEditObj] = useState<any>(getJSON('edit_json') || editJSON)

  const [activeCompId, setActiveCompId] = useState(null)
  const [activeEditId, setActiveEditId] = useState(null)

  const addGlobalObj = (data: any) => {
    let newData = _.cloneDeep(data)
    newData.id = getCompId()
    let newGlobalObj = { ...globalObj, content: [...globalObj.content, newData] }
    setGlobalObj(newGlobalObj)
    saveJSON('global_json', newGlobalObj)
    setActiveCompId(newData.id)
  }
  const editGlobalObj = (target: any, value: any) => {
    let newData = _.cloneDeep(globalObj)
    let selectComp = newData.content.find((item: any) => item.id === activeCompId)
    _.set(selectComp.data, target, value)
    setGlobalObj(newData)
    saveJSON('global_json', newData)
  }
  const saveGlobalObj = (data: any) => {
    setGlobalObj(data)
    saveJSON('global_json', data)
  }

  const editEditorObj = (target: any, value: any) => {
    let newData = _.cloneDeep(editObj)
    const selectEdit = newData[compName].find((item: any) => item.id === activeEditId)
    selectEdit.data[target] = value
    setEditObj(newData)
    saveJSON('edit_json', newData)
  }

  const [selectComp, compName] = React.useMemo(() => {
    const selectComp = globalObj.content.find((item: any) => item.id === activeCompId)
    const componentName = selectComp ? selectComp.componentName : null
    return [selectComp, componentName]
  }, [activeCompId])

  const [selectEdit, editName] = React.useMemo(() => {
    if (compName) {
      const selectEdit = editObj[compName].find((item: any) => item.id === activeEditId)
      const editName = selectEdit ? selectEdit.type : null
      return [selectEdit, editName]
    }
    return [null, null]
  }, [activeEditId])

  React.useEffect(() => {
    //默认选中
    if (globalObj.content.length > 0) {
      const comp = globalObj.content[0]
      setActiveCompId(comp.id)
    }
  }, [])

  return (
    <Context.Provider value={{
      mainRef: mainRef,
      //主舞台组件
      globalObj,
      setGlobalObj,
      saveGlobalObj,
      compName,
      selectComp,
      activeCompId,
      setActiveCompId,
      addGlobalObj,
      editGlobalObj,
      //编辑器组件
      editObj,
      setEditObj,
      activeEditId,
      setActiveEditId,
      selectEdit,
      editName,
      editEditorObj
    }}>
      <div className="App">
        <Navbar></Navbar>
        <div className='layout-main'>
          <CompBar className='layout-base' style={{ width: '20vw' }} ></CompBar>
          <Main className='layout-base' style={{ width: '60vw' }} ref={mainRef} ></Main>
          <Editor className='layout-base' style={{ width: '20vw' }}></Editor>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
