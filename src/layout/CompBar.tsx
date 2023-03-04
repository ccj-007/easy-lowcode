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
  const { addGlobalObj } = ctx

  const handleDragEnd = (e: any) => {
    const { clientX, clientY } = e
    const mainRef = ctx.mainRef.current

    const { offsetTop, offsetLeft, offsetWidth } = mainRef
    if (clientX > offsetLeft && clientX < offsetLeft + offsetWidth && clientY > offsetTop) {
      const CompName = (e.target as HTMLElement).getAttribute('data-name')
      CompName && json[CompName] && addGlobalObj(json[CompName])
    }
  }

  const handleClick = (e: any) => {

  }

  const handleDownload = () => {
    //这里暂时没有递归依赖树
    fetch('http://localhost:7001/project', {
      method: 'get',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((Body) => {
      return Body.blob()
    }).then((blob) => {
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'App.js';
      link.click();
      window.URL.revokeObjectURL(link.href);
    }).catch(() => {
      alert("请检查是否打开node服务")
    })
  }

  return (
    <div {...props}>
      <div className="main-title">物料区</div>
      {
        Object.entries(Comps).map(([CompName, Comp], index) => {
          return (
            <>
              <div className="sub-title">{CompName}</div>
              <div className='comp-drag-warp'
                onDragEnd={(e) => handleDragEnd(e)} onClick={handleClick} data-name={CompName} draggable>
                <Comp key={CompName}></Comp>
              </div>
            </>
          )
        })
      }
      <div className='sub-title'>JSON编辑预览</div>
      <JsonView></JsonView>
      <div className='sub-title'>源码预览</div>
      <button onClick={handleDownload}>下载源码</button>
      <CodeView></CodeView>
    </div >
  )
}

export default CompBar