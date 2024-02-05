"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Cursor from "./Cursor";
// import { set } from "mongoose";

const ProductCardList = ({ data, handleTagClick }) => {
    const [hover, setHover] = useState(false);
    return (
        <>
            <Cursor hover={hover} />
            <div className="prompt_layout mt-16 ">
                {data.map((post) => (
                    <PromptCard
                        hovering={setHover}
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))}
            </div>
        </>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    useEffect(() => {
        setFilteredPosts(
            posts.filter(
                (post) =>
                    post.creator.username.toLowerCase().includes(searchText) ||
                    post.prompt.toLowerCase().includes(searchText) ||
                    post.tags.includes(searchText)
            )
        );
    }, [searchText]);

    useEffect(() => {
        const fetchPosts = async () => {
<<<<<<< HEAD
            const response = await fetch("/api/prompt", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
=======
            const response = await fetch("/api/prompt");
>>>>>>> abb1da75d2c8570494129e186516f3cf61c8cae2
            const data = await response.json();

            setPosts(data);
            setFilteredPosts(data);
        };
        fetchPosts();
    }, []);

    const handleTagClick = (tag) => {
        setSearchText(tag);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
<<<<<<< HEAD
                    name="search"
=======
>>>>>>> abb1da75d2c8570494129e186516f3cf61c8cae2
                    type="text"
                    required
                    placeholder="Search for a tag or a prompt"
                    value={searchText}
                    onChange={handleSearchChange}
                    className=" search_input "
                />
            </form>
            <ProductCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
