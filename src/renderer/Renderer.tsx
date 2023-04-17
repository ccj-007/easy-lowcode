import React, { FC } from 'react'
import Comps from '../components'
import { GlobalJSON, CompUnion } from '../types'

type RenderProps = {
  jsonObj: GlobalJSON
}

/**
 * 渲染器 （用于在iframe解析json）
 */
const Renderer: FC<RenderProps> = (props) => {
  const { jsonObj } = props

  const RenderView = (json: any) => {
    return (json.content).map((json: CompUnion, idx: number) => {
      return Object.entries(Comps).map(([name, Comp], CompIndex) => {
        return json && json.componentName && name === json.componentName ?
          <div id={json.id} >
            <Comp key={json.id} data={json.data} id={json.id} />
          </div> : <></>
      })
    })
  }

  return RenderView(jsonObj)
}

export default Renderer