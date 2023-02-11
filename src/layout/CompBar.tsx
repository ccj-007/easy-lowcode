import React, { useState, useContext } from 'react'
import Comps from '../components'
import { Context } from "../App";
import json from '../components/jsonObj'
import JsonView from "../jsonView/JsonView";
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
      addGlobalObj(json[CompName])
    }

    console.log(offsetTop, offsetLeft, offsetWidth);
  }

  const handleClick = (e) => {

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
    </div>
  )
}

export default CompBar