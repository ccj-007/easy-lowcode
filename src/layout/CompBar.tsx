import React from 'react'
import CompsObj from '../components/register'
type Props = {
  style: React.CSSProperties
  className: string
}

const CompBar = (props: Props) => {
  const importFn = require.context('../components', false, /\.tsx$/)
  console.log(importFn);
  
  return (
    <div {...props}>
      组件编辑区域
      {
        Object(CompsObj).values().map((Comp: any) => {
          return Comp()
        })
      }
    </div>
  )
}

export default CompBar