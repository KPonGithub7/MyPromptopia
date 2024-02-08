import mongoose, { Schema } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        //reference makes a one to many relationship
        //one user can have many prompts
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
    },
    tags: {
        type: String,
        required: [true, "Tag is required"],
    },
});

const Prompt =
    mongoose.models?.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
// const Prompt = model("Prompt", PromptSchema);
// export default Prompt;
