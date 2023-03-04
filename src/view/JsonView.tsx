import React, { useRef, useEffect, useContext } from 'react'
import CodeMirrorWarp from "./CodeMirrorWarp";
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
    <CodeMirrorWarp
      data={JSON.stringify(globalObj, null, '\t')}
    />
  );
}

export default JsonView

