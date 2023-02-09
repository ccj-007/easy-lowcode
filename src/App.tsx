import { useState } from 'react'
import './App.css'
import Navbar from "./layout/Navbar";
import CompBar from './layout/CompBar';
import Editor from './layout/Editor';
import Main from './layout/Main';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='layout-main'>
      <CompBar className='layout-base' style={{width: '20vw'}}></CompBar>
      <Main className='layout-base' style={{width: '60vw'}}></Main>
      <Editor className='layout-base' style={{width: '20vw'}}></Editor>
      </div>
    </div>
  )
}

export default App
