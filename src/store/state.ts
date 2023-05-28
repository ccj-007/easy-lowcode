import { create } from 'zustand'
import { RootStore } from '@/types/store'
import { createSelectors } from '@/store/createSelectors'
import { defaultGlobalObj } from '@/store/config'
import { getJSON } from '@/utils/storage'
import _ from "lodash";
import editJSON from "@/editor/editObj";
import { Panel } from '@/types/enum'

const useStore = create<RootStore>((set) => ({
    mainRef: null,
    globalObj: getJSON('global_json') || defaultGlobalObj,
    compName: 'Input',
    selectComp: null,
    activeCompId: '',
    editObj: getJSON('edit_json') || editJSON,
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
    isIframe: false,
    activePanelId: Panel.comp
}))

const STATE = createSelectors(useStore).use

export default useStore