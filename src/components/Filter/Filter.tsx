import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClearFilter from './ClearFilter';
import Category from './Category/Category';
import Brand from './Brand/Brand';
import FreeShipping from './FreeShipping/FreeShipping';
import PriceRangeSlider from './PriceRangeSlider/PriceRangeSlider';
import Ratings from './Ratings/Ratings';
import { FilterParams, initialFilterParams } from './filter.type';

const Filter: React.FC = () => {
    const { t } = useTranslation();

    const [params, setParams] = useState<FilterParams>(initialFilterParams);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (params.category) searchParams.append('category', params.category);
        if (Array.isArray(params.brand) && params.brand.length > 0) {
            searchParams.append('brand', params.brand.join(','));
        }
        if (params.priceMin)
            searchParams.append('priceMin', params.priceMin.toString());
        if (params.priceMax)
            searchParams.append('priceMax', params.priceMax.toString());
        if (params.isFreeShipping)
            searchParams.append(
                'isFreeShipping',
                params.isFreeShipping.toString()
            );
        if (params.rating)
            searchParams.append('rating', params.rating.toString());

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }, [params]);

    return (
        <div className="container-wrapper w-[320px]">
            <section className="container-filter">
                <div className="container-header h-[60px] items-center flex justify-between w-[260px]">
                    <h2 className="text-2xl font-hind font-semibold">
                        {t('containerHeader')}
                    </h2>
                    <ClearFilter setParams={setParams} />
                </div>
                <div className="container-body">
                    <Category params={params} setParams={setParams} />
                    <Brand params={params} setParams={setParams} />
                    <PriceRangeSlider
                        min={1}
                        max={4800}
                        params={params}
                        setParams={setParams}
                    />
                    <FreeShipping
                        isFree
                        params={params}
                        setParams={setParams}
                    />
                    <Ratings
                        rating={params.rating || 0} 
                        count={12345} 
                        params={params}
                        setParams={setParams}
                    />
                </div>
            </section>
        </div>
    );
};

export default Filter;
