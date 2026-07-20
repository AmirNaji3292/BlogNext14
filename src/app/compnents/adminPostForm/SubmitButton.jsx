"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
};

export default SubmitButton;