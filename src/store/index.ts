import useStore from './state'
import { createSelectors } from '@/store/createSelectors'

export * from "./action";
export * from "./mutation";

export const STATE = createSelectors(useStore).use

export default useStore