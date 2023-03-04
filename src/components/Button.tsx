import React, { FC } from 'react'

type Props = {
  data?: any
  id?: string
  children?: string
}

const Button: FC = (props: Props) => {
  const { data, id } = props
  return (
    <button id={id} className='e-button' {...data}>{data && data.children ? data.children : "默认按钮"}</button>
  )
}

export default Button