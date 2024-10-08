import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { hitsOptions } from '@constants/sort.constant';
import { ComponentProps } from './hitPerPages.type';
import { setSortParams } from '@store/sortSlice';
import { HitsCriteria } from '@store/Items/selectors';

const HitsPerPage: React.FC<ComponentProps> = ({ params, setParams }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption: HitsCriteria = params.hitsPerPages;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: HitsCriteria) => {
        setIsOpen(false);
        setParams((prevParams) => ({
            ...prevParams,
            hitsPerPages: option,
        }));

        dispatch(
            setSortParams({
                sortBy: params.sortBy,
                hitsPerPages: option,
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
                {selectedOption} {t('hitsPerPages')}
                <img
                    className="h-3 w-3"
                    src="../../../../public/images/toggle-icon.svg"
                    alt={t('toggleIconAlt')}
                />
            </button>
            {isOpen && (
                <div className="dropdown-content absolute bg-slate-50 min-w-[160px] rounded-md right-0 shadow-lg text-xs z-10">
                    {hitsOptions.map((option, index) => (
                        <a
                            key={index}
                            className="block px-4 py-3 text-black hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                                handleOptionClick(option as HitsCriteria)
                            }
                        >
                            {option} {t('hitsPerPages')}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HitsPerPage;
