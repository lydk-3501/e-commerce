import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchItemsByFreeShipping, fetchItemsByRating, fetchItemsByCategories, fetchItemsByBrand } from './thunks';
import { ItemProps } from '@components/Item/item.type';
import { FetchItemsByRatingResult, FetchItemsByBrandResult } from './thunks';

interface ItemsState {
    items: ItemProps[];
    loading: boolean;
    error: string | null;
    ratingCounts: { [rating: number]: number };
    brandCounts: Record<string, number>;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
    ratingCounts: {},
    brandCounts: {},
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
            //fetch by category
            .addCase(fetchItemsByCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchItemsByCategories.fulfilled,
                (state, action: PayloadAction<ItemProps[]>) => {
                    state.items = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchItemsByCategories.rejected, (state, action) => {
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
            .addCase(fetchItemsByRating.fulfilled, (state, action: PayloadAction<FetchItemsByRatingResult>) => {
                state.items = action.payload.items;
                state.ratingCounts[action.payload.rating] = action.payload.count; 
                state.loading = false;
            })
            .addCase(fetchItemsByRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items by rating';
            })
            .addCase(fetchItemsByBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsByBrand.fulfilled, (state, action: PayloadAction<FetchItemsByBrandResult>) => {
                state.items = action.payload.items;
                state.brandCounts = action.payload.brandCounts;
                state.loading = false;
            })
            .addCase(fetchItemsByBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items by brand';
            });
    },
});

const { reducer } = itemsSlice;

export default reducer;
