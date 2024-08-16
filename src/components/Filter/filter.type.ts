export interface FilterParams {
    category: string;
    brand: string[];
    priceMin: number;
    priceMax: number;
    isFreeShipping: boolean;
    rating: number;
}

export interface ClearFilterProps {
    onClick: () => void;
}

export const initialFilterParams: FilterParams = {
    category: null,
    brand: [] as string[],
    priceMin: 0,
    priceMax: 0,
    isFreeShipping: null,
    rating: 0,
};
