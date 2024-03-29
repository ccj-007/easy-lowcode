import React, { useState, useContext } from 'react'
import { Context } from "../App";
import Comps from '../components'
import json, { CompKey } from '../components/jsonObj'
import JsonView from "../view/JsonView";
import CodeView from "../view/CodeView";
import useStore, { addGlobalObj, setActivePanelId } from "@/store";
import { Panel } from '@/types/enum';
type Props = {
  style: React.CSSProperties
  className: string
}

const CompBar = (props: Props) => {
  const ctx = useContext(Context)
  const { isIframe, activePanelId } = useStore(
    (state) => state,
  )

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ctx || !e) return

    const { clientX, clientY } = e
    const mainRef = ctx.mainRef.current

    const { offsetTop, offsetLeft, offsetWidth } = mainRef
    if (isIframe) {
      const iframe = document.getElementsByTagName('iframe')[0] as HTMLIFrameElement
      console.log(iframe?.contentWindow?.document);
    } else {
      if (clientX > offsetLeft && clientX < offsetLeft + offsetWidth && clientY > offsetTop) {
        const CompName = (e.target as HTMLElement).getAttribute('data-name') as CompKey
        CompName && json[CompName] && addGlobalObj(json[CompName])
      }
    }
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

  const togglePanel = (k: Panel) => {
    setActivePanelId(k)
  }

  const PANEL_MAP = {
    '0': {
      title: '物料', jsx: () => {
        return <div>
          {
            Object.entries(Comps).map(([CompName, Comp], index) => {
              return (
                <div key={index}>
                  <div className="sub-title">{CompName}</div>
                  <div className='comp-drag-warp'
                    onDragEnd={(e: React.DragEvent<HTMLDivElement>) => handleDragEnd(e)} data-name={CompName} draggable>
                    <Comp key={CompName}></Comp>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    },
    '1': {
      title: '预览', jsx: () => {
        return <div>
          <JsonView></JsonView>
        </div>
      }
    },
    '2': {
      title: '源码', jsx: () => {
        return <div>
          <button onClick={handleDownload} className='e-button'>下载源码</button>
          <br></br>
          <br></br>
          <CodeView></CodeView>
        </div >
      }
    },
  }

  return (
    <div {...props}>
      <div className='comp-panels flex-center-between'>
        {
          Object.entries(PANEL_MAP).map(([k, panel], index) => {
            return <div key={k} onClick={() => togglePanel((k as Panel))}>
              <div className="main-title" >
                <div className={activePanelId === k ? 'title-active' : ''}>{panel.title}</div>
                {
                  Object.entries(PANEL_MAP).length - 1 !== index && <div className='line-gap'></div>
                }
              </div>
            </div>
          })
        }
      </div>
      {
        PANEL_MAP[activePanelId].jsx()
      }
    </div >
  )
}

export default CompBar