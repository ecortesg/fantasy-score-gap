import { BiLoaderAlt } from "react-icons/bi";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-2 h-full">
      <BiLoaderAlt className="animate-spin w-16 h-16" />
    </div>
  );
}
