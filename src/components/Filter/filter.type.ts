export interface FilterParams {
    category: string;
    brand: string[];
    priceMin: number;
    priceMax: number;
    isFreeShipping: boolean;
    rating: number;
}

export interface ClearFilterProps {
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export const initialFilterParams: FilterParams = {
    category: '',
    brand: [] as string[],
    priceMin: 0,
    priceMax: 0,
    isFreeShipping: false,
    rating: 0,
};
