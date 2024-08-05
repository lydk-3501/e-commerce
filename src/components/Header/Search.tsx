import React from 'react';
import { LuSearch } from 'react-icons/lu';

const Search = () => {
    return (
        <form className="search-box-form flex flex-col bg-white h-16 rounded-lg align-middle static">
            <input
                className="search-box-input focus:outline-none cursor-text text-black pl-16  pr-12 h-16 rounded-lg placeholder-slate-300"
                maxLength={512}
                placeholder="Product, brand, color, ..."
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                type="search"
            />

            <button className="search-box-submit absolute h-16 text-search-icon text-xl pl-8 pr-4">
                <LuSearch />
            </button>
        </form>
    );
};

export default Search;
