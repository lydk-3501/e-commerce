import { FilterParams } from '../filter.type';

interface MenuItem {
    label: string;
    count: string;
    childrenItems?: MenuItem[];
}

interface CategoryMenuItemProps {
    label: string;
    count: string;
    childrenItems?: MenuItem[];
}

interface ComponentProps extends CategoryMenuItemProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export { ComponentProps };

export interface CategoryProps {
    params: FilterParams;
    setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
