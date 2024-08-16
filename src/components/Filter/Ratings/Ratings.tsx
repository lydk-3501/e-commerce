import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterParams } from '@store/filterSlice';
import { RootState } from '@store/configureStore';
import { ratingNumbers } from '@constants/ratings.constant';

const Ratings: React.FC<{ count: number }> = ({ count }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useSelector((state: RootState) => state.filterSlice);

    const handleRatingSelect = (rating: number) => {
        dispatch(setFilterParams({
            ...params,
            rating: rating,
        }));
    };

    useEffect(() => {
        // Reset the selected rating when params.rating is 0
        if (params.rating === 0) {
            dispatch(setFilterParams({
                ...params,
                rating: null,
            }));
        }
    }, [params.rating, dispatch]);

    const renderStars = (rating: number) => {
        const isSelected = params.rating === rating;
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
