import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './thunks';
import { ItemProps } from '@components/Item/item.type';

interface ItemsState {
    items: ItemProps[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<ItemProps[]>) => {
                    state.items = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items';
            });
    },
});

const { reducer } = itemsSlice;

export default reducer;
