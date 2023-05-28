import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useStore, { setRenderPC, setPreview, setOrder, saveGlobalObj, setIframe } from "@/store";
import PageModal from '@/commonComp/PageModal';

type Props = {
}
const Navbar = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()
  const { preview, renderPC, globalObj, codeObj, order, isIframe } = useStore(
    (state) => state,
  )

  const handlePreview = () => {
    preview ? navigate('/edit') : navigate('/preview')
    setPreview(!preview)
  }

  const handleRenderPC = () => {
    setRenderPC(!renderPC)
  }

  const handleOrder = () => {
    setOrder(!order)
  }

  const handleIframe = () => {
    setIframe(!isIframe)
    alert('这里需要单独做editor的拖拽包来处理render解析的iframe页面，通过postmessage通信， 目前无法使用')
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='navbar'>
      <div className="logo">Easy-Lowcode 可视化编辑器</div>
      <div className='navbar-content'>
        <button className="navbar-btn btn" onClick={showModal}>
          {'配置页面'}
        </button>
        <button className="navbar-btn btn" onClick={handleIframe}>
          {isIframe ? '默认加载' : 'iframe加载'}
        </button>
        <button className="navbar-btn btn" onClick={handlePreview}>
          {preview ? '编辑' : '预览'}
        </button>
        <button className="navbar-btn btn" onClick={handleRenderPC}>
          {renderPC ? 'H5' : 'PC'}
        </button>
        <button className="navbar-btn btn" onClick={handleSave}>
          保存
        </button>
      </div>

      <PageModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  )
}

export default Navbar