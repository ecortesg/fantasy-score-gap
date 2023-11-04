import { IoMdClose, IoMdMenu } from "react-icons/io";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { usePersistentSettingsStore } from "../store/dashboardSettingsStore";
import { useEffect, useLayoutEffect } from "react";

function Navbar({ openSidebar, onIconClick }) {
  const [theme, changeTheme] = usePersistentSettingsStore((state) => [
    state.theme,
    state.changeTheme,
  ]);

  useEffect(() => {
    const htmlClassList = document.querySelector("html").classList;
    if (theme === "dark") {
      htmlClassList.add("dark");
    } else {
      htmlClassList.remove("dark");
    }
  }, [theme]);

  useLayoutEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (theme === "dark") {
      metaThemeColor.setAttribute("content", "#6366f1"); // indigo-500
    } else {
      metaThemeColor.setAttribute("content", "#3b82f6"); // blue-500
    }
  }, [theme]);

  return (
    <nav className="bg-blue-500 dark:bg-indigo-500 text-white flex items-center justify-between w-full fixed px-4 shadow-sm h-14">
      <div className="flex">
        {!openSidebar && (
          <IoMdMenu
            className="cursor-pointer mr-4 2xl:hidden"
            size={28}
            onClick={onIconClick}
          />
        )}
        {openSidebar && (
          <IoMdClose
            className="cursor-pointer mr-4 2xl:hidden"
            size={28}
            onClick={onIconClick}
          />
        )}
        <h1 className="font-bold text-lg">Fantasy Score Gap</h1>
      </div>
      {theme === "dark" ? (
        <MdOutlineDarkMode
          className="cursor-pointer hover:bg-indigo-400 rounded-full p-2"
          size={42}
          onClick={() => changeTheme()}
        />
      ) : (
        <MdOutlineLightMode
          className="cursor-pointer hover:bg-blue-400 rounded-full p-2"
          size={42}
          onClick={() => changeTheme()}
        />
      )}
    </nav>
  );
}

export default Navbar;
