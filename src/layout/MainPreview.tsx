import React from 'react'
import { useCtx } from "../hooks";
import Comps from '../components'
import _ from "lodash";
import MobileView from "../view/MobileView";

type Props = {
  style: React.CSSProperties
  className: string
}

const MainPreview = React.forwardRef((props: Props | any, ref) => {
  const { activeCompId, setActiveCompId, saveGlobalObj, globalObj, renderPC } = useCtx()

  const renderMainView = () => {
    return (globalObj.content).map((json: any, contentIndex: number) => {
      return Object.entries(Comps).map(([name, Comp], CompIndex) => {
        return name === json.componentName ?
          <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)}>
            <Comp key={json.id} data={json.data} />
          </div> : <></>
      })
    })
  }
  return (
    <div {...props} ref={ref}>
      {
        renderPC ? renderMainView() : <MobileView>
          {renderMainView()}
        </MobileView>
      }
    </div >
  )
})

export default MainPreview