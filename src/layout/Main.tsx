import React, { useContext } from 'react'
import { Context, defaultGlobalObj } from "../App";
import Comps from '../components'
import classnames from "classnames";
type Props = {
  style: React.CSSProperties
  className: string
}

const Main = React.forwardRef((props: Props | any, ref) => {
  const ctx = useContext(Context)
  const content = ctx.globalObj.content
  const { activeCompId, setActiveCompId, saveGlobalObj } = ctx

  const clearJSON = () => {
    saveGlobalObj(defaultGlobalObj)
  }
  const editUp = () => {

  }
  const editDown = () => {

  }
  const editDel = () => {

  }
  return (
    <div {...props} ref={ref}>
      <div className="main-title">主舞台</div>

      <div className='tools'>
        <div className="tools-item tools-up" onClick={editUp}>上移</div>
        <div className="tools-item tools-down" onClick={editDown}>下移</div>
        <div className="tools-item tools-del" onClick={editDel}>删除</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>清空</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>复制</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>粘贴</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>更换</div>
        <div className="tools-item tools-clear" onClick={clearJSON}>多选</div>
      </div>
      {
        (content).map((json: any, contentIndex: number) => {
          return Object.entries(Comps).map(([name, Comp], CompIndex) => {
            return name === json.componentName ?
              <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)}>
                <Comp key={json.id} data={json.data} />
              </div> : <></>
          })
        })
      }
    </div >
  )
})

export default Main