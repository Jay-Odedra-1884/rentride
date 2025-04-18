"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const bookVehicle = async (data, vehicleId) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const vehicle = await db.vehicle.findFirst({
    where: {
      id: vehicleId,
    },
  });

 const booking = await db.booking.create({
   data: {
     ...data,
     startTime: new Date(`${data.startTime}:00`),
     endTime: new Date(`${data.endTime}:00`),
     userId: user.id,
     vehicleId,
   },
 });


  console.log(booking);
};
