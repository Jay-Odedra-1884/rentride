import Razorpay from "razorpay";

export async function POST(req) {
    
        const body = await req.json();
        const { amount } = body;

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `rentride_receipt_${Math.random()}`,
        };

        try {
            const order = await razorpay.orders.create(options);
            return new Response(JSON.stringify(order), { status: 200 });
        } catch (error) {
            console.log("Error creating Razorpay order:", error);
            return new Response(
                JSON.stringify({ error: 'Failed to create order' }),
                { status: 500 }
            ); 
        }
}