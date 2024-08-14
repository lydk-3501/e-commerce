import React, { useState, useEffect } from 'react';
import { ComponentProps } from './brand.type';
import { FilterParams } from '../filter.type'; // Import the FilterParams type

const BrandItem: React.FC<ComponentProps> = ({
    label,
    count,
    value,
    params,
    setParams,
}) => {
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(params.brand.includes(value));
    }, [params, value]);

    const handleCheckboxChange = () => {
        setParams((prevParams: FilterParams) => {
            const newBrands = isSelected
                ? prevParams.brand.filter((brand) => brand !== value)
                : [...prevParams.brand, value];

            return {
                ...prevParams,
                brand: newBrands,
            };
        });
        setSelected(!isSelected);
    };

    return (
        <div className="brand-item pb-4">
            <input
                className="brand-checkbox mr-4"
                type="checkbox"
                checked={isSelected}
                onChange={handleCheckboxChange}
                value={value}
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
