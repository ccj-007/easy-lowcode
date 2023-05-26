import React, { useState, useRef } from 'react'
import { Routes, Route, Outlet } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Navbar, CompBar, Editor, Main, MainPreview } from "./layout";
import _, { cloneDeep } from "lodash";
import json, { getCompId } from "./components/jsonObj";
import Redirect from "./commonComp/Redirect";
import editJSON from "./editor/editObj";
import { getFileCodeTree } from "./outScan/index";
import { GlobalJSON, CompUnion } from './types/json';
import { EditObj } from './types/edit';
import { RootStore } from './types/store';

export const Context = React.createContext<RootStore>({})

const saveJSON = (key: string, data: GlobalJSON | EditObj) => {
  localStorage.setItem(key, JSON.stringify(data))
}
const getJSON = (key: string) => {
  const obj = localStorage.getItem(key)
  return obj ? JSON.parse(obj) : null
}

export const defaultGlobalObj: GlobalJSON = ({
  type: 'page',
  title: '默认标题',
  routeName: 'default',
  initApi: "",
  content: [
    // json.Button,
    // json.Input
  ]
})

function App() {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [globalObj, setGlobalObj] = useState<GlobalJSON>(getJSON('global_json') || defaultGlobalObj)
  const [editObj, setEditObj] = useState<EditObj>(getJSON('edit_json') || editJSON)
  const [codeObj, setCodeObj] = useState({})

  const [activeCompId, setActiveCompId] = useState<string>('')
  const [activeEditId, setActiveEditId] = useState('')
  const [preview, setPreview] = useState(false)
  const [renderPC, setRenderPC] = useState(true)
  const [order, setOrder] = useState(true)
  const [isIframe, setIframe] = useState(false)
  const [layout, setLayout] = useState({
    sidebarWidth: 25,
    editWidth: 20,
  })

  const addGlobalObj = (data: CompUnion) => {
    if (!data && typeof data !== 'object') return
    let newGlobalObj = _.cloneDeep(globalObj)
    newGlobalObj.content = newGlobalObj.content.filter((item: CompUnion) => item)
    const id = getCompId()
    data.id = id
    newGlobalObj.content.push(data)
    setGlobalObj(newGlobalObj)
    saveJSON('global_json', newGlobalObj)
    id && setActiveCompId(id)
  }

  const editGlobalObj = (target: string, value: unknown) => {
    let newData = _.cloneDeep(globalObj)
    let selectComp = newData.content.find((item: CompUnion) => item.id === activeCompId)
    selectComp && _.set(selectComp.data, target, value)
    setGlobalObj(newData)
    saveJSON('global_json', newData)
  }
  const saveGlobalObj = (data: GlobalJSON) => {
    setGlobalObj(data)
    saveJSON('global_json', data)
  }

  const [selectComp, compName] = React.useMemo(() => {
    const selectComp = globalObj.content.find((item: CompUnion) => item.id === activeCompId)
    const componentName = selectComp ? selectComp.componentName : ''
    return [selectComp, componentName]
  }, [activeCompId])

  const editEditorObj = (target: string, value: unknown) => {
    let newData = _.cloneDeep(editObj)
    if (compName) {
      const selectEdit = newData[compName].find((item: CompUnion) => item.id === activeEditId)
      selectEdit.data[target] = value
    }
    setEditObj(newData)
    saveJSON('edit_json', newData)
  }

  const [selectEdit, editName] = React.useMemo(() => {
    if (compName) {
      const selectEdit = editObj[compName].find((item: CompUnion) => item.id === activeEditId)
      const editName = selectEdit ? selectEdit.type : null
      return [selectEdit, editName]
    }
    return [null, null]
  }, [activeEditId])

  const contentWidth = React.useMemo(() => {
    return (100 - layout.editWidth - layout.sidebarWidth)
  }, [layout])

  React.useEffect(() => {
    if (globalObj.content.length > 0) {
      const comp = globalObj.content[0]
      setActiveCompId(comp.id)
    }

    window.addEventListener('message', function (event) {
      console.log("我是iframe父亲", event);
    }, false);
  }, [])

  React.useEffect(() => {
    const code = getFileCodeTree(globalObj, { langs: 'react' })
    setCodeObj(code)
    if (isIframe) {
      let iframe = document.getElementsByTagName('iframe')[0] as HTMLIFrameElement
      iframe?.contentWindow?.postMessage({ json: globalObj }, "*")
    }
  }, [globalObj])

  return (
    <Context.Provider value={{
      mainRef,
      globalObj,
      setGlobalObj,
      saveGlobalObj,
      compName,
      selectComp,
      activeCompId,
      setActiveCompId,
      addGlobalObj,
      editGlobalObj,
      editObj,
      setEditObj,
      activeEditId,
      setActiveEditId,
      selectEdit,
      editName,
      editEditorObj,
      preview,
      setPreview,
      renderPC,
      setRenderPC,
      order,
      setOrder,
      codeObj,
      setCodeObj,
      layout,
      setLayout,
      isIframe,
      setIframe
    }}>
      <div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes >
            <Route
              path="/"
              element={<Redirect to="/edit" />}
            />
            <Route element={
              <div className='layout-main'>
                {/* 根路由——非预览状态可以编辑 */}
                {
                  !preview && <CompBar className='layout-base ' style={{ width: layout.sidebarWidth + 'vw', padding: layout.sidebarWidth ? '10px' : '0' }} ></CompBar>
                }
                <Outlet></Outlet>
                {
                  !preview && <Editor className='layout-base ' style={{ width: layout.editWidth + 'vw', padding: layout.editWidth ? '10px' : '0' }}></Editor>
                }
              </div>
            } path="/" >

              {/* outlet嵌入组件 */}
              <Route element={<Main className='layout-base' style={{ width: contentWidth + 'vw' }} ref={mainRef} ></Main>}
                path="/edit"
              ></Route>
              <Route element={<MainPreview className='layout-base' ref={mainRef} style={{ width: '100vw' }}>我是预览的</MainPreview>}
                path="/preview"
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider >
  )
}

export default App
