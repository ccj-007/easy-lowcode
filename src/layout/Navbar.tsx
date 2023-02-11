import React from 'react'

type Props = {
}
const Navbar = (props: Props) => {
  return (
    <div className='navbar'>
      <div className="main-title">Easy-Lowcode</div>
      <div className='navbar-content'>
        <button className="navbar-item">
          {true ? '预览' : '编辑'}
        </button>
        <button className="navbar-item">
          {true ? 'PC' : 'H5'}
        </button>
      </div>
    </div>
  )
}

export default Navbar