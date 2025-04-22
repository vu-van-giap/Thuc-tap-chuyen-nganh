import React from 'react';
import ResourceCard from './ResourceCard'; // Assuming ResourceCard exists

const FeaturedResources = () => {
    // Mock data for featured resources
    const resources = [
        {
            _id: '1',
            title: 'Introduction to Python Programming',
            description: 'Learn the basics of Python with this comprehensive e-book.',
            category: 'Programming',
            link: 'https://example.com/python-ebook',
        },
        {
            _id: '2',
            title: 'Database Fundamentals',
            description: 'Understand SQL and NoSQL databases with hands-on exercises.',
            category: 'Databases',
            link: 'https://example.com/database-course',
        },
        {
            _id: '3',
            title: 'Cybersecurity Essentials',
            description: 'Explore key concepts in cybersecurity and ethical hacking.',
            category: 'Cybersecurity',
            link: 'https://example.com/cybersecurity-guide',
        },
    ];

    return (
        <section className="py-16 px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Featured Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedResources;