export interface InputJSON {
  "componentName": string,
  "id": string
  "data": {
    "placeholder": string,
    "style": {
      "display": string
    },
    "type": string
  }
}

export interface ButtonJSON {
  "componentName": string,
  "id": string,
  "data": {
    "children": string
  }
}

export type CompUnion = InputJSON | ButtonJSON
export type GlobalPageType = 'page'

export interface GlobalJSON {
  "type": GlobalPageType,
  "title": string,
  "routeName": string,
  "initApi": string,
  "content": CompUnion[]
}