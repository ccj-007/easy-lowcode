
import { EditObj } from '@/types/edit';
import { GlobalJSON } from '@/types/json';

export const saveJSON = (key: string, data: GlobalJSON | EditObj) => {
    localStorage.setItem(key, JSON.stringify(data))
}
export const getJSON = (key: string) => {
    const obj = localStorage.getItem(key)
    return obj ? JSON.parse(obj) : null
}
