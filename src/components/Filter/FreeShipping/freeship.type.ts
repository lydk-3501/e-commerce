import { FilterParams } from '../filter.type';
interface FreeShippingProps {
    isFree: boolean;
}

export interface ComponentProps extends FreeShippingProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
