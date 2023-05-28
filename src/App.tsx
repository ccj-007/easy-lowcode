import React, { useState, useRef } from 'react'
import { Routes, Route, Outlet } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Navbar, CompBar, Editor, Main, MainPreview } from "./layout";
import Redirect from "./commonComp/Redirect";
import { getFileCodeTree } from "./outScan/index";
import { CompUnion } from './types/json';
import { RootContext, RootStore } from './types/store';
import useStore, { setActiveCompId, setCodeObj, setCompName, setEditName, setSelectComp, setSelectEdit } from "@/store";
import { CompKey } from './components/jsonObj';
import { notification } from 'antd';

export const Context = React.createContext<RootContext>({
  mainRef: null,
  contextHolder: null,
  api: null
})

function App() {
  const [api, contextHolder] = notification.useNotification();
  const mainRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { globalObj, editObj, activeCompId, activeEditId, preview, layout, compName } = useStore((state) => state)

  React.useMemo(() => {
    const selectComp = globalObj.content.find((item: CompUnion) => item && item.id === activeCompId)
    if (selectComp) {
      const componentName = selectComp.componentName as CompKey
      componentName && setCompName(componentName)
      selectComp && setSelectComp(selectComp)
    }
  }, [activeCompId])

  React.useMemo(() => {
    if (compName && editObj) {
      const selectEdit = (editObj[compName] as any[]).find((item: CompUnion) => item && item.id === activeEditId)
      const editName = selectEdit ? selectEdit.type : null
      setEditName(editName)
      setSelectEdit(selectEdit)
    }
    return [null, null]
  }, [activeEditId])

  const contentWidth = React.useMemo(() => {
    return (100 - layout.editWidth - layout.sidebarWidth)
  }, [layout])

  React.useEffect(() => {
    if (globalObj.content.length > 0) {
      const comp = globalObj.content[0]
      comp && setActiveCompId(comp.id)
    }
  }, [])

  React.useEffect(() => {
    const code = getFileCodeTree(globalObj, { langs: 'react' })
    setCodeObj(code)
  }, [globalObj])

  return (
    <Context.Provider value={{
      mainRef,
      contextHolder,
      api
    }}>
      <div className="App">
        {contextHolder}
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
