import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setFilterParams, clearFilters } from '@store/filterSlice';
import { RootState } from '@store/configureStore';
import ClearFilter from './ClearFilter';
import Category from './Category/Category';
import Brand from './Brand/Brand';
import FreeShipping from './FreeShipping/FreeShipping';
import PriceRangeSlider from './PriceRangeSlider/PriceRangeSlider';
import Ratings from './Ratings/Ratings';

const Filter: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useSelector((state: RootState) => state.filterSlice);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const updatedParams = {
            category: searchParams.get('category') || '',
            brand: searchParams.getAll('brand') || [],
            priceMin: parseInt(searchParams.get('priceMin') || '1', 10),
            priceMax: parseInt(searchParams.get('priceMax') || '4800', 10),
            isFreeShipping: searchParams.get('isFreeShipping') === 'true',
            rating: parseInt(searchParams.get('rating') || '0', 10),
        };

        dispatch(setFilterParams(updatedParams));
    }, [dispatch]);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (params.category) searchParams.append('category', params.category);
        if (params.brand.length > 0) {
            params.brand.forEach((brand, index) => {
                searchParams.append(`brand[${index}]`, brand);
            });
        }
        if (params.priceMin && params.priceMin !== 1)
            searchParams.append('priceMin', params.priceMin.toString());
        if (params.priceMax && params.priceMax !== 4800)
            searchParams.append('priceMax', params.priceMax.toString());
        if (params.isFreeShipping)
            searchParams.append(
                'isFreeShipping',
                params.isFreeShipping.toString()
            );
        if (params.rating)
            searchParams.append('rating', params.rating.toString());

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [params]);

    // useEffect(() => {
    //     const handlePopState = () => {
    //         const searchParams = new URLSearchParams(window.location.search);
    //         const updatedParams = {
    //             category: searchParams.get('category') || '',
    //             brand: searchParams.getAll('brand') || [],
    //             priceMin: parseInt(searchParams.get('priceMin') || '1', 10),
    //             priceMax: parseInt(searchParams.get('priceMax') || '4800', 10),
    //             isFreeShipping: searchParams.get('isFreeShipping') === 'true',
    //             rating: parseInt(searchParams.get('rating') || '0', 10),
    //         };

    //         dispatch(setFilterParams(updatedParams));
    //     };

    //     window.addEventListener('popstate', handlePopState);
    //     return () => {
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, [dispatch]);

    return (
        <div className="container-wrapper w-[320px]">
            <section className="container-filter">
                <div className="container-header h-[60px] items-center flex justify-between w-[260px]">
                    <h2 className="text-2xl font-hind font-semibold">
                        {t('containerHeader')}
                    </h2>
                    <ClearFilter onClick={() => dispatch(clearFilters())} />
                </div>
                <div className="container-body">
                    <Category />
                    <Brand />
                    <PriceRangeSlider />
                    <FreeShipping />
                    <Ratings />
                </div>
            </section>
        </div>
    );
};

export default Filter;
