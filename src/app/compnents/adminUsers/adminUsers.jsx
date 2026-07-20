import styles from "./adminUsers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

const AdminUsers = async () => {
  await connectToDb();

  const users = await User.find();

  return (
    <div className={styles.container}>
      <h1>Users</h1>

      {users.map((user) => (
        <div className={styles.user} key={user._id.toString()}>
          <div className={styles.detail}>
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <Image
                src={user.img || "/noAvatar.png"}
                alt={user.username}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>

            <span>{user.username}</span>
          </div>

          <form action={deleteUser}>
            <input
              type="hidden"
              name="id"
              value={user._id.toString()}
            />
            <button className={styles.userButton}>
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;