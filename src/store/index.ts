import useStore from './state'

export { saveGlobalObj, addGlobalObj, editGlobalObj, editEditorObj } from "./action";

export { setGlobalObj, setCompName, setSelectComp, setActiveCompId, setEditObj, setActiveEditId, setSelectEdit, setEditName, setPreview, setRenderPC, setOrder, setCodeObj, setLayout, setIframe, setActivePanelId } from "./mutation";

export default useStore