export type SortParams = {
    sortBy: 'Sort by feature' | 'Price ascending' | 'Price descending';
    hitsPerPages: 16 | 32 | 64;
    page: number;
};

export const initialSortParams: SortParams = {
    sortBy: 'Sort by feature',
    hitsPerPages: 16,
    page: 0,
};
