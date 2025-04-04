import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkOwner = async()=>{
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        const loggedInAdmin = await db.owner.findFirst({
            where:{
                clerkUserId: user.id,
            },
        })

        if (loggedInAdmin) {
            return loggedInAdmin
        }

        const name = `${user.firstName} ${user.lastName}`

        const newUser = await db.owner.create({
            data:{
                clerkUserId:user.id,
                name,
                email:user.emailAddresses[0].emailAddress,
            }
        })

        return newUser
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}