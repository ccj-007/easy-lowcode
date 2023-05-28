import logger from "./myMW/logger";
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { RootStore } from '@/types/store'
import { temporal } from 'zundo'

type RootStoreFn = () => RootStore

const loggerMW = (f: RootStoreFn) => logger(f)

const devtoolsMW = (f: RootStoreFn) => devtools(f)

const persistMW = (f: RootStoreFn) => persist(f, {
    name: 'easy-lowcode',
    storage: createJSONStorage(() => localStorage),
})

const temporalMW = (f: RootStoreFn) => temporal(f, {
    partialize: (state) => {
        const { globalObj } = state
        return { globalObj }
    },
    limit: 20
})

const immerMW = (f: RootStoreFn) => immer(f)


const combineMW = [loggerMW, devtoolsMW, persistMW, temporalMW, immerMW]

export default combineMW