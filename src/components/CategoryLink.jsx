import { IoIosArrowForward } from "react-icons/io";

function CategoryLink({ label, onClickFunction }) {
  return (
    <div
      className="h-14 p-4 border-b hover:bg-slate-100 flex justify-between"
      onClick={onClickFunction}
    >
      <p>{label}</p>
      <IoIosArrowForward size={24} />
    </div>
  );
}

export default CategoryLink;
