"use client";
import Link from "next/link";
import Cursor from "./Cursor";
import Magnetic from "./Magnetic";
import { useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    const [hover, setHover] = useState(false);
    return (
        <>
            <Cursor hover={hover} />
            <section className="w-full max-w-full flex-col flex-start">
                <h1 className="head_text font-satoshi text-left">
                    <span className="blue_gradient">{type} Post</span>
                </h1>
                <p className="desc text-left max-w-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                    accusantium, voluptatum non cum placeat similique corporis
                    laboriosam libero error natus, unde vero facilis illo
                    blanditiis quia iure magnam est soluta!
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl mt-10 flex flex-col gap-7 glasmorphism "
                >
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Prompt
                        </span>
                        <textarea
                            value={post.prompt}
                            onChange={(e) =>
                                setPost({ ...post, prompt: e.target.value })
                            }
                            placeholder="Write your promp here..."
                            required
                            className="form_textarea bg-zinc-200"
                        ></textarea>
                    </label>
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Tag
                        </span>
                        <input
                            value={post.tags}
                            onChange={(e) =>
                                setPost({ ...post, tags: e.target.value })
                            }
                            placeholder="#tags"
                            required
                            className="form_input bg-zinc-200"
                        ></input>
                    </label>
                    <div className="flex flex-end gap-4 mx-3 mb-5 ">
                        <Link href="/" className="text-gray-500 text-sm">
                            <span>Cancel</span>
                        </Link>
                        <Magnetic>
                            <button
                                className="rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white z-0 "
                                type="submit"
                                disabled={submitting}
                                onMouseOver={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                {type}
                            </button>
                        </Magnetic>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Form;
