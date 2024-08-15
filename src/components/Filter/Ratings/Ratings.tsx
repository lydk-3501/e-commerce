import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdStar } from 'react-icons/io';
import { ComponentProps } from './rating.type';
import { ratingNumbers } from '@constants/ratings.constant';

const Ratings: React.FC<ComponentProps> = ({ count, params, setParams }) => {
    const { t } = useTranslation();
    const [selectedRating, setSelectedRating] = useState<number | null>(
        params.rating || null
    );

    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
        setParams((prevParams) => ({
            ...prevParams,
            rating: rating,
        }));
    };

    useEffect(() => {
        if (params.rating === 0) {
            setSelectedRating(null);
        }
    }, [params.rating]);

    const renderStars = (rating: number) => {
        const isSelected = selectedRating === rating;
        return (
            <button
                key={rating}
                onClick={() => handleRatingSelect(rating)}
                className={`flex text-[26px] mb-2 ${
                    !isSelected ? 'opacity-60' : ''
                }`}
            >
                {Array.from({ length: 5 }, (_, index) => (
                    <IoMdStar
                        key={index}
                        className={`mr-1 ${
                            index < rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    />
                ))}
                <span className="brand-item-count bg-gray-300 font-bold ml-2 mt-[6px] px-1 rounded tracking-[1.1px] text-[0.64rem] text-gray-600">
                    {count}
                </span>
            </button>
        );
    };

    return (
        <div className="w-[260px] border-t py-8">
            <h2 className="ratings-header font-hind font-semibold leading-normal pb-4 text-[0.678rem] text-[#21243d] tracking-[.08rem] uppercase">
                {t('ratingHeader')}
            </h2>
            {ratingNumbers.map((rating) => renderStars(rating))}
        </div>
    );
};

export default Ratings;
