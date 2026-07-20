import Postcart from "../compnents/Postcart/Postcart";
import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";

export const metadata = {
  title: "Posts Next App",
  description: "all posts | next app",
};

export default async function Blog() {
  await connectToDb();

  const posts = await Post.find().lean();

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
}