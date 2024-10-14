import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn, FaGamepad,
  FaChess,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "" },
  { icon: <FaLinkedinIn />, path: "" },
  { icon: <FaTwitter />, path: "" },
  { icon: <FaChess />, path: "" },
  { icon: <FaWhatsapp />, path: "" },
  { icon: <FaGamepad />, path: "" },
];


const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
