import { v4 as uuidv4 } from 'uuid';

const Input = {
  "componentName": "Input",
  "id": uuidv4(),
  "data": {
    "style": {
      "backgroundColor": "#fff",
      "borderColor": "#125c9b",
      "textDecoration": "none",
      "outline": "none",
      "color": "#125c9b"
    },
  }
}
const Button = {
  "componentName": "Button",
  "id": uuidv4(),
  "data": {
    "style": {
      "backgroundColor": "#2e74a8",
      "color": "#fff",
      "width": "200px"
    },
  }
}
const json = {
  Input,
  Button
}
export default json