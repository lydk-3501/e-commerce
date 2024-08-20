import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BrandItem from './BrandItem';
import BrandSearch from './BrandSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/configureStore';
import { fetchItemsByBrand } from '@store/Items/thunks';
import { brandItems } from '@constants/brand.constant';

const Brand: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useSelector((state: RootState) => state.filterSlice);
    const brandCounts = useSelector(
        (state: RootState) => state.Items.brandCounts
    );

    useEffect(() => {
        brandItems.forEach((brand) => {
            dispatch(fetchItemsByBrand(brand));
        });
    }, []);

    const sortedBrands = [...brandItems]
        .sort((a, b) => (brandCounts[b] || 0) - (brandCounts[a] || 0))
        .slice(0, 10);

    return (
        <div className="brand-menu border-t py-8 w-[260px]">
            <div>
                <h2 className="brand-menu-header leading-normal font-semibold font-hind pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                    {t('brandMenuHeader')}
                </h2>
            </div>
            <BrandSearch />
            <div>
                {sortedBrands.map((item, index) => (
                    <BrandItem
                        key={index}
                        label={item}
                        count={brandCounts[item] || 0}
                        value={item}
                        params={params}
                    />
                ))}
            </div>
        </div>
    );
};

export default Brand;
