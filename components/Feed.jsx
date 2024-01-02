"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
// import { set } from "mongoose";

const ProductCardList = ({ data, handleTagClick }) => {
    return (
        <div className="prompt_layout mt-16 ">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {};

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        };
        fetchPosts();
    }, []);
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    required
                    placeholder="Search for a tag or a prompt"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="peer search_input"
                />
            </form>
            <ProductCardList data={posts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
