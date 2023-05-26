import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { tokyoNightStorm } from '@uiw/codemirror-themes-all';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
type Props = {
  data: any
}

const CodeMirrorWarp = (props: Props) => {
  const { data } = props

  return (
    <>
      {
        <CodeMirror
          theme={tokyoNightStorm}
          value={data}
          extensions={[langs.tsx(), langs.javascript(), langs.json(), basicSetup({
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            tabSize: 2,
          }),]}
        />
      }
    </>
  );
}

export default CodeMirrorWarp
