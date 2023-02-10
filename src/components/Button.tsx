import React from 'react'

type Props = {
  data?: any
}

const Button = (props: Props) => {
  const { data } = props
  return (
    <button className='e-button' {...data}>{data && data.children ? data.children : "默认按钮"}</button>
  )
}

export default Button