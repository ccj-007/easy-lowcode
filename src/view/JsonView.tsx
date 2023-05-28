import React, { useContext } from 'react'
import CodeMirrorWarp from "./CodeMirrorWarp";
import useStore from '@/store';
type Props = {}

const JsonView = (props: Props) => {
  const { globalObj } = useStore((state) => state)

  return (
    <CodeMirrorWarp
      data={JSON.stringify(globalObj, null, '\t')}
    />
  );
}

export default JsonView

