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
const json = {
  Input,
  Button
}
export default json