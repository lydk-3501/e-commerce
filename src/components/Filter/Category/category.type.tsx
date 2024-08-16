interface MenuItem {
    label: string;
    count: string;
    childrenItems?: MenuItem[];
}

export interface ComponentProps {
    label: string;
    count: string;
    childrenItems?: MenuItem[];
}
