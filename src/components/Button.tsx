import React, { ButtonHTMLAttributes, FC } from 'react'

type Props = {
  data?: ButtonHTMLAttributes<HTMLButtonElement>
  id?: string
  children?: React.ReactNode
}

const Button: FC = (props: Props) => {
  const { data, id } = props
  return (
    <button id={id} className='e-button' {...data}>{data && data.children ? data.children : "默认按钮"}</button>
  )
}

export default Button