import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/configureStore';
import { toggleBrand } from '@store/filterSlice';
import { ComponentProps } from './brand.type';
import { fetchItemsByBrand } from '@store/Items/thunks';
const BrandItem: React.FC<ComponentProps> = ({ label, count, value }) => {
    const dispatch = useDispatch();
    const params = useSelector((state: RootState) => state.filterSlice);
    const isSelected =
        Array.isArray(params.brand) && params.brand.includes(value);

    const handleBrandSelect = () => {
        dispatch(toggleBrand(value));
        if (!isSelected) {
            dispatch(fetchItemsByBrand(value));
        }
    };

    return (
        <div className="brand-item pb-4">
            <input
                className="brand-checkbox mr-4"
                type="checkbox"
                value={value}
                checked={isSelected}
                onChange={handleBrandSelect}
            />
            <span
                className={`brand-item-label text-[0.9rem] ${
                    isSelected ? 'font-bold' : ''
                }`}
            >
                {label}
            </span>
            <span className="brand-item-count bg-gray-300 font-bold ml-2 px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600">
                {count}
            </span>
        </div>
    );
};

export default BrandItem;
