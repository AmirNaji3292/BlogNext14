import Postcart from "../compnents/Postcart/Postcart";
import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";

export const metadata = {
  title: "Posts Next App",
  description: "all posts | next app",
};

export default async function Blog() {
  try {
    await connectToDb();

    const posts = (await Post.find().lean()) || [];

    return (
      <div className="mt-8 px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          {posts.map((post) => (
            <Postcart
              key={post._id.toString()}
              post={{
                ...post,
                _id: post._id.toString(),
                createdAt: post.createdAt?.toString(),
                updatedAt: post.updatedAt?.toString(),
              }}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Database Error:", error);

    return (
      <div className="mt-8 px-4 text-center">
        <h2 className="text-xl font-semibold">
          Failed to load posts
        </h2>
        <p className="mt-2 text-gray-500">
          Please check database connection.
        </p>
      </div>
    );
  }
}