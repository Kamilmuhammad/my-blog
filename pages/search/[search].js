import CardPost from "@/components/cardPost";
import Layout from "@/components/layout";
import { useStore } from "@/store/state";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const { data, loading, getNews } = useStore((state) => state);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    getNews(`?q=${router.query.search}`);
  }, [router, getNews]);

  return (
    <>
      <Head>
        <title>Epictetus</title>
      </Head>
      <Layout>
        <h1>Hasil pencarian {`"${router.query.search}"`}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-16 mt-16">
          {data.map((post) => (
            <CardPost key={post.id} {...post} />
          ))}
        </div>
      </Layout>
    </>
  );
}
