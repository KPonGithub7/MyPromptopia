import { useState } from "react";
import Cursor from "./Cursor";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    const [hover, setHover] = useState(false);
    return (
        <>
            <Cursor hover={hover} />
            <section className="w-full">
                <h1 className="head_text text-left">
                    <span className="blue_gradient"> {name} Profile</span>
                </h1>
                <p className="desc text-left">{desc}</p>

                <div className="prompt_layout mt-10 ">
                    {data?.map((post) => (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() =>
                                handleDelete && handleDelete(post)
                            }
                            hovering={setHover}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Profile;
