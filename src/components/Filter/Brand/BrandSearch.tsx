import React from 'react';
import { LuSearch } from 'react-icons/lu';

const BrandSearch = () => {
    return (
        <div className="pb-4">
            <form className="brand-search-form border flex flex-col h-10 rounded-lg align-middle static">
                <input
                    className="brand-search-input bg-slate-100 cursor-text focus:outline-none focus:border-none focus:ring-0 text-black h-16 rounded-lg placeholder-slate-400 pl-8 pr-2"
                    maxLength={512}
                    placeholder="Search for brand"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="search"
                />
                <button className="search-box-submit absolute h-10 font-light text-black text-sm pl-1 pr-1">
                    <LuSearch />
                </button>
            </form>
        </div>
    );
};

export default BrandSearch;
