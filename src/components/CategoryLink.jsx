import { IoIosArrowForward } from "react-icons/io";

function CategoryLink({ label, onClickFunction }) {
  return (
    <div
      className="h-14 p-4 border-b hover:bg-slate-100 dark:hover:bg-slate-600 flex justify-between"
      onClick={onClickFunction}
    >
      <p>{label}</p>
      <IoIosArrowForward size={28} className="rounded-full" />
    </div>
  );
}

export default CategoryLink;
