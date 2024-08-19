import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/Items/thunks';
import { RootState } from '@store/configureStore';
import { selectSortedItems } from '@store/Items/selectors';
import Item from './Item';
import Pagination from '@components/Pagination/Pagination';

const ItemList: React.FC = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(
        (state: RootState) => state.Items
    );

    const itemsPerPage = useSelector(
        (state: RootState) => state.sortSlice.hitsPerPages
    );
    const sortBy = useSelector((state: RootState) => state.sortSlice.sortBy);
    const sortedItems = useSelector((state: RootState) =>
        selectSortedItems(state, sortBy)
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const totalPages = Math.ceil(items.length / itemsPerPage);

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
