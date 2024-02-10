"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const NewProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const username = searchParams.get("name");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const response = await fetch(`/api/users/${params?.id}/posts`);
                const data = await response.json();

                setPosts(data);
            };
            if (params?.id) fetchPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

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
