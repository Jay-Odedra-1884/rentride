"use client";

import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { getOwnerDashboardData } from "../../../../actions/dashboard";
import { toast } from "sonner";
import { getVehicleByOwnerId } from "../../../../actions/vehicle";
import { useRouter } from "next/navigation";

const AdminDash = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const AllVehicle = await getVehicleByOwnerId();
        setData(AllVehicle);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchVehicles();
  }, []);

  const {
    data: ownerDashboardData,
    loading: ownerDashboardLoading,
    error,
    fn: getOwnerDashboardDataFn,
  } = useFetch(getOwnerDashboardData);

  useEffect(() => {
    getOwnerDashboardDataFn();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [error]);

  return (
    <div>
      {ownerDashboardLoading || !ownerDashboardData ? (
        "Loading..."
      ) : (
        <div className="p-4">
          {console.log(ownerDashboardData)}
          {console.log("All vehicles : ", data)}
          <div className="flex gap-2 items-center">
          <button onClick={() => {router.push("/rental")}} className="bg-black text-white px-2 py-1 rounded-md"><i className="fa-solid fa-arrow-left"></i></button>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          </div>
          <hr className="mt-3" />
          <div className="grid md:grid-cols-3 gap-2 mt-3">
            <div className="bg-blue-200 flex flex-col justify-center items-center py-7 rounded-xl text-gray-500">
              Total vehicles <br />{" "}
              <span className="text-black">
                {ownerDashboardData.totalVehicles}
              </span>
            </div>
            <div className="bg-pink-200 flex flex-col justify-center items-center py-7 rounded-xl text-gray-500">
              Vehicles in maintainance <br />{" "}
              <span className="text-black">
                {ownerDashboardData.vehiclesInMaintenance}
              </span>
            </div>
            <div className="bg-green-200 flex flex-col justify-center items-center py-7 rounded-xl text-gray-500">
              Total Bookings <br />{" "}
              <span className="text-black">
                {ownerDashboardData.bookings.length}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-5 rounded-xl shadow mt-3 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Currunt Bookings</h2>
            <table className="w-full text-left border bg-white">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Car Number</th>
                  <th className="border px-4 py-2">Pickup Location</th>
                  <th className="border px-4 py-2">Dropoff Location</th>
                  <th className="border px-4 py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {ownerDashboardData.bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{b.vehicle.name}</td>
                    <td className="border px-4 py-2">
                      {b.vehicle.vehicleNumber}
                    </td>
                    <td className="border px-4 py-2">{b.pickupLocation} </td>
                    <td className="border px-4 py-2">{b.dropoffLocation} </td>
                    <td className="border px-4 py-2">
                      {new Date(b.startTime).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      <span className="font-bold underline ms-1.5 me-1.5 text-xs">To</span>
                      {" "}
                      {new Date(b.endTime).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-100 p-5 rounded-xl shadow mt-3 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Cars status</h2>
            <table className="w-full text-left border bg-white">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Rating</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{b.name}</td>
                    <td className="border px-4 py-2">₹ {b.price}</td>
                    <td className="border px-4 py-2">{b.rating} ⭐</td>
                    <td className="border px-4 py-2">
                      {b.status} {b.status === "MAINTAINANCE" ? "🔧" : "✅"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
