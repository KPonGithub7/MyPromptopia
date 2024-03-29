"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Magnetic from "./Magnetic";
import Cursor from "./Cursor";

const PromptCard = ({
    post,
    handleTagClick,
    handleEdit,
    handleDelete,
    hovering,
}) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 5000);
    };

    const handleProfileClick = () => {
        if (post.creator?._id === session?.user.id)
            return router.push("/profile");
        router.push(
            `profile/${post.creator?._id}?name=${post.creator?.username}`
        );
    };

    return (
        <>
            <div className="prompt_card">
                <div className="flex items-center justify-between gap-5">
                    <div
                        className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                        onClick={handleProfileClick}
                    >
                        <Image
                            src={post.creator?.image}
                            alt="user_image"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />
                        <div className="flex flex-col">
                            <h3 className="font-satoshi font-semibold text-gray-900">
                                {post.creator?.username}
                            </h3>
                            <p className="font-inter text-sm text-gray-500">
                                {post.creator?.email}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Magnetic>
                            <Image
                                src={
                                    copied === post.prompt
                                        ? "/assets/icons/tick.svg"
                                        : "/assets/icons/copy.svg"
                                }
                                width={18}
                                height={18}
                                alt="copy"
                                className="cursor-pointer "
                                onClick={handleCopy}
                                onMouseOver={() => hovering(true)}
                                onMouseLeave={() => hovering(false)}
                            />
                        </Magnetic>
                    </div>
                </div>
                <div>
                    <p className="my-4 font-satoshi text-gray-700 text-sm">
                        {post.prompt}
                    </p>
                    <p
                        className="font-inter blue_gradient text-sm cursor-pointer"
                        onClick={() =>
                            handleTagClick && handleTagClick(post.tags)
                        }
                    >
                        {post.tags}
                    </p>
                </div>
                {session?.user.id === post.creator?._id &&
                    pathName === "/profile" && (
                        <div className="mt-5 flex-center gap-4 border-t border-gray-500 pt-3">
                            <p
                                className="blue_gradient cursor-pointer font-inter text-sm "
                                onClick={handleEdit}
                            >
                                Edit
                            </p>
                            <p
                                className="orange_gradient cursor-pointer font-inter text-sm "
                                onClick={handleDelete}
                            >
                                Delete
                            </p>
                        </div>
                    )}
            </div>
        </>
    );
};

export default PromptCard;
