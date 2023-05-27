import React, { DragEvent, useRef } from 'react'
import { useCtx } from "../hooks";
import { defaultGlobalObj } from "../App";
import Comps from '../components'
import MobileView from "../view/MobileView";
import utils from "../utils";
import { produce } from 'immer'
import { CompUnion } from '../types/json'
import _ from 'lodash'
import { getCompId } from "../components/jsonObj";
import MyIframe from '../iframe/MyIframe'
import { AiFillDelete, AiFillFileText } from "react-icons/ai";

type Props = {
  style: React.CSSProperties
  className: string
}

const Main = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement | null>) => {
  const { activeCompId, setActiveCompId, saveGlobalObj, globalObj, renderPC, setGlobalObj, order, layout, setLayout, isIframe } = useCtx()
  const prevY = useRef(0)
  const prevId = useRef('')

  const startDragId = useRef('')
  const endDragId = useRef('')

  /**
   * 上移
   */
  const editUp = () => {
    const newObj = produce(globalObj, (draft) => {
      const { content } = draft
      let idx = content.findIndex(item => item.id === activeCompId)
      if (idx >= 1) {
        [content[idx - 1], content[idx]] = [content[idx], content[idx - 1]]
      } else {
        alert('组件已经在最顶层了')
      }
    })
    setGlobalObj(newObj)
  }
  /**
   * 下移
   */
  const editDown = () => {
    const newObj = produce(globalObj, (draft) => {
      const { content } = draft
      let idx = content.findIndex(item => item.id === activeCompId)
      if (idx < content.length - 1) {
        [content[idx], content[idx + 1]] = [content[idx + 1], content[idx]]
      } else {
        alert('组件已经在最底层了')
      }
    })
    setGlobalObj(newObj)
  }
  /**
   * 上选
   */
  const selectUp = () => {
    let idx = globalObj.content.findIndex(item => item.id === activeCompId)
    if (idx >= 1) {
      let id = globalObj.content[idx - 1].id
      setActiveCompId(id)
    } else {
      alert('无法上选')
    }
  }
  /**
   * 下选
   */
  const selectDown = () => {
    let idx = globalObj.content.findIndex(item => item.id === activeCompId)
    if (idx + 1 <= globalObj.content.length - 1) {
      let id = globalObj.content[idx + 1].id
      setActiveCompId(id)
    } else {
      alert('无法下选')
    }
  }
  /**
   * 删除
   */
  const selectDel = () => {
    const newObj = produce(globalObj, (draft) => {
      let idx = draft.content.findIndex(item => item.id === activeCompId)
      draft.content.splice(idx, 1)
    })
    setGlobalObj(newObj)
  }
  /**1
   * 清空
   */
  const clearJSON = () => {
    saveGlobalObj(defaultGlobalObj)
  }
  /**
   * 复制
   */
  const copy = () => {
    const newObj = produce(globalObj, (draft) => {
      let idx = draft.content.findIndex(item => item.id === activeCompId)
      let copyItem = draft.content.find(item => item.id === activeCompId)
      const newCopyItem: any = _.cloneDeep(copyItem)
      newCopyItem.id = getCompId()
      draft.content.splice(idx, 0, newCopyItem)
    })
    setGlobalObj(newObj)
  }

  /**
   * 拖拽
   * @param e 
   */
  const handleDragOver = (e: DragEvent) => {
    const y = e.clientY
    const id = (e.target as HTMLElement).id
    let isChange = false
    let direction = (y - prevY.current) > 0 ? 'down' : 'up'
    isChange = !(id === prevId.current)
    prevY.current = e.clientY
    prevId.current = id
    if (isChange && direction) {
      endDragId.current = (e.target as HTMLElement).id
      const newData = _.cloneDeep(globalObj)
      const content = newData.content
      if (content.length) {
        let oldIdx = content.findIndex((item: CompUnion) => item.id === startDragId.current)
        let newIdx = content.findIndex((item: CompUnion) => item.id === endDragId.current)

        if (startDragId.current !== endDragId.current && newIdx > -1 && oldIdx > -1) {
          [content[oldIdx], content[newIdx]] = [content[newIdx], content[oldIdx]]
          setGlobalObj(newData)
        }
      }
    }
  }
  const handleDragStart = (e: DragEvent) => {
    startDragId.current = (e.target as HTMLElement).id
  }

  const throttleDragOver = utils.throttle(handleDragOver, 100)

  const handleLayout = (data: 'left' | 'right') => {
    if (data === 'left') {
      setLayout(Object.assign({}, layout, { sidebarWidth: layout.sidebarWidth ? 0 : 25 }))
    }
    if (data === 'right') {
      setLayout(Object.assign({}, layout, { editWidth: layout.editWidth ? 0 : 20 }))
    }
  }

  /**
   * 组件渲染区域
   */
  const renderMainView = () => {
    return (globalObj.content).map((json: CompUnion, contentIndex: number) => {
      return <div key={contentIndex}>
        {
          Object.entries(Comps).map(([name, Comp], CompIndex) => {
            return <div key={CompIndex} >
              {
                name === json.componentName ?
                  <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)} onDragOver={throttleDragOver} onDragStart={handleDragStart} id={json.id}
                    draggable>
                    {
                      activeCompId === json.id && <>
                        <div className={'comp-edit-tool cursor'}>
                          <span>{name.toLocaleUpperCase()}</span>
                          <span>
                            <AiFillDelete style={{ 'color': '#fff' }} onClick={selectDel} />
                            <AiFillFileText onClick={copy} />
                          </span>
                        </div>
                      </>
                    }
                    {/* @ts-ignore */}
                    <Comp key={json.id} data={json.data} id={json.id} />
                  </div> : <></>
              }
            </div>
          })
        }
      </div >
    })

  }
  return (
    <div {...props} ref={ref} className="layout-main-mid">
      <div className="layout-mid-tools" >
        {
          order && <div className='tools'>
            <div className="tools-item" onClick={editUp}>上移</div>
            <div className="tools-item" onClick={editDown}>下移</div>
            <div className="tools-item" onClick={selectUp}>上选</div>
            <div className="tools-item" onClick={selectDown}>下选</div>
            <div className="tools-item" onClick={selectDel}>删除</div>
            <div className="tools-item" onClick={clearJSON}>清空</div>
            <div className="tools-item" onClick={copy}>复制</div>
          </div>
        }
      </div>
      <div className='layout-mid-content' >
        {
          isIframe ?
            // iframe加载与编辑器解耦
            <MyIframe />
            :
            // 非iframe加载，存在隔离问题
            renderPC ? renderMainView()
              : <MobileView>
                <>
                  {renderMainView()}
                </>
              </MobileView>
        }
        {/* 辅助按钮 */}
        <div className='layout-expand-btn-left flex-center' onClick={() => handleLayout('left')}>
          <div className={`san ${layout.sidebarWidth ? 'san-left' : 'san-right'}`}></div>
        </div>
        <div className='layout-expand-btn-right flex-center'>
          <div className={`san ${layout.editWidth ? 'san-right' : 'san-left'}`} onClick={() => {
            handleLayout('right')
          }}></div>
        </div>
      </div>
    </div >
  )
})

export default Main