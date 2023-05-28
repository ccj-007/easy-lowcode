/**
 * @description 设置状态值
 */
import { LayoutParams } from '@/types/store'
import { CompUnion, GlobalJSON } from '@/types/json'
import { CompKey } from "@/components/jsonObj";
import _ from "lodash";
import { EditObj } from '@/types/edit'
import { Panel } from '@/types/enum'
import { CodeObj } from '@/types/code'
import useStore from '.'

export const setGlobalObj = (globalObj: GlobalJSON) => useStore.setState({ globalObj })

export const setCompName = (compName: CompKey) => useStore.setState({ compName })

export const setSelectComp = (selectComp: CompUnion) => useStore.setState({ selectComp })

export const setActiveCompId = (activeCompId: string) => useStore.setState({ activeCompId })

export const setEditObj = (editObj: EditObj) => useStore.setState({ editObj })

export const setActiveEditId = (activeEditId: string) => useStore.setState({ activeEditId })

export const setSelectEdit = (selectEdit: CompUnion) => useStore.setState({ selectEdit })

export const setEditName = (editName: string) => useStore.setState({ editName })

export const setPreview = (preview: boolean) => useStore.setState({ preview })

export const setRenderPC = (renderPC: boolean) => useStore.setState({ renderPC })

export const setOrder = (order: boolean) => useStore.setState({ order })

export const setCodeObj = (codeObj: CodeObj) => useStore.setState({ codeObj })

export const setLayout = (layout: LayoutParams) => useStore.setState({ layout })

export const setIframe = (isIframe: boolean) => useStore.setState({ isIframe })

export const setActivePanelId = (activePanelId: Panel) => useStore.setState({ activePanelId })