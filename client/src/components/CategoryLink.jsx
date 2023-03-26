import { IoIosArrowForward } from "react-icons/io";

function CategoryLink({ label, onClickFunction }) {
  return (
    <div
      className="px-4 py-4 border-b hover:bg-slate-100 flex justify-between"
      onClick={onClickFunction}
    >
      <p>{label}</p>
      <IoIosArrowForward size={24}/>
    </div>
  );
}

export default CategoryLink;
