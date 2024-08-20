import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchItemsByFreeShipping,
    fetchItemsByRating,
    fetchItemsByCategories,
    fetchItemsByBrand,
} from './thunks';
import { ItemProps } from '@components/Item/item.type';
import { FetchItemsByRatingResult, FetchItemsByBrandResult } from './thunks';
import lunr from 'lunr';

interface ItemsState {
    items: ItemProps[];
    loading: boolean;
    error: string | null;
    ratingCounts: { [rating: number]: number };
    brandCounts: { [brandName: string]: number };
    searchResults: ItemProps[];
    lunrIndex: lunr.Index | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
    ratingCounts: {},
    brandCounts: {},
    searchResults: [],
    lunrIndex: null,
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setLunrIndex(state, action: PayloadAction<lunr.Index>) {
            state.lunrIndex = action.payload;
        },
        setSearchResults(state, action: PayloadAction<ItemProps[]>) {
            state.searchResults = action.payload;
        },
    },
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
            .addCase(
                fetchItemsByFreeShipping.fulfilled,
                (state, action: PayloadAction<ItemProps[]>) => {
                    state.items = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchItemsByFreeShipping.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    'Failed to fetch items with free shipping';
            })
            // Fetch by ratings
            .addCase(fetchItemsByRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchItemsByRating.fulfilled,
                (state, action: PayloadAction<FetchItemsByRatingResult>) => {
                    state.items = action.payload.items;
                    state.ratingCounts[action.payload.rating] =
                        action.payload.count;
                    state.loading = false;
                }
            )
            .addCase(fetchItemsByRating.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch items by rating';
            })
            .addCase(fetchItemsByBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchItemsByBrand.fulfilled,
                (state, action: PayloadAction<FetchItemsByBrandResult>) => {
                    const { items, brandCounts, brandName } = action.payload;
                    state.items = items;
                    state.brandCounts[brandName] = brandCounts;
                    state.loading = false;
                }
            )
            .addCase(fetchItemsByBrand.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch items by brand';
            });
    },
});

export const { setLunrIndex, setSearchResults } = itemsSlice.actions;

const { reducer } = itemsSlice;

export default reducer;
