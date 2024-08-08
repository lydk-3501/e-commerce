export interface FilterParams {
    category: string;
    brand: string[];
}

export interface ClearFilterProps {
    setParams: React.Dispatch<React.SetStateAction<any>>;
}
