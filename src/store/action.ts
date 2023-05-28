/**
 * @description 处理状态相关方法
 */
import { RootStore } from '@/types/store'
import { CompUnion, GlobalJSON } from '@/types/json'
import { getCompId } from "@/components/jsonObj";
import _ from "lodash";
import { EditUnion, LowcodeCompAttributes } from '@/types/edit'
import useStore from '.';
import { setActiveCompId, setEditObj } from "./mutation";

/**
 * 保存组件
 */
export const saveGlobalObj = (data: GlobalJSON) => useStore.setState((state: RootStore) => {
    return ({ globalObj: data })
})

/**
 * 新增组件
 * @param data 
 * @returns 
 */
export const addGlobalObj = (data: CompUnion) => useStore.setState((state: RootStore) => {
    const { globalObj } = state
    const id = getCompId()
    data.id = id
    globalObj.content.push(data)
    id && setActiveCompId(id)
    return state
})

/**
 * 编辑组件的对象属性
 * @param target 
 * @param value 
 * @returns 
 */
export const editGlobalObj = (property: string, value: unknown) => useStore.setState((state: RootStore) => {
    const { globalObj } = state
    let selectComp = globalObj.content.find((item: CompUnion) => item && item.id === state.activeCompId)
    selectComp && _.set(selectComp.data, property, value)
    return state
})

export const editEditorObj = (property: keyof LowcodeCompAttributes, value: unknown) => useStore.setState((state: RootStore) => {
    const { editObj } = state
    if (editObj) {
        const selectEdit = (editObj[state.compName] as EditUnion[]).find((item: EditUnion) => item && item.id === state.activeEditId)
        if (selectEdit) {
            selectEdit.data[property] = value
        }
        setEditObj(editObj)
    }
    return state
})
