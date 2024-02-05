"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [post, setPost] = useState({
        prompt: "",
        tags: "",
    });

    const [submitting, setSubmitting] = useState("");

    const creatPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tags: post.tags,
                }),
            });
<<<<<<< HEAD

=======
            // console.log(response);
>>>>>>> abb1da75d2c8570494129e186516f3cf61c8cae2
            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Form
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={creatPrompt}
            />
        </>
    );
};

export default CreatePrompt;
