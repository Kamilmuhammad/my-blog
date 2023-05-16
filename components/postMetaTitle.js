import React from "react";
import { useRouter } from "next/router";
function PostMetaTitle({ category, date, title }) {
    const router = useRouter();
    function handleClick(title) {
        router.push(`/post/${title}`);
    }
    return (
        <>
            <div className="text-sm font-extralight text-white/50">
                <span className="uppercase">{category}</span>{" "}
                <span>&bull;</span> <span> {date}</span>
            </div>
            <div
                className="text-2xl cursor-pointer hover:underline"
                onClick={() => handleClick(title)}
            >
                {title}
            </div>
        </>
    );
}

export default PostMetaTitle;
