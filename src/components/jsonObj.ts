import { v4 as uuidv4 } from 'uuid';

export const getCompId = () => {
  return 'comp_' + uuidv4()
}

const Input = {
  "componentName": "Input",
  "id": getCompId(),
  "data": {
  }
}
const Button = {
  "componentName": "Button",
  "id": getCompId(),
  "data": {
  }
}
const jsonObj = {
  Input,
  Button
}

export type JsonType = typeof jsonObj
export type CompKey = keyof JsonType
export default jsonObj