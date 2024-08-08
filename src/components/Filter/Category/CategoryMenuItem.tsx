import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentProps } from './category.type';
import { FilterParams } from '../filter.type';

const CategoryMenuItem: React.FC<ComponentProps> = ({
    label,
    count,
    childrenItems,
    params,
    setParams,
}) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(params.category === label);
    }, [params]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCategorySelect = () => {
        setParams((prevParams: FilterParams) => ({
            ...prevParams,
            category: label,
        }));
        setSelected((prevSelected) => {
            const newState = !prevSelected;
            return newState;
        });
        toggleExpand();
    };

    return (
        <div>
            <button
                className="category-menu-item w-[260px]"
                onClick={handleCategorySelect}
            >
                <div className="flex items-center justify-start h-12">
                    <img
                        className={`h-3 w-3 ${isExpanded ? '' : 'rotate-180' }`}
                        src="../../../../public/images/toggle-icon.svg"
                        alt={t("toggleIconAlt")}
                        onClick={handleCategorySelect}
                    />
                    <span
                        className={`text-[14.4px] pl-2 truncate ${
                            isSelected ? 'font-bold' : ''
                        }`}
                    >
                        {label}
                    </span>
                    <span className="category-item-count bg-gray-300 font-bold ml-2 px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600">
                        {count}
                    </span>
                </div>
            </button>
            {childrenItems && (
                <div
                    className={`overflow-hidden duration-300 ease-out transition-max-height ${
                        isExpanded ? 'max-h-[160px]' : 'max-h-0'
                    }`}
                >
                    {childrenItems.map((child, index) => (
                        <div className="pl-4" key={index}>
                            <CategoryMenuItem
                                label={child.label}
                                count={child.count}
                                childrenItems={child.childrenItems}
                                params={params}
                                setParams={setParams}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMenuItem;
