import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Outlet } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Navbar, CompBar, Editor, Main, MainPreview } from "./layout";
import _, { cloneDeep } from "lodash";
export const Context = React.createContext<any>('')
import json, { getCompId } from "./components/jsonObj";
import Redirect from "./commonComp/Redirect";
import editJSON from "./editor/editObj";
import { getFileCodeTree } from "./outScan/index";

const saveJSON = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
const getJSON = (key: string) => {
  const obj = localStorage.getItem(key)
  return obj ? JSON.parse(obj) : null
}

export const defaultGlobalObj = ({
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
  const mainRef = useRef<any>(null)
  const [globalObj, setGlobalObj] = useState<any>(getJSON('global_json') || defaultGlobalObj)
  const [editObj, setEditObj] = useState<any>(getJSON('edit_json') || editJSON)
  const [codeObj, setCodeObj] = useState({})

  const [activeCompId, setActiveCompId] = useState<null | string>(null)
  const [activeEditId, setActiveEditId] = useState(null)
  const [preview, setPreview] = useState(false)
  const [renderPC, setRenderPC] = useState(true)
  const [order, setOrder] = useState(true)
  const [isIframe, setIframe] = useState(false)
  const [layout, setLayout] = useState({
    sidebarWidth: 25,
    editWidth: 20,
  })

  const addGlobalObj = (data: any) => {
    if (!data && typeof data !== 'object') return
    let newGlobalObj = _.cloneDeep(globalObj)
    newGlobalObj.content = newGlobalObj.content.filter((item: any) => item)
    const id = getCompId()
    data.id = id
    newGlobalObj.content.push(data)
    setGlobalObj(newGlobalObj)
    saveJSON('global_json', newGlobalObj)
    id && setActiveCompId(id)
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

  const contentWidth = React.useMemo(() => {
    return (100 - layout.editWidth - layout.sidebarWidth)
  }, [layout])

  React.useEffect(() => {
    //默认选中
    if (globalObj.content.length > 0) {
      const comp = globalObj.content[0]
      setActiveCompId(comp.id)
    }
  }, [])

  React.useEffect(() => {
    const code = getFileCodeTree(globalObj, { langs: 'react' })
    setCodeObj(code)

    if (isIframe) {
      let iframe = document.getElementsByTagName('iframe')[0] as any
      iframe.contentWindow.postMessage({ json: globalObj }, "*")
      // window.addEventListener('message', function (event) {
      //   console.log("我是iframe父亲", event);
      // }, false);
    }
  }, [globalObj])

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
      editEditorObj,
      //是否预览
      preview,
      setPreview,
      //默认渲染PC
      renderPC,
      setRenderPC,
      //编排
      order,
      setOrder,
      //code
      codeObj,
      setCodeObj,
      //布局
      layout,
      setLayout,
      //iframe
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
              <Route element={<Main Main className='layout-base' style={{ width: contentWidth + 'vw' }} ref={mainRef} ></Main>}
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
