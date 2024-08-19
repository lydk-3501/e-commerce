import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFilterParams } from '@components/Filter/filter.type';

interface FilterParams {
    category: string;
    brand: string[];
    priceMin: number;
    priceMax: number;
    isFreeShipping: boolean;
    rating: number;
}

const initialState: FilterParams = initialFilterParams;

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterParams(state, action: PayloadAction<Partial<FilterParams>>) {
            return { ...state, ...action.payload };
        },
        toggleBrand(state, action: PayloadAction<string>) {
            const brand = action.payload;
            const currentIndex = state.brand.indexOf(brand);
            if (currentIndex > -1) {
                state.brand.splice(currentIndex, 1);
            } else {
                state.brand.push(brand);
            }
        },
        clearFilters() {
            return initialState;
        },
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload;
        },
    },
});

export const { setFilterParams, toggleBrand, clearFilters, setCategory } = filterSlice.actions;
export default filterSlice.reducer;
