interface MenuItem {
    label: string;
}

export interface ComponentProps {
    label: string;
    count: string;
    childrenItems?: MenuItem[];
}
