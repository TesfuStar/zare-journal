import React from "react";
import Logo from "../assets/Logo.svg";
const Footer = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto border-y border-gray-300 p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col items-start space-y-2">
            <img src={Logo} alt="" />
            <p className="text-dark-color text-sm">
              Zare Journal is a Pan-African Digital Media based in Addis Ababa,
              Ethiopia, that aggregates news primarily on the African Continent.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
