import React from 'react';
import Banner from './Banner';
import FeaturedResources from './FeaturedResources';
import RecommendedTutorials from './RecommendedTutorials';
import RecentUpdates from './RecentUpdates';

const Home = () => {
    return (
        <div className="bg-gray-50">
            <Banner />
            <FeaturedResources />
            <RecommendedTutorials />
            <RecentUpdates />
        </div>
    );
};

export default Home;