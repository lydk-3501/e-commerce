import React, { useEffect, useState } from 'react';
import SortBy from './SortBy/SortBy';
import HitsPerPage from './HitsPerPage/HitsPerPage';
import { SortParams, initialSortParams } from './sort.type';
import { FilterParams } from '@components/Filter/filter.type';

const Sort: React.FC = () => {
    const [params, setParams] = useState<SortParams>(initialSortParams);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const existingFilterParams: FilterParams = {
            category: urlParams.get('category') || '',
            brand: Array.from(urlParams.entries())
                .filter(([key]) => key.startsWith('brand['))
                .map(([, value]) => value),
            priceMin: urlParams.get('priceMin') ? Number(urlParams.get('priceMin')) : undefined,
            priceMax: urlParams.get('priceMax') ? Number(urlParams.get('priceMax')) : undefined,
            isFreeShipping: urlParams.get('isFreeShipping') === 'true',
            rating: urlParams.get('rating') ? Number(urlParams.get('rating')) : undefined,
        };

        const searchParams = new URLSearchParams();

        Object.entries(existingFilterParams).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach((val, index) => searchParams.append(`${key}[${index}]`, val));
                } else {
                    searchParams.append(key, value.toString());
                }
            }
        });

        if (params.sortBy && params.sortBy !== 'Sort by feature') {
            searchParams.append('sortBy', params.sortBy);
        }

        if (params.hitsPerPages && params.hitsPerPages !== 16) {
            searchParams.append('hitsPerPage', params.hitsPerPages.toString());
        }

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }, [params]);

    return (
        <div className="container-options flex justify-end border-b py-[6px] mb-[30px]">
            <SortBy params={params} setParams={setParams} />
            <HitsPerPage params={params} setParams={setParams} />
        </div>
    );
};

export default Sort;
