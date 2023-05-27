import React from 'react'
import '../static/css/h5.css';
type Props = {
  children?: React.ReactElement
}

const MobileView = (props: Props) => {
  const { children } = props
  return (
    <div>
      <div className='phone-warp'>
        <div className="phone">
          <div className='phone-content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileView