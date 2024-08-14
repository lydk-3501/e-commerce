import React from 'react';
import { useTranslation } from 'react-i18next';
import BrandItem from './BrandItem';
import BrandSearch from './BrandSearch';
import { brandItems } from '@constants/brand.constant';
import { BrandProps } from './brand.type';

const Brand: React.FC<BrandProps> = ({ params, setParams }) => {
    const { t } = useTranslation();

    return (
        <div className="brand-menu border-t py-8 w-[260px]">
            <div>
                <h2 className="brand-menu-header leading-normal font-semibold font-hind pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                    {t('brandMenuHeader')}
                </h2>
            </div>
            <BrandSearch />
            <div>
                {brandItems.map((item, index) => (
                    <BrandItem
                        key={index}
                        {...item}
                        params={params}
                        setParams={setParams}
                    />
                ))}
            </div>
        </div>
    );
};

export default Brand;
