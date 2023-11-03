function ToggleSwitch({ toggleSwitch, isChecked }) {
  return (
    <div
      onClick={toggleSwitch}
      className={`flex w-12 h-6 rounded-full items-center justify-center transition-all duration-200 cursor-pointer border ${
        isChecked ? "border-blue-500 dark:border-indigo-500" : "border-gray-300"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full transition-all duration-200 ${
          isChecked
            ? "bg-blue-500 dark:bg-indigo-500 translate-x-3"
            : "bg-gray-300 -translate-x-3"
        }`}
      />
    </div>
  );
}

export default ToggleSwitch;
