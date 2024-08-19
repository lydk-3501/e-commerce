import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ComponentProps } from './sortBy.type';
import { sortByOptions } from '@constants/sort.constant';
import { SortCriteria } from '@store/Items/selectors';
import { setSortParams } from '@store/sortSlice';

const SortBy: React.FC<ComponentProps> = ({ params, setParams }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SortCriteria>(
        params.sortBy
    );

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: SortCriteria) => {
        setSelectedOption(option);
        setIsOpen(false);
        setParams((prevParams) => ({
            ...prevParams,
            sortBy: option,
        }));

        dispatch(
            setSortParams({
                sortBy: option,
                hitsPerPages: params.hitsPerPages,
                page: params.page,
            })
        );
    };

    return (
        <div className="dropdown inline-block relative w-30">
            <button
                className="dropbtn flex items-center py-4 px-6 text-xs border-none cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedOption}
                <img
                    className="h-3 w-3"
                    src="../../../../public/images/toggle-icon.svg"
                    alt={t('toggleIconAlt')}
                />
            </button>
            {isOpen && (
                <div className="dropdown-content absolute bg-slate-50 min-w-[160px] rounded-md right-0 shadow-lg text-xs z-10">
                    {sortByOptions.map((option, index) => (
                        <a
                            key={index}
                            className="block px-4 py-3 text-black hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                                handleOptionClick(option as SortCriteria)
                            }
                        >
                            {option}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortBy;
