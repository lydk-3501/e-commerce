import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/Items/thunks';
import { RootState } from '@store/configureStore';
import { selectSortedItems } from '@store/Items/selectors';
import Item from './Item';
import Pagination from '@components/Pagination/Pagination';
import lunr from 'lunr';
import { setLunrIndex } from '@store/Items/reducer';

const ItemList: React.FC = () => {
    const dispatch = useDispatch();
    const { items, searchResults, lunrIndex, loading, error } = useSelector(
        (state: RootState) => state.Items
    );

    const sortBy = useSelector((state: RootState) => state.sortSlice.sortBy);
    const itemsPerPage = useSelector(
        (state: RootState) => state.sortSlice.hitsPerPages
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (items.length > 0) {
            const index = lunr(function () {
                this.ref('objectID');
                this.field('name');
                this.field('description');
                this.field('categories');
                this.field('type');
                items.forEach((doc) => this.add(doc));
            });
            dispatch(setLunrIndex(index));
        }
    }, [items, dispatch]);

    const [currentPage, setCurrentPage] = useState(1);

    const baseItems = searchResults.length > 0 ? searchResults : items;

    const sortedItems = useSelector((state: RootState) =>
        selectSortedItems(
            { ...state, Items: { ...state.Items, items: baseItems } },
            sortBy
        )
    );

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedItems.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {currentItems.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </div>
            <footer className="flex justify-center my-16">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </footer>
        </>
    );
};

export default ItemList;
