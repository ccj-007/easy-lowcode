/**
 * handle editor
 * @param json 
 */
const store: any = {
    cid: '',
}

export const handleEditor = (json) => {
    // validator
    if (!document || !json.content) {
        throw new Error('exist error json or document not loaded')
    }
    // 对json解析找到iframe的dom，并监听事件，修改ui
    const compJsonList = json.content
    const compDOMList: HTMLElement[] = []
    compJsonList.forEach(compJson => {
        const compDOM = document.getElementById(compJson.id)
        compDOM && compDOMList.push(compDOM)
        compDOM?.addEventListener('click', () => {
            store.id = compDOM.id
            compDOMList.forEach(item => {
                item.style.border = ''
                if (item.id === store.id) {
                    item.style.border = '1px solid #006cff'
                }
            })
        })
    })


}