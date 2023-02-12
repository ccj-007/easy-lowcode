import React, { ChangeEvent, useContext } from 'react'
import { Context } from "../App";

type Props = {
  data?: any
  target: string
}

const Input = (props: Props) => {
  const { data, target } = props
  const ctx = useContext(Context)
  const { editGlobalObj, editEditorObj } = ctx

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log("aaaa", data);
    editEditorObj('value', value)
    editGlobalObj(target, value)
  }
  return (
    <input placeholder='请输入你的数据' onChange={handleChange} {...data} />
  )
}

export default Input