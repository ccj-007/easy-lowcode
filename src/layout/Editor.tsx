import React, { useContext } from 'react'
import { Context } from "../App";
import editorComps from "../editor/index";
type Props = {
  style: React.CSSProperties
  className: string
}

const Editor = (props: Props) => {
  const ctx = useContext(Context)
  const { compName, setActiveEditId, editObj } = ctx

  return (
    <div {...props}>
      <div className="main-title">编辑</div>
      {
        compName && editObj[compName].map((editItem: any, index: number) => {
          return <div key={index}>
            {
              Object.entries(editorComps).map(([name, EditorComp], index) => {
                return <div key={index}>
                  {
                    editItem.type === name ?
                      <div onClick={() => (setActiveEditId)(editItem.id)} className='edit-item'>
                        <EditorComp data={editItem.data} target={editItem.target} />
                      </div>
                      : <></>
                  }
                </div>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default Editor