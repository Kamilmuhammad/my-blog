import Image from "next/image";
import React from "react";

function PostAuthor({ authorAvatar, authorName, authorJob }) {
  return (
    <div className="flex">
      <Image
        className="rounded-full"
        src={authorAvatar}
        width={50}
        height={50}
        alt={"author"}
      />
      <div className="flex flex-col justify-between ml-5">
        <p>{authorName}</p>
        <p className="text-white/50">{authorJob}</p>
      </div>
    </div>
  );
}

export default PostAuthor;
