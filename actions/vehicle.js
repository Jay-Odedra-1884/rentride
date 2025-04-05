"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

//to get all vehicles data
export const getAllVehicle = async ()=>{
   try {

    const {userId}= await auth();

    if(!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })

    if(!user) throw new Error("User not found")

    const data = await db.vehicle.findMany()
    return data
    
   } catch (error) {
    throw new Error(error.message)
   }
}

//to get a one vehicle data
export const getVehicleById = async (id) => {
    const data = await db.vehicle.findFirst({
        where: {id : id}
    });
    return data
};


//create vehicle

export const createVehicle = async (data)=>{
    try {
        const {userId}= await auth();
        if(!userId) throw new Error("Unauthorized");

        console.log(userId)

        const user = await db.owner.findFirst({
            where:{
                clerkUserId:userId
            }
        })

        if(!user) throw new Error("User not found")


        const vehicle = await db.vehicle.create({
            data:{
                ...data,
                ownerId:user.id
            }
        })
        revalidatePath("/vehicle")
        revalidatePath("/rental")
        return vehicle
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getVehicleByOwnerId = async () => {
    try {
        const {userId}= await auth();
        if(!userId) throw new Error("Unauthorized");


        const user = await db.owner.findFirst({
            where:{
                clerkUserId:userId
            }
        })

        if(!user) throw new Error("User not found")


        const vehicles = await db.vehicle.findMany({
            where: { ownerId:user.id },
        });
        revalidatePath("/vehicle")
        revalidatePath("/rental")
        return vehicles;
    } catch (error) {
        throw new Error(error.message);
    }
}



export const updateVehicle = async (id, data) => {
    try {
        const {userId}= await auth();
        if(!userId) throw new Error("Unauthorized");

        console.log(userId)

        const user = await db.owner.findFirst({
            where:{
                clerkUserId:userId
            }
        })

        if(!user) throw new Error("User not found")


        const vehicle = await db.vehicle.update({
            where: { id },
            data,
        });
        revalidatePath("/vehicle")
        revalidatePath("/rental")
        return vehicle;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const deleteVehicle = async (id) => {    
    try {
        const {userId}= await auth();
        if(!userId) throw new Error("Unauthorized");

        console.log(userId)

        const user = await db.owner.findFirst({
            where:{
                clerkUserId:userId
            }
        })

        if(!user) throw new Error("User not found")


        const vehicle = await db.vehicle.delete({
            where: { id },
        });

        revalidatePath("/vehicle")
        revalidatePath("/rental")
        return vehicle;

    } catch (error) {
        throw new Error(error.message);
    }
}   