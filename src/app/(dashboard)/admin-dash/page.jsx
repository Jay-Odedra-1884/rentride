"use client";

import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { getOwnerDashboardData } from "../../../../actions/dashboard";
import { toast } from "sonner";


const AdminDash = () => {
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

  ////////ownerDashboardData is actual data....

  return (
    <div>
      {ownerDashboardLoading || !ownerDashboardData ? (
        "Loading..."
      ) : (
        <div>
          <p>Total Vehicles: {ownerDashboardData.totalVehicles}</p>
          <p>
            Vehicles in Maintenance: {ownerDashboardData.vehiclesInMaintenance}
          </p>
          <p>Total Booking: {ownerDashboardData.bookings.length}</p>
          {ownerDashboardData.bookings.map((booking, index) => (
            <div key={index}>
              <p>{booking.pickupLocation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDash;
