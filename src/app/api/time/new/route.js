import { connectToDB } from '@/utils/database';
import Time from '@/models/time';

export const POST = async (req) => {
    const { userId, time, title, score } = await req.json();

    try {
        await connectToDB();
        const newTime = new Time({
            creator: userId,
            time,
            title,
            score
        });

        await newTime.save();

        return new Response(JSON.stringify(newTime), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new time", { status: 500 });
    }
}