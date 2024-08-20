import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/configureStore';
import { setCategory } from '@store/filterSlice';
import { ComponentProps } from './category.type';
import { fetchItemsByCategories } from '@store/Items/thunks';

const CategoryMenuItem: React.FC<ComponentProps> = ({
    label,
    count,
    childrenItems,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useSelector((state: RootState) => state.filterSlice);
    const categoriesState = useSelector((state: RootState) => state.Items);
    const [isExpanded, setIsExpanded] = useState(false);
    const isSelected = params.category === label;

    useEffect(() => {
        if (isExpanded && childrenItems.length === 0) {
            dispatch(fetchItemsByCategories(label));
        }
    }, [isExpanded, label, dispatch]);

    useEffect(() => {
        if (params.category !== label) {
            setIsExpanded(false);
        }
    }, [params.category, label]);

    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const handleCategorySelect = () => {
        if (params.category !== label) {
            dispatch(setCategory(label));
        }
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
                        className={`h-3 w-3 ${isExpanded ? '' : 'rotate-180'}`}
                        src="/images/toggle-icon.svg"
                        alt={t('toggleIconAlt')}
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
                        isExpanded ? 'max-h-[460px]' : 'max-h-0'
                    }`}
                >
                    {childrenItems.map((child, index) => (
                        <div className="pl-4" key={index}>
                            <CategoryMenuItem
                                label={child.label}
                                count="123"
                                // childrenItems={child.childrenItems}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMenuItem;
