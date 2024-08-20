import { createAsyncThunk } from '@reduxjs/toolkit';
import { ItemProps } from '@components/Item/item.type';
import { brandItems } from '@constants/brand.constant';


const BASE_URL = `${process.env.REACT_APP_APP_HOST}/items`;

export const fetchProducts = createAsyncThunk(
    'items/fetchProducts',
    async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    }
);

export const fetchItemsByCategories = createAsyncThunk<ItemProps[], string[]>(
    'items/fetchByCategories',
    async (categories) => {
      const response = await fetch(`${BASE_URL}?categories=${categories.join(',')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      return data as ItemProps[];
    }
  );

export interface FetchItemsByBrandResult {
    brand: string;
    items: ItemProps[];
    brandCounts: Record<string, number>;
}

export const fetchItemsByBrand = createAsyncThunk<FetchItemsByBrandResult, string>(
    'items/fetchByBrand',
    async (brandName) => {
        const response = await fetch(`${BASE_URL}?brand=${brandName}`);
        const data = await response.json();

        const brandCounts = data.reduce((acc: Record<string, number>, item: ItemProps) => {
            acc[item.brand] = (acc[item.brand] || 0) + 1;
            return acc;
        }, {});

        return {
            brand: brandName,
            items: data.filter((item: ItemProps) => item.brand === brandName),
            brandCounts,
        };
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

export const fetchItemsByRating = createAsyncThunk<FetchItemsByRatingResult, number>(
    'items/fetchByRating',
    async (rating) => {
        const response = await fetch(`${BASE_URL}?rating=${rating}`);
        const data = await response.json();
        const items = data as ItemProps[];
        return {
            rating,
            count: items.length, 
            items: items
        } as FetchItemsByRatingResult;
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