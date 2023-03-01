import React, { useState, useContext } from 'react'
import { Context } from "../App";
import Comps from '../components'
import json from '../components/jsonObj'
import JsonView from "../view/JsonView";
import CodeView from "../view/CodeView";

type Props = {
  style: React.CSSProperties
  className: string
}

const CompBar = (props: Props) => {
  const ctx = useContext(Context)
  const { addGlobalObj, setActiveCompId } = ctx
  const handleDrag = (e: any) => {
  }

  const handleDragEnd = (e: any) => {
    const { clientX, clientY } = e
    const mainRef = ctx.mainRef.current
    const globalObj = ctx.globalObj

    const { offsetTop, offsetLeft, offsetWidth } = mainRef
    if (clientX > offsetLeft && clientX < offsetLeft + offsetWidth && clientY > offsetTop) {
      console.log("在主舞台区域");
      const CompName = e.target.getAttribute('data-name')
      //@ts-ignore
      addGlobalObj(json[CompName])
    }

    console.log(offsetTop, offsetLeft, offsetWidth);
  }

  const handleClick = (e: any) => {

  }

  return (
    <div {...props}>
      <div className="main-title">物料区</div>
      {
        Object.entries(Comps).map(([CompName, Comp], index) => {
          return (
            <>
              <div className="sub-title">{CompName}</div>
              <div className='comp-drag-warp' onDrag={handleDrag}
                onDragEnd={handleDragEnd} onClick={handleClick} data-name={CompName} draggable>
                <Comp key={CompName}></Comp>
              </div>
            </>
          )
        })
      }
      <div className='sub-title'>JSON编辑预览</div>
      <JsonView></JsonView>
      <div className='sub-title'>源码预览</div>
      <button onClick={() => { alert('后续会通过后端请求下载') }}>出码</button>
      <CodeView></CodeView>

    </div>
  )
}

export default CompBar