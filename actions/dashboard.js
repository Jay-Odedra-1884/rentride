"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getOwnerDashboardData = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const owner = await db.owner.findFirst({
      where: {
        clerkUserId: userId,
      },
    });

    if (!owner) throw new Error("Owner not found");

    const vehicles = await db.vehicle.findMany({
      where: { ownerId: owner.id },
      include: { bookings: true }, 
    });

    const totalVehicles = vehicles.length;

    const vehiclesInMaintenance = vehicles.filter(
      (v) => v.status === "MAINTAINANCE"
    ).length;

    const bookings = await db.booking.findMany({
      where: {
        vehicle: {
          ownerId: owner.id,
        },
      },
      include: {
        user: true, 
        vehicle: true, 
      },
    });
    return {
      totalVehicles,
      vehiclesInMaintenance,
      bookings
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
