import React from 'react';

const Items = () => {
    // Array of card data
    const playSessions = [
        {
            id: 1,
            title: "Coffee & Catchup - Monday",
            price: "AED 65.00",
            imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
            description: "Relaxed morning session with coffee and snacks"
        },
        {
            id: 2,
            title: "Creative Arts - Wednesday",
            price: "AED 85.00",
            imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
            description: "Explore painting and craft activities"
        },
        {
            id: 23,
            title: "Creative Arts - Wednesday",
            price: "AED 85.00",
            imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
            description: "Explore painting and craft activities"
        },
        {
            id: 22,
            title: "Creative Arts - Wednesday",
            price: "AED 85.00",
            imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
            description: "Explore painting and craft activities"
        },
        {
            id: 3,
            title: "Music & Movement - Friday",
            price: "AED 75.00",
            imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F54D83052-AAFC-4DE3-9996-7F52ABC842EB.jpg&w=384&q=75",
            description: "Interactive music and dance session"
        }
    ];

    return (
        <div className="space-y-4">
            <div className="mb-6">
                <h2 className='font-extrabold text-xl text-gray-800 mb-2'>Play Sessions</h2>
                <p className='text-gray-600 text-sm'>
                    Explore our engaging activities designed for creative learning
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {playSessions.map((session) => (
                    <div 
                        key={session.id}
                        className="flex items-center bg-white hover:cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Left Section: Event Info */}
                        <div className="p-4 w-1/2">
                            <h3 className="text-[12px] font-semibold text-gray-900 mb-2">
                                {session.title}
                            </h3>
                            <p className="text-primary font-medium text-[10px]">
                                {session.price}
                            </p>
               
                        </div>

                        {/* Right Section: Image */}
                        <div className="w-1/2 h-32 relative">
                            <img
                                src={session.imageUrl}
                                alt={session.title}
                                className="w-full h-full object-cover rounded-r-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Items;