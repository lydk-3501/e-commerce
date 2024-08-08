import { FilterParams } from '../filter.type';

interface BrandMenuItemProps {
    label: string;
    count: string;
    value: string;
}

interface ComponentProps extends BrandMenuItemProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export { ComponentProps };

export interface BrandProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
