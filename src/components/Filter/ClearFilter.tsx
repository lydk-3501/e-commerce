// ClearFilter.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TbReload } from 'react-icons/tb';
import { ClearFilterProps } from './filter.type';
const ClearFilter: React.FC<ClearFilterProps> = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <button
            className="clear-filter flex justify-between leading-8 text-slate-500 text-[12px]"
            onClick={onClick}
        >
            <div className="pr-2 pt-[10px] text-black">
                <TbReload />
            </div>
            {t('clearFilter')}
        </button>
    );
};

export default ClearFilter;
