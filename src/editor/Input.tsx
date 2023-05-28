import React, { ChangeEvent, useContext } from 'react'
import { editGlobalObj, editEditorObj } from "@/store";

type Props = {
  data?: any
  target: string
}

const Input = (props: Props) => {
  const { data, target } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    editEditorObj('value', value)
    editGlobalObj(target, value)
  }
  return (
    <input placeholder='请输入你的数据' className='e-input' onChange={handleChange} {...data} />
  )
}

export default Input