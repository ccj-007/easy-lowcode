import React, { FC } from 'react'
import Comps from '../components'
import { GlobalJSON, CompUnion } from '../types/json'

type RenderProps = {
  jsonObj: GlobalJSON
}
/**
 * 渲染器 （用于在iframe解析json）
 */
const Renderer: FC<RenderProps> = (props) => {
  const { jsonObj } = props

  const RenderView = (globalJSON: GlobalJSON) => {
    return (globalJSON.content).map((json: CompUnion) => {
      return Object.entries(Comps).map(([name, Comp]) => {
        return json && json.componentName && name === json.componentName ?
          <div id={json.id} >
            {/* @ts-ignore */}
            <Comp key={json.id} data={json.data} id={json.id} />
          </div> : <></>
      })
    })
  }
  return (
    <>
      {RenderView(jsonObj)}
    </>
  )
}

export default Renderer