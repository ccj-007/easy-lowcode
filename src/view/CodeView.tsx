import React, { useState, useEffect } from 'react'
import CodeMirrorWarp from "./CodeMirrorWarp";
import { getFileCodeTree } from "../outScan/index";
import { useCtx } from "../hooks";

type Props = {}

const JsonView = (props: Props) => {
  const { codeObj } = useCtx()

  return (
    <>
      {
        codeObj && codeObj.root &&
        < CodeMirrorWarp
          data={codeObj.root[0]['App.js']}
        />
      }
    </>
  );
}

export default JsonView
