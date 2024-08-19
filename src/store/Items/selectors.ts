import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/configureStore';

export type SortCriteria =
    | 'Sort by feature'
    | 'Price ascending'
    | 'Price descending';

export type HitsCriteria = 16 | 32 | 64;

export const sortedItems = (state: RootState) => state.Items;
export const itemByHits = (state: RootState) => state.Items;

export const selectSortedItems = createSelector(
    [sortedItems, (_: RootState, sortCriteria: SortCriteria) => sortCriteria],
    (itemsState, sortCriteria) => {
        const items = [...itemsState.items];
        switch (sortCriteria) {
            case 'Price descending':
                return items.sort((a, b) => a.price - b.price);
            case 'Price ascending':
                return items.sort((a, b) => b.price - a.price);
            case 'Sort by feature':
            default:
                return items;
        }
    }
);

export const selectItemsForPage = createSelector(
    [
        sortedItems,
        (_: RootState, hitsCriteria: HitsCriteria) => hitsCriteria,
        (_: RootState, page: number) => page,
    ],
    (itemsState, hitsCriteria, page) => {
        const startIndex = (page - 1) * hitsCriteria;
        const endIndex = startIndex + hitsCriteria;
        return itemsState.items.slice(startIndex, endIndex);
    }
);
