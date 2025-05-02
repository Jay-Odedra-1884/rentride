"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createComment = async ({msg, rating, vehicleId}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    const comment = await db.comment.create({
      data: {
        msg,
        rating,
        userId: user.id,
        vehicleId,
      },
    });

    console.log(comment);
    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllCommentById = async (vehicleId)=>{
    try {
        const {userId} = await auth();
         if (!userId) throw new Error("Unauthorized");

         const user = await db.user.findUnique({
           where: {
             clerkUserId: userId,
           },
         });

         if (!user) throw new Error("User not found");

         const allComments = await db.comment.findMany({
           where: {
             vehicleId,
           },
           include: {
             user: {
               select: {
                 id: true,
                 name: true,
                 imageUrl: true,
               },
             },
           },
         });

         console.log("✅ allComments:",allComments);
         return allComments;

    } catch (error) {
        throw new Error(error.message)
    }
}
