import React from 'react';
import { useTranslation } from 'react-i18next';
import './header.css';
import Search from './Search';

const Header = () => {
    const { t } = useTranslation();
    return (
        <header className="header bg-transparent bg-cover bg-center bg-no-repeat bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col h-96 items-center justify-center px-4 py-2 text-center text-white">
            <p className="header-logo">
                <a href="https://algolia.com" aria-label={t('headerLogoLabel')}>
                    <img src="../../../public/images/logo.svg"></img>
                </a>
            </p>
            <p className=" header-title text-4xl font-thin my-12 ">
                {t('headerTitle')}
            </p>
            <div className="search-box h-16 w-4/5 max-w-[740px]">
                <Search />
            </div>
        </header>
    );
};

export default Header;
