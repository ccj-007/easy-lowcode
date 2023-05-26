import React, { useRef, useContext } from 'react'
import { Context } from "../App";

type Props = {
  data?: any
  target: string
}

const Button = (props: Props) => {
  const { data, target } = props
  const ctx = useContext(Context)
  const flag = useRef(true)
  const { editGlobalObj } = ctx

  const handleClick = () => {
    if (target === 'hidden') {
      if (flag.current) {
        editGlobalObj('style.display', 'none')
      } else {
        editGlobalObj('style.display', 'block')
      }
      flag.current = !flag.current
    }
  }
  return (
    <button className='e-button' onClick={handleClick} {...data}>
      {data.children ? data.children : '修改'}</button>
  )
}

export default Button