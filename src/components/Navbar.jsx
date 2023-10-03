import { IoMdClose, IoMdMenu } from "react-icons/io";

function Navbar({ openSidebar, onIconClick }) {
  return (
    <nav className="bg-blue-500 text-white flex items-center w-full fixed px-4 shadow-sm h-14">
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
      <div className="font-bold text-lg">Fantasy Score Gap</div>
    </nav>
  );
}

export default Navbar;
