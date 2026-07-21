import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/action";
import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";


const getPosts = async () => {

  await connectToDb();

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .lean();

  return posts;

};



const AdminPosts = async () => {

  const posts = await getPosts();


  return (
    <div className={`${styles.container} border-b-2 border-red-500`}>

      <h1>Posts</h1>


      {posts.map((post) => (

        <div className={styles.post} key={post._id.toString()}>

          <div className="flex justify-center items-center ml-4 gap-4">

            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">

              <Image
                src={post.img || "/noavatar.png"}
                alt={post.title}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />

            </div>


            <span className={styles.postTitle}>
              {post.title}
            </span>

          </div>


          <form action={deletePost}>

            <input
              type="hidden"
              name="id"
              value={post._id.toString()}
            />

            <button className={styles.postButton}>
              Delete
            </button>

          </form>


        </div>

      ))}


    </div>
  );
};


export default AdminPosts;