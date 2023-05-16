import CardPost from "@/components/cardPost";
import FeaturedPost from "@/components/featuredPost";
import Layout from "@/components/layout";
import { useStore } from "@/store/state";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
    const { data, loading, getNews } = useStore((state) => state);
    useEffect(() => {
        getNews();
    }, [getNews]);
    return (
        <>
            <Head>
                <title>Epictetus</title>
            </Head>
            <main>
                <Layout>
                    <div className="sda">
                        <FeaturedPost data={data} loading={loading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-16 mt-16">
                        {data.map((post) => (
                            <CardPost key={post.id} {...post} />
                        ))}
                    </div>
                </Layout>
            </main>
        </>
    );
}
