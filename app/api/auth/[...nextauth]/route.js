import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

// let url = "/";
// let baseUrl = "http://localhost:3000";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const SessionUser = await User.findOne({
                email: session.user.email,
            });
            //To know which user is logged in
            session.user.id = SessionUser._id;

            return session;
        },
        async signIn({ profile }) {
            try {
                //serverless -> lambda -> dynamdb
                await connectToDB();
                // check if a user already exists
                const userExists = await User.findOne({ email: profile.email });

                // if not create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        // async redirect(url, baseUrl) {
        //     return url.toString().startsWith(baseUrl) ? url : baseUrl;
        // },
    },
});

export { handler as GET, handler as POST };
/* This is not what we usually do 
    usually we export as either a GET or POST not both
    but for next application this is how we do it
*/

/* REMEMBER
    each nextjs route is a serverless route -> a lambda function -> opens up only when it is called
    therefore every time it is called we have to spinup the server and make a connection to the database 
*/
