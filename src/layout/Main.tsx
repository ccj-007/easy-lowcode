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
  const { activeCompId, setActiveCompId, saveGlobalObj, globalObj, renderPC, setGlobalObj } = useCtx()
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
    //@ts-ignore
    const id = e.target ? e.target.id : ''
    let isChange = false
    let direction = (y - prevY.current) > 0 ? 'down' : 'up'
    isChange = !(id === prevId.current)
    prevY.current = e.clientY
    prevId.current = id
    //拖拽状态改变
    if (isChange && direction) {
      endDragId.current = e.target.id
      //交换
      const newData = _.cloneDeep(globalObj)
      const content = newData.content
      if (content.length) {
        let oldIdx = content.findIndex((item: any) => item.id === startDragId.current)
        let newIdx = content.findIndex((item: any) => item.id === endDragId.current) as any

        if (startDragId.current !== endDragId.current) {
          [content[oldIdx], content[newIdx]] = [content[newIdx], content[oldIdx]]
          console.log(newData);
          setGlobalObj(newData)
        }
      }
    }
  }
  const handleDragStart = (e: DragEvent) => {
    startDragId.current = e.target.id
  }

  const throttleDragOver = utils.throttle(handleDragOver, 1000)

  const renderMainView = () => {
    return (globalObj.content).map((json: any, contentIndex: number) => {
      return Object.entries(Comps).map(([name, Comp], CompIndex) => {
        return name === json.componentName ?
          <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)} onDragOver={throttleDragOver} onDragStart={handleDragStart} id={json.id}
            draggable>
            <Comp key={json.id} data={json.data} id={json.id} />
          </div> : <></>
      })
    })
  }
  return (
    <div {...props} ref={ref}>
      <div className="main-title">主舞台</div>
      <div className='tools'>
        <div className="tools-item tools-up" onClick={editUp}>上移</div>
        <div className="tools-item tools-down" onClick={editDown}>下移</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>上选</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>下选</div>
        <div className="tools-item tools-del" onClick={editDel}>删除</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>清空</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>复制</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>粘贴</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>更换</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>多选</div>
      </div>
      {
        renderPC ? renderMainView() : <MobileView>
          {renderMainView()}
        </MobileView>
      }
    </div >
  )
})

export default Main