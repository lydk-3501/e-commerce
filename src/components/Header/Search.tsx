import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults } from '@store/Items/reducer';
import { RootState } from '@store/configureStore';
import { LuSearch } from 'react-icons/lu';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { lunrIndex, items } = useSelector((state: RootState) => state.Items);

    useEffect(() => {
        if (lunrIndex && query.trim() !== '') {
            const results = lunrIndex
                .search(query)
                .map((result) => {
                    const item = items.find(
                        (item) => item.objectID === result.ref
                    );
                    if (item) {
                        return {
                            ...item,
                            highlight: getHighlightedText(item, query),
                        };
                    }
                    return null;
                })
                .filter((item) => item !== null);

            dispatch(setSearchResults(results));
        }
    }, [query, lunrIndex, dispatch, items]);

    const getHighlightedText = (item: any, query: string) => {
        const highlightText = (text: string) => {
            const parts = text.split(new RegExp(`(${query})`, 'gi'));
            return parts.map((part, index) =>
                query.toLowerCase() === part.toLowerCase() ? (
                    <mark key={index}>{part}</mark>
                ) : (
                    part
                )
            );
        };

        return {
            name: highlightText(item.name),
            description: highlightText(item.description),
        };
    };

    return (
        <div className="relative">
            <form className="search-box-form flex flex-col bg-white h-16 rounded-lg align-middle static">
                <input
                    className="search-box-input focus:outline-none cursor-text text-black pl-16 pr-12 h-16 rounded-lg placeholder-slate-300"
                    maxLength={512}
                    placeholder="Product, brand, color,..."
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-box-submit absolute h-16 text-search-icon text-xl pl-8 pr-4">
                    <LuSearch />
                </button>
            </form>
        </div>
    );
};

export default Search;
