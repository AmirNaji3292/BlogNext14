"use client";

import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.container}
    >
      <h1>Add New User</h1>

      <input
        type="text"
        name="username"
        placeholder="username"
      />

      <input
        type="text"
        name="email"
        placeholder="email"
      />

      <input
        type="password"
        name="password"
        placeholder="password"
      />

      <input
        type="text"
        name="img"
        placeholder="img"
      />

      <select name="isAdmin">
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      <button>Add</button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default AdminUserForm;