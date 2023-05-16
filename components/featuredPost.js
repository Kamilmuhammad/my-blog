import Image from "next/image";
import Infopost from "./infopost";
function FeaturedPost({ data, loading }) {
    const dat = data[3];

    return (
        <>
            {loading ? (
                <h1 className="text-center text-4xl mt-20">Loading...</h1>
            ) : dat ? (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center">
                        <div className="lg:col-span-2 lg:pr-4">
                            <Image
                                src={dat.thumbnail}
                                width={200}
                                height={200}
                                alt={"thumbnail"}
                                className="w-full rounded"
                            />
                        </div>
                        <div className="pt-16 px-4">
                            <Infopost
                                category={dat.category}
                                date={dat.date}
                                title={dat.title}
                                shortDescription={dat.shortDescription}
                                authorAvatar={dat.authorAvatar}
                                authorName={dat.authorName}
                                authorJob={dat.authorJob}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="text-xl">empty data..</h1>
            )}
        </>
    );
}
export default FeaturedPost;
