import React, { useRef, useEffect, useContext } from 'react'
import CodeMirrorWarp from "./CodeMirrorWarp";
import { Context } from "../App";
import { GlobalJSON } from '../types/json';
type Props = {}

const JsonView = (props: Props) => {
  const ctx = useContext(Context)
  const { globalObj, saveGlobalObj } = ctx

  return (
    <CodeMirrorWarp
      data={JSON.stringify(globalObj, null, '\t')}
    />
  );
}

export default JsonView

