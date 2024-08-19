import React from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary';
import Header from '@components/Header/Header';
import Filter from '@components/Filter/Filter';
import Sort from '@components/Sort/Sort';

const Home = () => {
    return (
        <ErrorBoundary>
            <Header />
            <div className="content">
                <main className="container flex px-4 py-8">
                    <Filter />
                    <div className="container-results box-border w-3/4 max-w-[948px] min-w-[500px]">
                        <header>
                            <Sort />
                        </header>
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default Home;
