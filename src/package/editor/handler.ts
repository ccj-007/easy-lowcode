import { GlobalJSON } from "@/types/json"

/**
 * handle editor
 * @param json 
 */
const store: { [k: string]: string | number } = {
    cid: '',
    pageX: 0,
    pageY: 0
}

function sleep(time: number = 1000) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}

export const handleEditor = async (json: GlobalJSON, options: { id: string }) => {
    // validator
    if (!document || !json.content) {
        throw new Error('exist error json or document not loaded')
    }
    await sleep(0)

    // 对json解析找到iframe的dom，并监听事件，修改ui
    const compJsonList = json.content

    const compDOMList: HTMLElement[] = []
    compJsonList.forEach(compJson => {
        const compDOM = document.getElementById(compJson.id)
        console.log(compDOM, compJson.id);

        compDOM && compDOMList.push(compDOM)
        compDOM?.addEventListener('click', () => {
            store.cid = compDOM.id

            compDOMList.forEach(item => {
                item.style.border = ''
                if (item.id === store.cid) {
                    item.style.border = '1px solid #006cff'
                }
            })
        })
    })
    if (options.id) {
        let rootDOM = document.getElementById(options.id) as HTMLElement
        rootDOM && rootDOM.addEventListener('mouseover', (e: MouseEvent) => {
            store.pageX = e.pageX
            store.pageY = e.pageY
            console.log("store position", store.pageX, store.pageY);
        })
    }
}