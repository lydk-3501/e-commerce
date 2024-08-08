import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearFilter from './ClearFilter';
import Category from './Category/Category';

const Filter = () => {
    const { t } = useTranslation();

    return (
        <div className="container-wrapper w-[320px]">
            <section className="container-filter">
                <div className="container-header h-[60px] items-center flex justify-between w-[260px]"> 
                    <h2 className="text-2xl font-hind font-semibold">
                        {t("containerHeader")}
                    </h2>
                    <ClearFilter />
                </div>
                <div className="container-body">
                    <Category />
                </div>
            </section>
        </div>
    );
}

export default Filter;
