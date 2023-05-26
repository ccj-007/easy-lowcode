import React, { FC, InputHTMLAttributes } from 'react'

type Props = {
  data?: InputHTMLAttributes<HTMLInputElement>,
  id?: string
}

const Input: FC = (props: Props) => {
  const { data, id } = props

  return (
    <input id={id} className='e-input' placeholder='请输入你的数据' {...data} />
  )
}

export default Input