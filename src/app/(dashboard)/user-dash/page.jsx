export default function DashboardPage() {
  const user = {
    name: "abc",
    email: "abc@gmail.com",
    rentals: 3,
  };

  const bookings = [
    { id: 1, vehicle: "Honda City", date: "2025-05-01", status: "Active" },
    { id: 2, vehicle: "suzuki swift", date: "2025-04-20", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}</h2>
            <p className="text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-gray-600">Total Rentals: {user.rentals}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
              Book a Vehicle
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Vehicle</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{b.id}</td>
                  <td className="border px-4 py-2">{b.vehicle}</td>
                  <td className="border px-4 py-2">{b.date}</td>
                  <td className="border px-4 py-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
