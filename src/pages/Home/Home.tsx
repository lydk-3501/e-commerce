import React from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary';
import Header from '@components/Header/Header';
import Filter from '@components/Filter/Filter';
import Sort from '@components/Sort/Sort';
import ItemList from '@components/Item/ItemList';

const Home: React.FC = () => {
    return (
        <ErrorBoundary>
            <Header />
            <div className="content flex justify-center">
                <main className="container box-border flex max-w-[1400px] px-4 py-8">
                    <Filter />
                    <div className="container-results box-border w-3/4 max-w-[948px] min-w-[500px]">
                        <header>
                            <Sort />
                        </header>
                        <ItemList />
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default Home;
