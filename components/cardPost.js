import Image from "next/image";

import Infopost from "./infopost";

function CardPost({ thumbnail, id, ...post }) {
  return (
    <span>
      <Image
        className="w-full mb-4"
        src={thumbnail}
        alt={thumbnail}
        width={200}
        height={200}
      />
      <Infopost {...post} />
      <hr className="mt-4 border-white/40 lg:hidden" />
    </span>
  );
}

export default CardPost;
