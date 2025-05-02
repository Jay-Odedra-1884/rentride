"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getUserBookedVehicle = async()=>{
    try {
        const { userId } = await auth();
        
            if (!userId) throw new Error("Unauthorized");
        
            const user = await db.user.findUnique({
              where: {
                clerkUserId: userId,
              },
            });
        
            if (!user) throw new Error("User not found");

            const bookings = await db.booking.findMany({
              where: {
                userId: user.id,
              },
              include: {
                vehicle: {
                  include: {
                    owner: true,
                  },
                },
              },
            });

            return { user, bookings };

    } catch (error) {
         throw new Error(error.message);
    }
}