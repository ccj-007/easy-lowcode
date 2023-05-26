/**
 * @description json type
 */
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface InputJSON {
  "componentName": string,
  "id": string
  "data": InputHTMLAttributes<HTMLInputElement>
}

export interface ButtonJSON {
  "componentName": string,
  "id": string,
  "data": ButtonHTMLAttributes<HTMLButtonElement>
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
