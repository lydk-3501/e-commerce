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

export { CategoryMenuItemProps };
