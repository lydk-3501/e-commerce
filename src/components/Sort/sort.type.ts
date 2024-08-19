export interface SortParams {
    sortBy: string;
    hitsPerPages: number;
}

export const initialSortParams: SortParams = {
    sortBy: 'Sort by feature',
    hitsPerPages: 16,
};
