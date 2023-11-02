import { Link } from "react-router-dom";

export default function Nav() {
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Chat",
      path: "/chat",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "ExImgUpload",
      path: "/imgupload",
    },
  ];
  return (
    <nav className="flex flex-row justify-around gap-4 w-full text-2xl font-semibold">
      {navLinks.map(({ name, path }, index) => (
        <Link to={path} key={index}>
          {name}
        </Link>
      ))}
    </nav>
  );
}
//COmment
