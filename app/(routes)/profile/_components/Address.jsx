export default function Address() {
    const address = {
      name: "Annie Mario",
      email: "annie@example.com",
      phone: "1234 567890",
      street: "7398 Smoke Ranch Road",
      city: "Las Vegas, Nevada 89128",
    };
  
    return (
      <div className="p-6 bg-white rounded-lg ">
        <p className="text-gray-600 mb-4">
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-black font-semibold">Shipping Address</h2>
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">✎</span>
            </div>
            <hr className="my-2" />
            <p className="text-black"><strong>Name:</strong> {address.name}</p>
            <p className="text-black"><strong>Email:</strong> {address.email}</p>
            <p className="text-black"><strong>Phone:</strong> {address.phone}</p>
            <p className="mt-2 text-black">{address.street}</p>
            <p className="text-black">{address.city}</p>
          </div>
  
          {/* Billing Address */}
          <div className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-black font-semibold">Billing Address</h2>
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">✎</span>
            </div>
            <hr className="my-2" />
            <p className="text-black"><strong>Name:</strong> {address.name}</p>
            <p className="text-black"><strong>Email:</strong> {address.email}</p>
            <p className="text-black"><strong>Phone:</strong> {address.phone}</p>
            <p className="mt-2 text-black">{address.street}</p>
            <p className="text-black">{address.city}</p>
          </div>
        </div>
      </div>
    );
  }
  