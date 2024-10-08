import React from 'react';
import { Tooltip } from 'react-tooltip';
import { ItemProps } from './item.type';
import { SLIDER_TRACK_BG } from '@constants/color.constant';

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text;
};

const Item: React.FC<ItemProps> = ({
    name,
    description,
    categories,
    price,
    rating,
    image,
}) => {
    const truncatedDescription = truncateText(description, 50);

    return (
        <>
            <article className="item max-w-[200px]">
                <header className="image-container items-center flex mx-3 max-w-[175px] h-[175px]">
                    <img className="object-cover" src={image} alt={name} />
                </header>
                <div className="info-container">
                    <p className="item-category font-semibold mb-2 mt-3 text-gray-500 text-xs uppercase">
                        {categories.join(' & ')}
                    </p>
                    <h1 className="item-highlight break-words font-bold leading-[18px] text-[14.4px]">
                        <span>{name}</span>
                    </h1>
                    <a
                        className="item-description break-words mb-3 text-sm"
                        data-tooltip-id="item-description"
                        data-tooltip-content={description}
                    >
                        {truncatedDescription}
                    </a>
                    <Tooltip
                        id="item-description"
                        style={{
                            backgroundColor: SLIDER_TRACK_BG,
                            color: '#222',
                            fontSize: '12px',
                            opacity: 0.8,
                            width: '200px',
                        }}
                        place="bottom"
                    />
                </div>
                <footer>
                    <p className="flex items-center my-3.5">
                        <span className="item-em font-semibold text-search-icon text-xs flex items-center">
                            $
                        </span>
                        <strong className="text-sm ml-1">
                            {price.toFixed(2)}
                        </strong>
                        <span className="item-em item-rating border border-yellow-500 flex font-semibold items-center ml-1 px-1 rounded-md text-search-icon text-[11px]">
                            <img
                                className="h-2 mr-1 w-2"
                                src="../../../../public/images/star.svg"
                                alt=""
                            />
                            {rating}
                        </span>
                    </p>
                </footer>
            </article>
        </>
    );
};

export default Item;
