import CardPost from "@/components/cardPost";

import HeaderSection from "@/components/headerSection";
import Layout from "@/components/layout";
import { useStore } from "@/store/state";
import Head from "next/head";
import React from "react";

function Post() {
    const { data, loading } = useStore((state) => state);

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <Layout>
                {loading ? (
                    <h1>loading</h1>
                ) : !data ? (
                    <div className="text-center lg:w-1/3 mx-auto h-[29vh]">
                        <h1 className="text-5xl my-6">No result 😥</h1>
                        <p>
                            We couldnt find any posts with the keyword
                            `yahahahayuk`. Please try another keyword.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-16 mt-16">
                        {data.map((post) => (
                            <CardPost key={post.id} {...post} id={post.id} />
                        ))}
                    </div>
                )}
                <HeaderSection>UI Design</HeaderSection>
            </Layout>
        </>
    );
}

export default Post;
