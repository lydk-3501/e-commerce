import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClearFilter from './ClearFilter';
import Category from './Category/Category';
import Brand from './Brand/Brand';

const Filter: React.FC = () => {
    const { t } = useTranslation();

    const [params, setParams] = useState({
        category: '',
        brand: [] as string[],
    });

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (params.category) searchParams.append('category', params.category);
        params.brand.forEach((brand) => {
            searchParams.append('brand', brand);
        });

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
                </div>
            </section>
        </div>
    );
};

export default Filter;
