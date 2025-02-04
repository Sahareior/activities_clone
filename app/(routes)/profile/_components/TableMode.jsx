export default function TableMode() {
    const orders = [
      { id: "#6523", date: "September 10, 2020", status: "Processing", total: "$326.63 for 3 items" },
      { id: "#6523", date: "September 10, 2020", status: "On Hold", total: "$326.63 for 3 items" },
      { id: "#6523", date: "September 10, 2020", status: "Processing", total: "$326.63 for 3 items" },
      { id: "#6523", date: "September 10, 2020", status: "Processing", total: "$326.63 for 3 items" },
      { id: "#6523", date: "September 10, 2020", status: "Processing", total: "$326.63 for 3 items" },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4  text-left">Order</th>
              <th className="py-2 px-4  text-left">Date</th>
              <th className="py-2 px-4  text-left">Status</th>
              <th className="py-2 px-4  text-left">Total</th>
              <th className="py-2 px-4  text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 t px-4 text-red-500">{order.id}</td>
                <td className="py-2 text-black px-4">{order.date}</td>
                <td className="py-2 text-black px-4">{order.status}</td>
                <td className="py-2 text-black px-4">{order.total}</td>
                <td className="py-2 text-black px-4">
                  <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  