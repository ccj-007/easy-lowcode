import React from 'react'
import Navbar from '../layout/Navbar'
import CompBar from '../layout/CompBar'
import Main from '../layout/Main'
import Editor from '../layout/Editor'

type Props = {}

const editPage = (props: Props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className='layout-main'>
        <CompBar className='layout-base' style={{ width: '20vw' }} ></CompBar>
        <Main className='layout-base' style={{ width: '60vw' }} ></Main>
        <Editor className='layout-base' style={{ width: '20vw' }}></Editor>
      </div></>
  )
}

export default editPage