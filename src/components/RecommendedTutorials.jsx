import React from 'react';

const RecommendedTutorials = () => {
    // Mock data for recommended tutorials
    const tutorials = [
        {
            id: '1',
            title: 'React for Beginners',
            description: 'Learn React.js with practical projects and examples.',
            link: 'https://example.com/react-tutorial',
        },
        {
            id: '2',
            title: 'Node.js Backend Development',
            description: 'Build scalable APIs with Node.js and Express.',
            link: 'https://example.com/nodejs-tutorial',
        },
        {
            id: '3',
            title: 'Machine Learning Basics',
            description: 'Get started with ML using Python and TensorFlow.',
            link: 'https://example.com/ml-tutorial',
        },
    ];

    return (
        <section className="py-16 px-6 bg-white">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Recommended Tutorials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {tutorial.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{tutorial.description}</p>
                        <a
                            href={tutorial.link}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Start Tutorial
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedTutorials;