import React from 'react';
import { useTranslation } from 'react-i18next';
import { TbReload } from 'react-icons/tb';
import { ClearFilterProps, initialFilterParams } from './filter.type';

const ClearFilter: React.FC<ClearFilterProps> = ({ setParams }) => {
    const { t } = useTranslation();

    const handleClearFilters = () => {
        setParams(initialFilterParams);
    };

    return (
        <button
            className="clear-filter flex justify-between leading-8 text-slate-500 text-[12px]"
            onClick={handleClearFilters}
        >
            <div className="pr-2 pt-[10px] text-black">
                <TbReload />
            </div>
            {t('clearFilter')}
        </button>
    );
};

export default ClearFilter;
