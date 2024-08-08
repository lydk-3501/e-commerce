import React from 'react';
import { BrandMenuItemProps } from './brand.type';

const BrandItem: React.FC<BrandMenuItemProps> = ({ label, count }) => {
    return (
        <div className="brand-item pb-4">
            <input
                className="brand-checkbox mr-4"
                type="checkbox"
                value="abc"
            ></input>
            <span className="brand-item-label focus:font-bold text-[0.9rem]">
                {label}
            </span>
            <span className="brand-item-count bg-gray-300 font-bold ml-2 px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600">
                {count}
            </span>
        </div>
    );
};

export default BrandItem;
