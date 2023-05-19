import Layout from "@/components/layout";
import React, { useState } from "react";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

function CreatePost() {
  const { data: session } = useSession();
  const bulanstring = [
    "bulan",
    "JAN",
    "Feb",
    "March",
    "APRIL",
    "MAY",
    "JUNY",
    "JULY",
  ];
  const date = new Date();
  const tanggal = date.getDate();
  const bulan = date.getMonth();
  const year = date.getFullYear();
  const [post, setPost] = useState({
    thumbnail: "/thumbnail-2.png",
    category: "",
    date: bulanstring[bulan] + " " + tanggal + "," + year,
    title: "",
    shortDescription: "",
    authorAvatar: session.user.image,
    authorName: session.user.name,
    authorJob: "Product Designer",
    description: "",
  });
  const [empty, setEmpty] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !post.title ||
      !post.category ||
      !post.shortDescription ||
      !post.description
    ) {
      return setEmpty(true);
    }
    setEmpty(false);
    axios
      .post("https://db-json-blog.vercel.app/posts", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };
  return (
    <Layout>
      <div>
        <h1 className="text-2xl">Buat Blog Baru</h1>
        <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
          <div className="pt-4">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              className="text-black px-2 py-1 ml-2"
              placeholder="Category"
              onChange={(e) => setPost({ ...post, category: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="title">Tittle</label>
            <input
              type="text"
              id="title"
              className="text-black px-2 py-1 ml-2"
              placeholder="tittle"
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="Short Description">Short Description</label>
            <input
              type="text"
              id="Short Description"
              className="text-black px-2 py-1 ml-2"
              placeholder="Short Description"
              onChange={(e) =>
                setPost({
                  ...post,
                  shortDescription: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="Description">Description</label>
            <input
              id="Description"
              className="text-black px-2 py-1 ml-2"
              placeholder="Description"
              onChange={(e) =>
                setPost({
                  ...post,
                  description: e.target.value,
                })
              }
            />
          </div>
          <button className="border-white border-4 px-4 py-1  rounded-xl hover:bg-gray-400 duration-200">
            oke
          </button>
        </form>
      </div>
      <div className="text-center">
        {empty && (
          <span className="bg-red-200 text-black px-4 py-2">
            Silahkan Masukan dengan benar !!
          </span>
        )}
      </div>
    </Layout>
  );
}

export default CreatePost;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
};
