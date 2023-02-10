import React from 'react'

type Props = {
  data?: any
}

const Input = (props: Props) => {
  const { data } = props

  return (
    <input placeholder='请输入你的数据' {...data} />
  )
}

export default Input