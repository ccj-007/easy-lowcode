import React from 'react'
import { useNavigate } from "react-router-dom";
import { useCtx } from '../hooks'
type Props = {
}
const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const { setPreview, preview, renderPC, setRenderPC, globalObj, saveGlobalObj, codeObj } = useCtx()

  const handlePreview = () => {
    preview ? navigate('/edit') : navigate('/preview')
    setPreview(!preview)
  }

  const handleRenderPC = () => {
    setRenderPC(!renderPC)
  }

  const handleSave = () => {
    saveGlobalObj(globalObj)
    fetch('http://localhost:7001/setCodeTree', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codeObj: codeObj
      })
    })
  }

  return (
    <div className='navbar'>
      <div className="main-title">Easy-Lowcode</div>
      <div className='navbar-content'>
        <button className="navbar-item" onClick={handlePreview}>
          {preview ? '编辑' : '预览'}
        </button>
        <button className="navbar-item" onClick={handleRenderPC}>
          {renderPC ? 'H5' : 'PC'}
        </button>
        <button className="navbar-item" onClick={handleSave}>
          保存
        </button>
      </div>
    </div>
  )
}

export default Navbar