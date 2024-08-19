import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortParams } from '@components/Sort/sort.type';
import { initialSortParams } from '@components/Sort/sort.type';

const initialState = initialSortParams;

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortParams: (state, action: PayloadAction<SortParams>) => {
            return action.payload;
        },
    },
});

export const { setSortParams } = sortSlice.actions;
export default sortSlice.reducer;
