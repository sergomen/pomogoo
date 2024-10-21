import { connectToDB } from '@/utils/database';
import Time from '@/models/time';

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const time = await Time.findById(params.id).populate('creator');
        if (!time) return new Response("Time not found", { status: 404 });

        return new Response(JSON.stringify(time), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all times", { status: 500 });
    }
};

// PATCH
export const PATCH = async (req, { params }) => {
    const { time, title } = await req.json();

    try {
        await connectToDB();

        const existingTime = await Time.findById(params.id);
        
        if (!existingTime) return new Response("Time not found", { status: 404 });

        existingTime.time = time;
        existingTime.title = title;

        await existingTime.save();

        return new Response(JSON.stringify(existingTime), { status: 200 });
    } catch (error) {
        return new Response("Failed to update time", { status: 500 });
    }
};

// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Time.findByIdAndDelete(params.id);

        return new Response("Time deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete time", { status: 500 });
    }
};