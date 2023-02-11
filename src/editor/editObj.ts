import { v4 as uuidv4 } from "uuid";

export const getEditId = () => {
  return 'edit_' + uuidv4()
}

const editObj = {
  "Input": [
    {
      type: 'Input',
      target: 'placeholder',
      id: getEditId(),
      data: {
        placeholder: '修改默认值'
      }
    },
    {
      type: 'Input',
      target: 'type',
      id: getEditId(),
      data: {
        placeholder: '修改类型'
      }
    },
    {
      type: 'Button',
      target: 'hidden',
      id: getEditId(),
      data: {
        children: '显隐'
      }
    }
  ],
  "Button": [
    {
      type: 'Input',
      target: 'children',
      id: getEditId(),
      data: {
        placeholder: '修改文案'
      }
    },
  ]    
}

export default editObj