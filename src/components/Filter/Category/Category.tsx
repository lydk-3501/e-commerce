import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { RootState } from '@store/configureStore';
import CategoryMenuItem from './CategoryMenuItem';
import { categoryItems } from '@constants/category.constant';

const Category: React.FC = () => {
    const { t } = useTranslation();
    // const params = useSelector((state: RootState) => state.filterSlice);

    return (
        <div className="flex flex-col w-56 border-t py-8 w-[260px]">
            <h2 className="category-menu-header font-hind font-semibold uppercase text-[0.678rem] text-[#21243d] pb-4 tracking-[.08rem]">
                {t('categoryMenuHeader')}
            </h2>
            {categoryItems.map((item, index) => (
                <CategoryMenuItem
                    key={index}
                    label={item.label}
                    count="123"
                    childrenItems={item.childrenItems}
                />
            ))}
        </div>
    );
};

export default Category;
