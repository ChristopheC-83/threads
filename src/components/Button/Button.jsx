"use client";
import { useFormStatus } from "react-dom";

export default function Button({
  onClick,
  children,
  withoutMarginTop,
  formButton,
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`w-full p-3 transition duration-300 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-300 disabled:bg-opacity-50  ${
        !withoutMarginTop && "mt-4"
      }`}
      onClick={onClick}
      disabled={formButton && pending}
    >
      {children}
    </button>
  );
}
