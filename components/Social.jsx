import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn, FaGamepad,
  FaChess,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/zroussama" },
  { icon: <FaLinkedinIn />, path: "https://linkedin.com/in/zroussama" },
  // { icon: <FaTwitter />, path: "https://twitter.com/zroussama" },
  { icon: <FaChess />, path: "https://chess.com/mrcheckmateTN" },
  { icon: <FaWhatsapp />, path: "https://wa.me/21644377533" },
  
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
