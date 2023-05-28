const logger = (config) => (set, get, api) =>
    config(
        (args) => {
            console.log('logger prev state', args)
            set(args)
            console.log('logger new state', get())
        },
        get,
        api
    )

export default logger