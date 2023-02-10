import React, { useContext } from 'react'
import { Context } from "../App";
import Comps from '../components'
import classnames from "classnames";
type Props = {
  style: React.CSSProperties
  className: string
  setActiveCompId: any
}

const Main = React.forwardRef((props: Props | any, ref) => {
  const { setActiveCompId } = props
  const ctx = useContext(Context)
  const content = ctx.globalObj.content
  const activeCompId = ctx.activeCompId

  console.log("主舞台渲染", ctx);

  return (
    <div {...props} ref={ref}>
      主舞台
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