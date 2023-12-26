"use client";

import { SessionProvider } from "next-auth/react";

/* This component is a higher order component which means
it is a component that wraps other components. In this case,
this component wraps the entire application. This is where
we will provide the session object to the entire application.
And that is why we return the SessionProvider component from
next-auth/react and pass it the session object.
*/

const Provider = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
