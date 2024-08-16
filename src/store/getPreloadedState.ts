import { PartialRootState } from './configureStore';
import { initialFilterParams } from '@components/Filter/filter.type';
import { initialSortParams } from '@components/Sort/sort.type';

const getPreloadedState = (): PartialRootState => {
    return {
        filterSlice: {
            ...initialFilterParams,
        },
        sortSlice: {
            ...initialSortParams,
        },
    };
};

export default getPreloadedState;
