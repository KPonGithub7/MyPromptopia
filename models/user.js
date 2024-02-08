import { Mongoose, Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        ],
    },
    image: {
        type: String,
    },
});

/* const user = model("User",UserSchema);
export default user; 

This would be the way to do it if we were not using nextjs
this keeps the server running (always on always running)


models stores all the models that we have created
if we have not created a model then it will be empty
therefore we can check if the model exists or not
if it exists then we use that model
if it does not exist then we create a new model

*/

const User = Mongoose.models?.User || Mongoose.model("User", UserSchema);
export default User;
// const User = model("User", UserSchema);
// export default User;
