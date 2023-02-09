import React from 'react'

type Props = {
  style: React.CSSProperties
  className: string
}

const Main = (props: Props) => {
  return (
    <div {...props}> 主舞台</div>
  )
}

export default Main