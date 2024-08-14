import { FilterParams } from '../filter.type';

interface RatingsProps {
    rating: number;
    count: number;
}

export interface ComponentProps extends RatingsProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
