"use server";
 
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import sendEmail from "./sendEmail";
import EmailTemplate from "../emails/EmailTemplate";

export const bookVehicle = async (data, vehicleId) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const vehicle = await db.vehicle.findFirst({
    where: { id: vehicleId },
    include: {
      owner: {
        select: {
          name: true,
          email:true
        },
      },
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

  //send Email to user
  await sendEmail({
    to: user.email,
    subject: `Your RentRide booking is confirmed, ${user.name.split(" ")[0]}!`,
    react: EmailTemplate({
      recipientType: "user",
      data: {
        userName: user.name.split(" ")[0],
        ownerName: vehicle.owner.name.split(" ")[0],
        ownerEmail: vehicle.owner.email,
        vehicle: {
          name: vehicle.name,
          brandName: vehicle.brandName,
          type: vehicle.type,
          gearType: vehicle.gearType,
          airConditioning: vehicle.airConditioning,
        },
        booking: {
          startTime: booking.startTime,
          endTime: booking.endTime,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation,
        },
      },
    }),
  });

  //send Email to Owner
  await sendEmail({
    to: vehicle.owner.email,
    subject: `Your vehicle has been successfully booked, ${vehicle.owner.name.split(" ")[0]}`,
    react: EmailTemplate({
      recipientType: "owner",
      data: {
        ownerName: vehicle.owner.name.split(" ")[0],
        userName: user.name.split(" ")[0],
        customerEmail: user.email,
        vehicle: {
          name: vehicle.name,
          brandName: vehicle.brandName,
          type: vehicle.type,
          gearType: vehicle.gearType,
          airConditioning: vehicle.airConditioning,
        },
        booking: {
          startTime: booking.startTime,
          endTime: booking.endTime,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation,
        },
      },
    }),
  });

  console.log(booking);
};
