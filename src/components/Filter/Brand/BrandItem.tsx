import React from 'react';
import { ComponentProps } from './brand.type';

const BrandItem: React.FC<ComponentProps> = ({
    label,
    count,
    value,
    params,
    setParams,
}) => {
    const isSelected =
        Array.isArray(params.brand) && params.brand.includes(value);

    const handleBrandSelect = () => {
        const newBrand = isSelected
            ? params.brand.filter((item) => item !== value)
            : [...params.brand, value];

        setParams((prevParams) => ({
            ...prevParams,
            brand: newBrand,
        }));
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
