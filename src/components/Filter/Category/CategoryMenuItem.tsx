import React, { useState } from 'react';
import { CategoryMenuItemProps } from './category.type';

const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({
    label,
    count,
    childrenItems,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <button
                className="category-menu-item w-[260px]"
                onClick={toggleExpand}
            >
                <div className="flex items-center justify-start h-12">
                    <img
                        className="h-3 w-3"
                        src="../../../../public/images/toggle-icon.svg"
                    />
                    <span className="text-[14.4px] pl-2 truncate">{label}</span>
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
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMenuItem;
