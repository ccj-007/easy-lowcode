/**
 * @description 处理状态相关方法
 */
import { RootStore } from '@/types/store'
import { CompUnion, GlobalJSON } from '@/types/json'
import { saveJSON } from '@/utils/storage'
import { getCompId } from "@/components/jsonObj";
import _ from "lodash";
import { EditUnion, LowcodeCompAttributes } from '@/types/edit'
import useStore from '.';
import { setActiveCompId, setEditObj } from "./mutation";

/**
 * 保存组件
 */
export const saveGlobalObj = (data: GlobalJSON) => useStore.setState((state: RootStore) => {
    saveJSON('global_json', data)
    return ({ globalObj: data })
})

/**
 * 新增组件
 * @param data 
 * @returns 
 */
export const addGlobalObj = (data: CompUnion) => useStore.setState((state: RootStore) => {
    if (data) {
        let newGlobalObj = _.cloneDeep(state.globalObj)
        newGlobalObj.content = newGlobalObj.content.filter((item: CompUnion) => item)
        const id = getCompId()
        data.id = id
        newGlobalObj.content.push(data)
        saveJSON('global_json', newGlobalObj)
        id && setActiveCompId(id)
        return ({ globalObj: newGlobalObj })
    } else {
        return {}
    }
})

/**
 * 编辑组件的对象属性
 * @param target 
 * @param value 
 * @returns 
 */
export const editGlobalObj = (property: string, value: unknown) => useStore.setState((state: RootStore) => {
    let newData = _.cloneDeep(state.globalObj)
    if (newData) {
        let selectComp = newData.content.find((item: CompUnion) => item && item.id === state.activeCompId)
        selectComp && _.set(selectComp.data, property, value)
        saveJSON('global_json', newData)
        return ({ selectComp: selectComp, globalObj: newData })
    } else {
        return {}
    }
})

export const editEditorObj = (property: keyof LowcodeCompAttributes, value: unknown) => useStore.setState((state: RootStore) => {
    let newData = _.cloneDeep(state.editObj)
    if (state.compName && newData) {
        const selectEdit = (newData[state.compName] as EditUnion[]).find((item: EditUnion) => item && item.id === state.activeEditId)
        if (selectEdit) {
            selectEdit.data[property] = value
        }
        setEditObj(newData)
        saveJSON('edit_json', newData)
        return ({ editObj: newData })
    } else {
        return {}
    }
})
