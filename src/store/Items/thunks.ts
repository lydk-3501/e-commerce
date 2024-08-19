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

export const fetchItemsbyCategory = createAsyncThunk<ItemProps[], string>(
    'items/fetchItemsByCategory',
    async (category) => {
        const response = await fetch(`${BASE_URL}?category=${category}`);
        const data = await response.json();
        return data;
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

export const fetchItemsByRating = createAsyncThunk<ItemProps[], number>(
    'items/fetchByRating',
    async (rating) => {
        const response = await fetch(`${BASE_URL}?rating=${rating}`);
        const data = await response.json();
        return data as ItemProps[];
    }
);

export const fetchItemsByPriceRange = createAsyncThunk<ItemProps[], {priceMin: number, priceMax:number}>(
    'items/fetchByPriceRange',
    async ({ priceMin, priceMax }) => {
        const response = await fetch(`${BASE_URL}/items?priceMin=${priceMin}&priceMax=${priceMax}`);
        const data = await response.json();
        return data as ItemProps[];
    }
);