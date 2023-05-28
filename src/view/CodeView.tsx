import React from 'react'
import CodeMirrorWarp from "./CodeMirrorWarp";
import useStore from "@/store";

type Props = {}

const JsonView = (props: Props) => {
  const { codeObj } = useStore(
    (state) => state,
  )
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
