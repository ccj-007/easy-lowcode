import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

type InputData = {
    placeholder: string
}

type InputEdit = {
    type: string,
    target: string,
    id: string,
    data: InputHTMLAttributes<HTMLInputElement>
}

type ButtonData = {
    placeholder: string
}

type ButtonEdit = {
    type: string,
    target: string,
    id: string,
    data: ButtonHTMLAttributes<HTMLButtonElement>
}

export type LowcodeCompAttributes = ButtonHTMLAttributes<HTMLButtonElement> | InputHTMLAttributes<HTMLInputElement>

export type EditUnion = InputEdit | ButtonEdit

export type EditObj = {
    "Input": InputEdit[]
    "Button": ButtonEdit[]
}