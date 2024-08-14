import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentProps } from './freeship.type';
import { FilterParams } from '../filter.type';

const FreeShipping: React.FC<ComponentProps> = ({ params, setParams }) => {
    const { t } = useTranslation();

    const [isFreeShipping, setIsFreeShipping] = useState<boolean>(
        params.isFreeShipping
    );

    const handleToggle = () => {
        const newValue = !isFreeShipping;
        setParams((prevParams: FilterParams) => ({
            ...prevParams,
            isFreeShipping: newValue,
        }));
        setIsFreeShipping(newValue);
    };

    useEffect(() => {
        setIsFreeShipping(params.isFreeShipping);
    }, [params.isFreeShipping]);

    return (
        <div className="w-[260px] border-t py-8">
            <h2 className="freeshipping-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                {t('freeshippingHeader')}
            </h2>
            <div className="flex justify-items-between">
                <span className="toggle-label text-sm">
                    {t('freeshippingToggleLabel')}
                </span>
                <span className="text-xs">{isFreeShipping ? 'Yes' : 'No'}</span>
                <div
                    className={`cursor-pointer h-[16px] ml-1 w-[30px] rounded-full flex justify-items-between ${
                        isFreeShipping ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                    onClick={handleToggle}
                >
                    <div
                        className={`bg-white w-[16px] h-[16px] rounded-full shadow-md transform transition-transform duration-300 ${
                            isFreeShipping
                                ? 'translate-x-[14px]'
                                : 'translate-x-0'
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default FreeShipping;
