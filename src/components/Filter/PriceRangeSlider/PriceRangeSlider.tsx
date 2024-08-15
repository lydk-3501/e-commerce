import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Range, getTrackBackground } from 'react-range';
import { ComponentProps } from './price.type';
import { SLIDER_TRACK_BG, SLIDER_TRACK_HIGHLIGHT } from '@constants/color.constant';

const PriceRangeSlider: React.FC<ComponentProps> = ({
    min = 1,
    max = 4800,
    params,
    setParams,
}) => {
    const { t } = useTranslation();

    const [values, setValues] = useState<number[]>([
        params.priceMin || min,
        params.priceMax || max,
    ]);

    const handleChange = (values: number[]) => {
        setValues(values);
    };

    useEffect(() => {
        setValues([params.priceMin || min, params.priceMax || max]);
    }, [params.priceMin, params.priceMax, min, max]);

    useEffect(() => {
        setParams((prevParams) => ({
            ...prevParams,
            priceMin: values[0],
            priceMax: values[1],
        }));
    }, [values[0], values[1], setParams]);

    return (
        <div className="w-[260px] border-t py-8">
            <h2 className="slider-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                {t('sliderHeader')}
            </h2>
            <Range
                step={1}
                min={min}
                max={max}
                values={values}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-1 w-full rounded"
                        style={{
                            background: getTrackBackground({
                                values,
                                colors: [SLIDER_TRACK_BG, SLIDER_TRACK_HIGHLIGHT, SLIDER_TRACK_BG],
                                min,
                                max,
                            }),
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="h-4 w-4 bg-white drop-shadow-lg rounded-full"
                    />
                )}
            />
            <div className="flex justify-between mt-2 text-sm">
                <span>${values[0]}</span>
                <span>${values[1]}</span>
            </div>
        </div>
    );
};

export default PriceRangeSlider;
