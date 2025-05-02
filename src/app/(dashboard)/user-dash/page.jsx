"use client";

import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { getUserBookedVehicle } from "../../../../actions/user";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const {
    data: userBookedData,
    loading: userDashboardLoading,
    error,
    fn: getUserBookedVehicleFn,
  } = useFetch(getUserBookedVehicle);

  useEffect(() => {
    getUserBookedVehicleFn();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [error]);

  console.log(userBookedData);

  const user = userBookedData?.user;
  const bookings = userBookedData?.bookings || [];

  const activeCount = bookings.filter((b) => b.status === "Active").length;
  const completedCount = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const router = useRouter();

  return userDashboardLoading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
      <BarLoader color="#3b82f6" height={6} width={150} />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        {/* user info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-6 bg-white p-6 rounded-xl shadow">
            <img
              src={user?.imageUrl}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Welcome, {user?.name}
              </h2>
              <p className="text-gray-600 mb-1">Email: {user?.email}</p>
              <p className="text-gray-600">Total Rentals: {bookings.length}</p>
            </div>
          </div>

          {/* quick info */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <button
              onClick={() => router.push("/vehicles")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Book a Vehicle
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
            >
              Go To Home
            </button>
          </div>
        </div>

        {/* table */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Vehicle</th>
                <th className="border px-4 py-2">Pickup Location</th>
                <th className="border px-4 py-2">Drop Location</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {booking.vehicle?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.pickupLocation || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.dropoffLocation || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(booking.startTime).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(booking.endTime).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-2 py-1 text-sm font-medium ${
                      booking.status === "Active"
                        ? "bg-gray-100 text-gray-700"
                        : booking.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <p className="text-gray-500 mt-4">No bookings found.</p>
          )}
        </div>

        {/* booking counts */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-xl font-bold">{bookings.length}</h3>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{activeCount}</h3>
            <p className="text-gray-600">Active</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{completedCount}</h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
