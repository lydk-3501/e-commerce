import { FilterParams } from '../filter.type';

export interface BrandProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
export interface ComponentProps {
    label: string;
    count: number;
    value: string;
    params: FilterParams;
}
