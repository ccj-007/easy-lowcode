import { useStore } from 'zustand';
import type { TemporalState } from 'zundo';
import useLowcodeStore from "../state";
import { RootStore } from '@/types/store';

const useTemporalStore = <T extends unknown>(
    selector: (state: TemporalState<RootStore>) => T,
    equality?: (a: T, b: T) => boolean,
) => {
    // @ts-ignore
    return useStore(useLowcodeStore.temporal, selector, equality)
};

export default useTemporalStore