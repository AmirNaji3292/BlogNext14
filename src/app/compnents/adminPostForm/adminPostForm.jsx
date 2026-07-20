"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import SubmitButton from "./SubmitButton";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
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
      <h1 className="ml-4 mt-4">Add New Post</h1>

      <input type="hidden" name="userId" value={userId} />

      <input type="text" name="title" placeholder="Title" />

      <input type="text" name="slug" placeholder="slug" />

      <input type="text" name="img" placeholder="img" />

      <textarea
        name="description"
        placeholder="description"
        rows={10}
      />

      <SubmitButton />

      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default AdminPostForm;




// "use client"

// import { addPost } from "@/lib/action";
// import styles from "./adminPostForm.module.css";
// import { useFormState } from "react-dom";

// const AdminPostForm = ({userId}) => {
//   const [state, formAction] = useFormState(addPost, undefined);
  
//   return (
//     <form action={formAction} className={styles.container}>
//       <h1>Add New Post</h1>
//       <input type="hidden" name="userId" value={userId} />
//       <input type="text" name="title" placeholder="Title" />
//       <input type="text" name="slug" placeholder="slug" />
//       <input type="text" name="img" placeholder="img" />
//       <textarea type="text" name="description" placeholder="description" rows={10} />
//       <button>Add</button>
//       {state?.error}
//     </form>
//   );
// };

// export default AdminPostForm;
