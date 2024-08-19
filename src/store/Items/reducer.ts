import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchItemsByFreeShipping, fetchItemsByRating } from './thunks';
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
            })
            //fetch by free shipping
            .addCase(fetchItemsByFreeShipping.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsByFreeShipping.fulfilled, (state, action: PayloadAction<ItemProps[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItemsByFreeShipping.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items with free shipping';
            })
            // Fetch by ratings
            .addCase(fetchItemsByRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsByRating.fulfilled, (state, action: PayloadAction<ItemProps[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItemsByRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items by rating';
            });
    },
});

const { reducer } = itemsSlice;

export default reducer;
