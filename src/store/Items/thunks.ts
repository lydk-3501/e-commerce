import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ItemProps } from '@components/Item/item.type';

const BASE_URL = `${process.env.REACT_APP_HOST}/items`;

export const fetchProducts = createAsyncThunk(
    'items/fetchProducts',
    async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    }
);
