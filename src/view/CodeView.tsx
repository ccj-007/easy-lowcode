import React, { useRef, useEffect, useContext } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { Context } from "../App";
type Props = {}

const JsonView = (props: Props) => {
  const ctx = useContext(Context)
  const { codeObj } = ctx

  return (
    <>
      {
        codeObj && codeObj.root &&
        <CodeMirror
          className='jsonView'
          theme='light'
          value={JSON.stringify(codeObj.root[0]['App.js'], null, '\t')}
          extensions={[javascript()]}
        />
      }
    </>
  );
}

export default JsonView
