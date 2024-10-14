"Use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work ",
  },
  {
    name: "contact",
    path: "/contact ",
  },
];

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link legacyBehavior href={link.path} key={index}>
          <a
            className={`text-white hover:text-accent ${
              link.path === pathname
                ? "text-accent border-b-2 border-accent"
                : ""
            } capitalize font-medium hover: text-accent transition-all`}
          >
            {link.name}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
