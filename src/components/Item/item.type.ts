export interface ItemProps {
    name: string;
    brand: string;
    description: string;
    categories: string[];
    hierarchicalCategories: {
        lvl0: string[];
        lvl1: string[];
    };
    type: string;
    price: number;
    price_range: string;
    image: string;
    url: string;
    free_shipping: boolean;
    popularity: number;
    rating: number;
    objectID: string;
    _snippetResult: {
        description: {
            value: string;
            matchLevel: string;
        };
    };
    highlight?: {
        name: React.ReactNode;
        description: React.ReactNode;
    };
}
