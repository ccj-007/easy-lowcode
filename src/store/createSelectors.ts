/**
 * 封装共用方法，方便获取state
 * @param store 
 * @returns 
 */
export function createSelectors(store: any) {
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        (store.use)[k] = () => store((s: any) => s[k])
    }
    return store
}
