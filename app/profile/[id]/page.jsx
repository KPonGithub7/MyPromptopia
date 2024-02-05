"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const NewProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const username = searchParams.get("name");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
<<<<<<< HEAD
=======
            console.log(`/api/users/${params?.id}/posts`);
>>>>>>> abb1da75d2c8570494129e186516f3cf61c8cae2
            const data = await response.json();

            setPosts(data);
        };
        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <>
            <Profile
                name={`${username}'s`}
                desc={`Welcome to ${username}'s profile page!`}
                data={posts}
            />
        </>
    );
};

export default NewProfile;
