import React from 'react'

type Props = {
  data?: any
  target: string

}

const Button = (props: Props) => {
  const { data, target } = props

  return (
    <button className='e-button' {...data}>修改</button>
  )
}

export default Button