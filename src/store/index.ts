import useStore from './state'
import { createSelectors } from '@/store/createSelectors'

export { saveGlobalObj, addGlobalObj, editGlobalObj, editEditorObj } from "./action";

export { setGlobalObj, setCompName, setSelectComp, setActiveCompId, setEditObj, setActiveEditId, setSelectEdit, setEditName, setPreview, setRenderPC, setOrder, setCodeObj, setLayout, setIframe, setActivePanelId } from "./mutation";

export const STATE = createSelectors(useStore).use

export default useStore