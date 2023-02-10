import React, { useState, useContext } from 'react'
import Comps from '../components'
import { Context } from "../App";
import json from '../components/jsonObj'
type Props = {
  style: React.CSSProperties
  className: string
}

const CompBar = (props: Props) => {
  const ctx = useContext(Context)
  const { handleGlobalObj } = ctx
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
      handleGlobalObj(json[CompName])
      console.log(globalObj);
    }

    console.log(offsetTop, offsetLeft, offsetWidth);
  }

  const handleClick = (e) => {

  }

  return (
    <div {...props}>
      组件编辑区域
      <br></br>
      {
        Object.entries(Comps).map(([CompName, Comp], index) => {
          return (
            <>
              {CompName}
              <div className='comp-drag-warp' onDrag={handleDrag}
                onDragEnd={handleDragEnd} onClick={handleClick} data-name={CompName} draggable>
                <Comp key={CompName} ></Comp>
              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default CompBar