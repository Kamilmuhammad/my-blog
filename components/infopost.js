import React from "react";
import PostAuthor from "./postAuthor";
import PostMetaTitle from "./postMetaTitle";

function Infopost({
    category,
    date,
    title,
    shortDescription,
    authorAvatar,
    authorName,
    authorJob,
}) {
    return (
        <div className="flex flex-col gap-4">
            <PostMetaTitle category={category} date={date} title={title} />
            <div className="text-white/50 text-base">{shortDescription}</div>
            <PostAuthor
                authorAvatar={authorAvatar}
                authorName={authorName}
                authorJob={authorJob}
            />
        </div>
    );
}

export default Infopost;
