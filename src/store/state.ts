import { create } from 'zustand'
import { RootStore } from '@/types/store'
import { defaultGlobalObj } from '@/store/config'
import _ from "lodash";
import editJSON from "@/editor/editObj";
import { Panel } from '@/types/enum'
import myMiddlewares from './middleware'

/**
 * 编辑器全局状态
 */
const useStore = create<RootStore>()(
    //@ts-ignore
    myMiddlewares(() => ({
        projectName: 'cms2',
        routeName: '/default',
        baseURL: 'http://localhost:5173',
        globalObj: defaultGlobalObj,
        compName: 'Input',
        selectComp: null,
        activeCompId: '',
        editObj: editJSON,
        activeEditId: '',
        selectEdit: null,
        editName: '',
        preview: false,
        renderPC: true,
        order: true,
        codeObj: {
            root: [{ 'App.js': '' }]
        },
        layout: {
            sidebarWidth: 25,
            editWidth: 20,
        },
        isIframe: true,
        activePanelId: Panel.comp
    }))
)


export default useStore