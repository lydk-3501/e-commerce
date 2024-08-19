import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterParams } from '@store/filterSlice';
import { fetchProducts, fetchItemsByFreeShipping } from '@store/Items/thunks';
import { RootState } from '@store/configureStore';
import { FilterParams } from '../filter.type';

const FreeShipping: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const params = useSelector((state: RootState) => state.filterSlice);

    const handleToggle = () => {
        const newValue = !params.isFreeShipping;
        const updatedParams: FilterParams = {
            ...params,
            isFreeShipping: newValue,
        };
        dispatch(setFilterParams(updatedParams));
        
        if (newValue) {
            dispatch(fetchItemsByFreeShipping());
        } else {
            dispatch(fetchProducts());
        }
    };

    return (
        <div className="w-[260px] border-t py-8">
            <h2 className="freeshipping-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                {t('freeshippingHeader')}
            </h2>
            <div className="flex justify-items-between">
                <span className="toggle-label text-sm">
                    {t('freeshippingToggleLabel')}
                </span>
                <span className="text-xs">
                    {params.isFreeShipping ? t('yes') : t('no')}
                </span>
                <div
                    className={`cursor-pointer h-[16px] ml-1 w-[30px] rounded-full flex justify-items-between ${
                        params.isFreeShipping ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                    onClick={handleToggle}
                >
                    <div
                        className={`bg-white w-[16px] h-[16px] rounded-full shadow-md transform transition-transform duration-300 ${
                            params.isFreeShipping
                                ? 'translate-x-[14px]'
                                : 'translate-x-0'
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default FreeShipping;
