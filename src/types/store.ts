import { MutableRefObject } from "react"
import { GlobalJSON, CompUnion } from "./json"
import { EditObj } from "./edit";

export type LayoutParams = {
    sidebarWidth: number;
    editWidth: number;
}
export type RootStore = {
    /** 主舞台Ref */
    mainRef: MutableRefObject<HTMLDivElement | null>
    /** 主舞台组件 */
    globalObj: GlobalJSON

    /** 全局JSON */
    setGlobalObj: (v: GlobalJSON) => void
    /** 设置全局JSON */
    saveGlobalObj: (v: GlobalJSON) => void

    /** 当前激活（拖拽）的组件名 */
    compName: string
    /** 选中的组件对象 */
    selectComp: CompUnion | undefined

    /**  当前激活（拖拽）的ID */
    activeCompId: string
    /** 设置激活（拖拽）的ID */
    setActiveCompId: (v: string) => void

    /** 新增组件 */
    addGlobalObj: (v: CompUnion) => void
    /** 编辑组件的对象属性 */
    editGlobalObj: (target: string, value: unknown) => void

    /** 编辑区组件对象 */
    editObj: EditObj
    /** 设置编辑区组件对象 */
    setEditObj: (v: EditObj) => void

    /** 激活编辑区组件的id */
    activeEditId: string
    /** 激活编辑区组件的id */
    setActiveEditId: (v: string) => void

    /** 激活的编辑区组件对象 */
    selectEdit: CompUnion
    /** 激活的编辑区组件名 */
    editName: string
    /** 设置编辑区组件对象 */
    editEditorObj: (target: string, value: unknown) => void

    /** 是否预览 */
    preview: boolean
    /** 全局JSON */
    setPreview: (v: boolean) => void
    /** 默认渲染PC */
    renderPC: boolean
    /** 全局JSON */
    setRenderPC: (v: boolean) => void
    /** 编排 */
    order: boolean
    /** 全局JSON */
    setOrder: (v: boolean) => void
    /** code */
    codeObj: unknown
    /** 设置code */
    setCodeObj: (v: any) => void
    /** 布局 */
    layout: LayoutParams
    /** 设置布局 */
    setLayout: (v: LayoutParams) => void
    /** iframe */
    isIframe: boolean
    /** 设置iframe */
    setIframe: (v: boolean) => void
}
