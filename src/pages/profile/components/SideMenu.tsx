import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";
import { profileDashboard } from "../../../utils/Data";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import { Footer } from "../../../components";
const SideMenu = () => {
  const activeLink = `flex items-center font-medium  gap-3  py-2 px-2
    rounded-md  text-main-color    m-2 `;
  const normalLink = `flex items-center  duration-700 gap-3 
   py-2 rounded-lg text-dark-gray dark:text-gray-200  pl-2 font-medium text-sm
   hover:text-main-color dark:hover:text-main-color
    hover:bg-gray-300/50 dark:hover:bg-gray-300/10  m-2   m-2 `;

  return (
    <div className="dark:bg-dark-bg">
      <Header />
      <div className="max-w-7xl mx-auto p-3 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="hidden h-fit md:flex md:col-span-3 bg-white dark:bg-dark-gray  dark:bg-secondary-dark-bg  flex-col p-3 rounded-md">
          {profileDashboard.map((item) => (
            <div key={item.title}>
              <h1
                className={`font-semibold duration-300 text-dark-gray  dark:text-gray-300 text-sm`}
              >
                {item.title}
              </h1>
              {item.links.map((link) => (
                <NavLink
                  key={link.name}
                  to={`/profile/${link.link}`}
                  // onClick={handleCloseSideBar}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {link.icon}
                  <span className={`capitalize font-medium `}>{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        {/* small sidebar */}
        <div className="flex md:hidden items-end justify-end z-50">
          <Menu as="div" className="relative inline-block text-left z-50">
            <div>
              <Menu.Button
                className="inline-flex w-full justify-center rounded-md bg-main-bg
            px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Menu
                <BiChevronDown
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-50 right-0 mt-2 p-2 w-56 origin-top-right  rounded-md bg-white dark:bg-secondary-dark-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {profileDashboard.map((item) => (
                  <div key={item.title}>
                    <h1
                      className={`font-medium duration-300 text-dark-gray  dark:text-gray-300 text-sm pb-3`}
                    >
                      {item.title}
                    </h1>
                    {item.links.map((link) => (
                      <Menu.Item>
                        <NavLink
                          key={link.name}
                          to={`/profile/${link.link}`}
                          // onClick={handleCloseSideBar}
                          className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                          }
                        >
                          {link.icon}
                          <span className={`capitalize font-medium `}>
                            {link.name}
                          </span>
                        </NavLink>
                      </Menu.Item>
                    ))}
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="dark:bg-dark-bg md:col-span-9 w-full min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SideMenu;
