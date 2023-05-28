/**
 * @description  编辑包
 */
import { GlobalJSON } from '@/types/json'
import { handleEditor } from './handler'

type Options = {
    id: string
}

const initEditor = (json: GlobalJSON, options: Options) => {
    handleEditor(json, options)
}

export default initEditor