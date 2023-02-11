import React, { useRef, useEffect, useContext } from 'react'
import Comps from '../components'
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';


import { Context } from "../App";
type Props = {}

const JsonView = (props: Props) => {
  const ctx = useContext(Context)
  const { globalObj, saveGlobalObj } = ctx

  const onChange = React.useCallback((value: any, viewUpdate) => {
    let obj = JSON.parse(value)
    saveGlobalObj(obj)
    console.log('value:', obj);
    console.log('viewUpdate:', viewUpdate);
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

