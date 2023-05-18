import Layout from "@/components/layout";
import PostAuthor from "@/components/postAuthor";
import PostMetaTitle from "@/components/postMetaTitle";
import { useStore } from "@/store/state";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Detail = () => {
  const { data, loading, getNews } = useStore((state) => state);
  const router = useRouter();
  const { detail } = router.query;
  const { data: session, status } = useSession();
  const newPost = data.filter((post) => post.title === detail);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const post = newPost[0];
  let id;
  if (post) {
    id = post.id;
  }
  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(() => {
    axios
      .get(`https://db-json-blog.vercel.app/comments?postId=${id}`)
      .then((res) => {
        setComments(res.data);
        setCommentLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setCommentLoading(false);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText) {
      alert("masukkan isi komentar");
    } else {
      axios
        .post(`https://db-json-blog.vercel.app/comments/`, {
          postId: post.id,
          comment: commentText,
          user: session.user,
          date: new Date().toLocaleString(),
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      setCommentText("");
    }
  };

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <Layout>
        {loading ? (
          <h1 className="text-4xl text-center h-[40vh]">Loading...</h1>
        ) : post ? (
          <>
            <div className="lg:w-1/2 mx-auto flex flex-col items-center gap-4 mb-8">
              <PostMetaTitle
                category={post.category}
                title={post.title}
                date={post.date}
              />
              <PostAuthor
                authorAvatar={post.authorAvatar}
                authorName={post.authorName}
                authorJob={post.authorJob}
              />
            </div>
            <div className="space-y-4">
              <Image
                src={post.thumbnail}
                height={200}
                width={200}
                alt={post.thumbnail}
                className="w-10/12 mx-auto"
              />
              <div className="w-8/12 mx-auto">
                <p className="text-xl mb-6">{post.headDescription}</p>
                <p className="text-white/80">{post.description}</p>
              </div>
            </div>
            <div className="border-t mt-4 py-2">
              <div className="bg-slate-700 rounded-3xl py-4 px-10">
                <h1 className="border-b border-white inline ">Komentar</h1>
                <form
                  onSubmit={(e) => {
                    if (!session) {
                      e.preventDefault();
                      router.push("/login");
                    } else {
                      handleSubmit(e);
                    }
                  }}
                  onClick={() => {
                    if (!session) {
                      router.push("/login");
                    }
                  }}
                  className="mt-2 flex items-end gap-1 flex-wrap"
                >
                  <textarea
                    rows="2"
                    cols="90"
                    className="text-black p-2 rounded"
                    placeholder="Tulis komentar..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <span> </span>
                  <button
                    onClick={(e) => {
                      if (!session) {
                        router.push("/login");
                      } else {
                        handleSubmit(e);
                      }
                    }}
                    className="px-4 py-1 bg-gray-500 "
                  >
                    Kirim!
                  </button>
                </form>
              </div>
              <div className="border-t border-white/50 mt-4">
                {commentLoading ? (
                  <h1>loading...</h1>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex justify-between py-4 border-b"
                    >
                      <div className="flex gap-5">
                        <Image
                          className="rounded-full "
                          src={comment.user.image}
                          alt={"author"}
                          width={50}
                          height={40}
                        />
                        <div>
                          <h1>{comment.user.name}</h1>
                          <p className="text-sm text-white/70">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                      {session && session.user.email === comment.user.email && (
                        <button
                          onClick={() => {
                            axios.delete(
                              `http://localhost:8080/comments/${comment.id}`
                            );
                          }}
                        >
                          hapus&nbsp;!
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-4xl text-center h-[40vh]">Data Kosong</h1>
        )}
      </Layout>
    </>
  );
};
export default Detail;
