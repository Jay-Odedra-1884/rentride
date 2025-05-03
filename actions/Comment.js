"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/vehicles/${vehicleId}`); 
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
                 clerkUserId:true
               },
             },
           },
         });

         return allComments;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteComment = async (id)=>{
  try {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");

      const user = await db.user.findUnique({
        where: {
          clerkUserId: userId,
        },
      });

      if (!user) throw new Error("User not found");

      const comment = await db.comment.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              clerkUserId:true
            },
          },
        },
      });

      if(userId == comment.user.clerkUserId){
        const deletedComment = await db.comment.delete({
          where:{
            id
          }
        })
        return { status: true, deletedComment: deletedComment };
      }else{
        throw new Error("User is Unauthorized");
      }

  } catch (error) {
    throw new Error(error.message)
  }
}