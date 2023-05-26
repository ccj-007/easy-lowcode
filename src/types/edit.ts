
type InputData = {
    placeholder: string
}

type InputEdit = {
    type: string,
    target: string,
    id: string,
    data: InputData
}


type ButtonData = {
    placeholder: string
}

type ButtonEdit = {
    type: string,
    target: string,
    id: string,
    data: ButtonData
}

export type EditUnion = InputEdit | ButtonEdit

export type EditObj = {
    "Input": InputEdit[]
    "Button": ButtonEdit[]
}