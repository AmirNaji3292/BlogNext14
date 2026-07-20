import Image from "next/image";
import { connectToDb } from "@/lib/utils";
import { Post, User } from "@/lib/models";

// SEO
export const generateMetadata = async ({ params }) => {
  await connectToDb();

  const post = await Post.findOne({ slug: params.slug });

  return {
    title: post?.title,
    description: post?.description,
  };
};

export default async function SinglePostPage({ params }) {
  await connectToDb();

  const post = await Post.findOne({ slug: params.slug }).lean();

  if (!post) {
    return <div className="text-white text-center mt-20">Post not found</div>;
  }

  const user = await User.findById(post.userId).lean();

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Post Image */}
        <div className="flex justify-center items-start">
          {post.img && (
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={post.img}
                alt={post.title}
                width={500}
                height={700}
                className="object-cover"
              />
            </div>
          )}
        </div>


        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg">

          {/* Title */}
          <h1 className="text-3xl font-bold mb-8">
            {post.title}
          </h1>


          {/* Author */}
          <div className="flex items-center gap-4 mb-6">

            <Image
              src={user?.img || "/noAvatar.png"}
              alt={user?.username || "Author"}
              width={60}
              height={60}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />

            <div>
              <p className="text-gray-400 text-sm">
                Author
              </p>
              <p className="font-semibold text-lg">
                {user?.username}
              </p>
            </div>

          </div>


          {/* Date */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm">
              Published
            </p>

            <p className="font-medium">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>


          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Description
            </h2>

            <p className="leading-8 text-gray-200">
              {post.description}
            </p>
          </div>


        </div>

      </div>
    </div>
  );
}