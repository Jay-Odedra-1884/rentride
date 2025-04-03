import { db } from "@/lib/prisma";

export async function POST(req) {
    try {
        const vehicles = [
            {
                imageUrl: "/car1.svg",
                name: "BMW M4",
                passengerCapacity: 4,
                gearType: "AUTOMATIC",
                airConditioning: true,
                doors: 4,
                rating: 4.8,
                price: 1000,
                owner: "City Rentals",
                type: "CAR",
                vehicleNumber: "GJ12AB345"
            },
            {
                imageUrl: "https://i.pinimg.com/736x/9e/ca/e5/9ecae5a5505b76b0f41b69eae06be1f9.jpg",
                name: "Mahindra Thar",
                passengerCapacity: 4,
                gearType: "MANUAL",
                airConditioning: true,
                doors: 3,
                rating: 4.5,
                price: 5000,
                owner: "City Rentals",
                type: "SUV",
                vehicleNumber: "GJ05XY123"
            },
            {
                imageUrl: "https://wallpapers.com/images/hd/white-mahindra-bolero-side-view-v56o5ghhb4nm6s7r-2.png",
                name: "Mahindra Bolero",
                passengerCapacity: 7,
                gearType: "MANUAL",
                airConditioning: true,
                doors: 5,
                rating: 4.9,
                price: 4000,
                owner: "Drive Easy",
                type: "SUV",
                vehicleNumber: "GJ09PQ567"
            },
            {
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWGnI_AZmR9GFc4atD5_7M6MqRMG4WZIg70U5DkRdscl_-rA3Qz6OFmzpVXHnuaDzzpI&usqp=CAU",
                name: "Mahindra Scorpio",
                passengerCapacity: 5,
                gearType: "AUTOMATIC",
                airConditioning: true,
                doors: 4,
                rating: 4.6,
                price: 5500,
                owner: "Outdoor Adventures",
                type: "SUV",
                vehicleNumber: "GJ18CD890"
            },
            {
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh-qiYNEhQn_Xy2BTTfwEROvoNGSGnSYmFQ&s",
                name: "Jeep Wrangler",
                passengerCapacity: 5,
                gearType: "MANUAL",
                airConditioning: false,
                doors: 4,
                rating: 4.3,
                price: 7000,
                owner: "Adventure Rentals",
                type: "SUV",
                vehicleNumber: "GJ22KL456"
            }
        ];

        await db.vehicle.createMany({
            data: vehicles,
            skipDuplicates: true, // Avoid inserting duplicates
        });

        return Response.json({ message: "Vehicles seeded successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Seeding error:", error);
        return Response.json({ message: "Failed to seed vehicles", error }, { status: 500 });
    }
}
