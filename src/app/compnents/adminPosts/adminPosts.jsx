

import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/action";

const getPosts = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
   <div className={`${styles.container} border-b-2 border-red-500`}>
      <h1>Posts</h1>

      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <div  className="flex justify-center items-center ml-4 gap-4">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <Image
              src={post.img || "/noAvatar.png"}
              alt={post.title}
              width={50}
              height={50}
                className="w-full h-full object-cover"
            />
            </div>
            <span className={styles.postTitle}>{post.title}</span>
          </div>

          <form action={deletePost}>
            <input type="hidden" name="id" value={post._id} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;