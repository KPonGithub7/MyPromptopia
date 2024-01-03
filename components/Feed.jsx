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
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearchChange = (e) => {
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
            const response = await fetch("/api/prompt");
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
                    type="text"
                    required
                    placeholder="Search for a tag or a prompt"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="peer search_input"
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
