import React from 'react'
import { useCtx } from "../hooks";
import Comps from '../components'
import _ from "lodash";
import MobileView from "../view/MobileView";
import { CompUnion } from '../types/json';

type Props = {
  style: React.CSSProperties
  className: string
}

const MainPreview = React.forwardRef((props: Props, ref: any) => {
  const { activeCompId, setActiveCompId, globalObj, renderPC } = useCtx()

  const renderMainView = () => {
    return (globalObj.content).map((json: CompUnion, contentIndex: number) => {
      return <div key={contentIndex}>
        {
          Object.entries(Comps).map(([name, Comp], CompIndex) => {
            return <div key={CompIndex}>
              {
                name === json.componentName ?
                  <div className={activeCompId === json.id ? 'comp-edit-active' : ''} onClick={() => setActiveCompId(json.id)}>
                    {/* @ts-ignore */}
                    <Comp key={json.id} data={json.data} />
                  </div> : <></>
              }
            </div>
          })
        }
      </div>
    })
  }
  return (
    <div {...props} ref={ref}>
      {
        renderPC ? renderMainView() : <MobileView>
          <>
            {renderMainView()}
          </>
        </MobileView>
      }
    </div >
  )
})

export default MainPreview