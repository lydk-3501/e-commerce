import { FilterParams } from '../filter.type';

interface PriceRangeSliderProps {
    min: number;
    max: number;
}

export interface ComponentProps extends PriceRangeSliderProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
