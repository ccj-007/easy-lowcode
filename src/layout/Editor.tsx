import React from 'react'

type Props = {
style: React.CSSProperties
className: string

}

const Editor = (props: Props) => {
  return (
    <div {...props}>编辑区</div>
  )
}

export default Editor