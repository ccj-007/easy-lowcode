import { MutableRefObject } from "react"
import { GlobalJSON, CompUnion } from "./json"
import { EditObj } from "./edit";
import { Panel } from "./enum";
import { CompKey } from "@/components/jsonObj";
import { CodeObj } from "./code";
import type { NotificationInstance } from 'antd/es/notification/interface';

export type LayoutParams = {
    sidebarWidth: number;
    editWidth: number;
}
export type RootContext = {
    /** 主舞台Ref */
    mainRef: MutableRefObject<HTMLDivElement> | null
    contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null
    api: NotificationInstance | null
}

export type RootStore = {
    /** 项目名 */
    projectName: string
    /** 路由名 */
    routeName: string
    /** baseURL */
    baseURL: string
    /** 主舞台组件 */
    globalObj: GlobalJSON
    /** 当前激活（拖拽）的组件名 */
    compName: CompKey
    /** 选中的组件对象 */
    selectComp: CompUnion | null
    /**  当前激活（拖拽）的ID */
    activeCompId: string
    /** 编辑区组件对象 */
    editObj: EditObj | null
    /** 激活编辑区组件的id */
    activeEditId: string
    /** 激活的编辑区组件对象 */
    selectEdit: CompUnion | null
    /** 激活的编辑区组件名 */
    editName: string
    /** 是否预览 */
    preview: boolean
    /** 默认渲染PC */
    renderPC: boolean
    /** 编排 */
    order: boolean
    /** code */
    codeObj: CodeObj
    /** 布局 */
    layout: LayoutParams
    /** iframe */
    isIframe: boolean
    /** 物料区的面板id */
    activePanelId: Panel
}
