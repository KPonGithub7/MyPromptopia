import mongoose from "mongoose";

let isConnected = false;
const uri =
    "mongodb+srv://kpofficial789:ThePromptopiaPass1@promptopiacluster.ikezfzz.mongodb.net/?retryWrites=true&w=majority";

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("already connected and using existing database connection");
        return;
    }

    try {
        await mongoose.connect(uri, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("connected and using new database connection");
    } catch (error) {
        console.log(error.message);
    }
};
