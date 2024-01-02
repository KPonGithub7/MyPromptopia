import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");

        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
};

//UPDATE

export const PATCH = async (req, { params }) => {
    const { prompt, tags } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt)
            return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tags = tags;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
};

//DELETE
//(use findByIdAndDelete the Remove method is deprecated or not working)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        console.log("The Promph had been deleted successfully");
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
};
