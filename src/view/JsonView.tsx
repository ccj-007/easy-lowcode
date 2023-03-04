import React, { useRef, useEffect, useContext } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

import { Context } from "../App";
type Props = {}

const JsonView = (props: Props) => {
  const ctx = useContext(Context)
  const { globalObj, saveGlobalObj } = ctx

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    let obj = JSON.parse(value)
    saveGlobalObj(obj)
  }, []);
  return (
    <CodeMirror
      className='jsonView'
      theme='light'
      value={JSON.stringify(globalObj, null, '\t')}
      extensions={[json()]}
      onChange={onChange}
    />
  );
}

export default JsonView

