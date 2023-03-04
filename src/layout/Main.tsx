import React, { DragEvent, useRef } from 'react'
import { useCtx } from "../hooks";
import { defaultGlobalObj } from "../App";
import Comps from '../components'
import MobileView from "../view/MobileView";
import utils from "../utils";
import _ from "lodash";

type Props = {
  style: React.CSSProperties
  className: string
}

const Main = React.forwardRef((props: Props | any, ref) => {
  const { activeCompId, setActiveCompId, saveGlobalObj, globalObj, renderPC, setGlobalObj, order, layout, setLayout } = useCtx()
  const prevY = useRef(0)
  const prevId = useRef('')

  const startDragId = useRef('')
  const endDragId = useRef('')

  const clearJSON = () => {
    saveGlobalObj(defaultGlobalObj)
  }
  const editUp = () => {

  }
  const editDown = () => {

  }
  const editDel = () => {
    const newData = _.cloneDeep(globalObj)
  }

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
        let oldIdx = content.findIndex((item: any) => item.id === startDragId.current)
        let newIdx = content.findIndex((item: any) => item.id === endDragId.current) as any

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

  const renderMainView = () => {
    return (globalObj.content).map((json: any, contentIndex: number) => {
      return Object.entries(Comps).map(([name, Comp], CompIndex) => {
        return json && json.componentName && name === json.componentName ?
          <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)} onDragOver={throttleDragOver} onDragStart={handleDragStart} id={json.id}
            draggable>
            <Comp key={json.id} data={json.data} id={json.id} />
          </div> : <></>
      })
    })
  }
  return (
    <div {...props} ref={ref} className="layout-main-mid">
      <div className="layout-mid-tools" >
        <div className="main-title">页面</div>
        {
          order && <div className='tools'>
            <div className="tools-item tools-up btn tools-btn" onClick={editUp}>上移</div>
            <div className="tools-item tools-down btn tools-btn" onClick={editDown}>下移</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>上选</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>下选</div>
            <div className="tools-item tools-del btn tools-btn" onClick={editDel}>删除</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>清空</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>复制</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>粘贴</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>更换</div>
            <div className="tools-item tools-clear btn tools-btn" onClick={clearJSON}>多选</div>
          </div>
        }
      </div>
      <div className='layout-mid-content' style={{ 'paddingTop': order ? '80px' : '50px' }}>
        {
          renderPC ? renderMainView() : <MobileView>
            {renderMainView()}
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