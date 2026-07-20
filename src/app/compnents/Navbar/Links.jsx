"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./links.module.css";
import { useState } from "react";
import { handleLogOtGithub } from "@/lib/action";

function Links({ session }) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const links = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
    ...(session?.user?.isAdmin
      ? [{ title: "Admin", path: "/admin" }]
      : []),
  ];

  return (
    <div className="relative">

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4">
        {links.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${style.container} ${
              pathName === item.path ? style.activ : ""
            }`}
          >
            {item.title}
          </Link>
        ))}

        {session?.user ? (
          <form action={handleLogOtGithub}>
            <button className="ml-4 italic text-green-500">
              Log out
            </button>
          </form>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </div>


      {/* Mobile Button */}
      <button
        className="sm:hidden"
        onClick={() => setOpen(!open)}
      >
        <Image
          src="/menu.png"
          width={30}
          height={30}
          alt="Menu"
        />
      </button>


      {/* Mobile Menu */}
      {open && (
        <div className="absolute right-0 top-10 z-50 flex flex-col gap-3 bg-white rounded-lg shadow-lg p-5">

          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`${style.container} ${
                pathName === item.path ? style.activ : ""
              }`}
            >
              {item.title}
            </Link>
          ))}


          {session?.user ? (
            <form action={handleLogOtGithub}>
              <button>
                Log out
              </button>
            </form>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}

        </div>
      )}

    </div>
  );
}

export default Links;