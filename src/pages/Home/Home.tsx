import React from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary';
import Header from '@components/Header/Header';
import Filter from '@components/Filter/Filter';

const Home = () => {
    return (
        <ErrorBoundary>
            <Header />
            <div className="content">
                <main className="container flex px-4 py-8">
                    <Filter />
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default Home;
