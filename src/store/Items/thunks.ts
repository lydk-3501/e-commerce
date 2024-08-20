import { createAsyncThunk } from '@reduxjs/toolkit';
import { ItemProps } from '@components/Item/item.type';

const BASE_URL = `${process.env.REACT_APP_APP_HOST}/items`;

export const fetchProducts = createAsyncThunk(
    'items/fetchProducts',
    async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    }
);

export const fetchItemsByCategories = createAsyncThunk<ItemProps[], string>(
    'items/fetchByCategories',
    async (categories) => {
        const response = await fetch(`${BASE_URL}?categories=${categories}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data as ItemProps[];
    }
);

export const fetchItemsByFreeShipping = createAsyncThunk<ItemProps[], void>(
    'items/fetchByFreeShipping',
    async () => {
        const response = await fetch(`${BASE_URL}?free_shipping=true`);
        const data = await response.json();
        return data as ItemProps[];
    }
);

// fetch by rating
export interface FetchItemsByRatingResult {
    rating: number;
    count: number;
    items: ItemProps[];
}

export const fetchItemsByRating = createAsyncThunk<
    FetchItemsByRatingResult,
    number
>('items/fetchByRating', async (rating) => {
    const response = await fetch(`${BASE_URL}?rating=${rating}`);
    const data = await response.json();
    const items = data as ItemProps[];
    return {
        rating,
        count: items.length,
        items: items,
    } as FetchItemsByRatingResult;
});

export const fetchItemsByPriceRange = createAsyncThunk<
    ItemProps[],
    { priceMin: number; priceMax: number }
>('items/fetchByPriceRange', async ({ priceMin, priceMax }) => {
    const response = await fetch(
        `${BASE_URL}/items?priceMin=${priceMin}&priceMax=${priceMax}`
    );
    const data = await response.json();
    return data as ItemProps[];
});

export interface FetchItemsByBrandResult {
    items: ItemProps[];
    brandCounts: number;
    brandName: string;
}

export const fetchItemsByBrand = createAsyncThunk<
    FetchItemsByBrandResult,
    string
>('items/fetchItemsByBrand', async (selectedBrand) => {
    const response = await fetch(`${BASE_URL}/?brand=${selectedBrand}`);
    const data = await response.json();
    const items = data as ItemProps[];
    if (!Array.isArray(items)) {
        throw new Error('Items is not an array or is undefined');
    }

    return {
        items: items,
        brandCounts: items.length,
        brandName: selectedBrand,
    };
});
