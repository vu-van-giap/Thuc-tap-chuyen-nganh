import React from 'react';

const RecentUpdates = () => {
    // Mock data for recent updates
    const updates = [
        {
            id: '1',
            title: 'New JavaScript Course Added',
            date: 'April 15, 2025',
            description: 'Explore our new interactive JavaScript course for beginners.',
        },
        {
            id: '2',
            title: 'Platform Update: Improved Search',
            date: 'April 10, 2025',
            description: 'Our search feature now supports advanced filters for resources.',
        },
        {
            id: '3',
            title: 'Cybersecurity E-Book Released',
            date: 'April 5, 2025',
            description: 'Download our latest e-book on cybersecurity best practices.',
        },
    ];

    return (
        <section className="py-16 px-6 bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Recent Updates
            </h2>
            <div className="space-y-6">
                {updates.map((update) => (
                    <div
                        key={update.id}
                        className="border-l-4 border-blue-600 pl-4 py-2"
                    >
                        <h3 className="text-xl font-semibold text-gray-800">
                            {update.title}
                        </h3>
                        <p className="text-sm text-gray-500">{update.date}</p>
                        <p className="text-gray-600 mt-2">{update.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentUpdates;