import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "../compnents/adminPosts/adminPosts";
import AdminPostForm from "../compnents/adminPostForm/adminPostForm";
import AdminUsers from "../compnents/adminUsers/adminUsers";
import AdminUserForm from "../compnents/adminUserForm/adminUserForm";
import { auth } from "@/lib/auth";

const AdminPage = async () => {

const session = await auth();

if (!session) {
  return <h1>Please login first.</h1>;
}
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId = {session.user.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
