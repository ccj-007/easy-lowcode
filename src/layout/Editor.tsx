import React, { useContext } from 'react'
import { Context } from "../App";
import editObj from '../editor/editObj'
import editorComps from "../editor/index";
type Props = {
  style: React.CSSProperties
  className: string
}

const Editor = (props: Props) => {
  const ctx = useContext(Context)
  const { activeCompId, globalObj, compName } = ctx

  return (
    <div {...props}>编辑区
      {
        compName && editObj[compName].map(editItem => {
          return Object.entries(editorComps).map(([name, EditorComp], index) => {
            return editItem.type === name ? <EditorComp data={editItem.data} target={editItem.target} /> : <></>
          })
        })
      }
    </div>
  )
}

export default Editor