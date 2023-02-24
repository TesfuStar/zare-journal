import { FaUserAlt } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
export const profileDashboard = [
  {
    title: "User Account",
    links: [
      {
        name: "Account",
        link: "account",
        icon: <FaUserAlt size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Your Comments",
        link: "my-comments",
        icon: <AiOutlineComment size={20} className=" text-[#bdcadf]" />,
      },
    ],
  },
];
