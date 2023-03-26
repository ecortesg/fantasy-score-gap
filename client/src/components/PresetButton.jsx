function PresetButton({ label, values, updateValues }) {
  return (
    <button
      className="bg-slate-300 hover:bg-slate-200 py-1 rounded shadow mx-4"
      onClick={() => updateValues(values)}
    >
      {label}
    </button>
  );
}

export default PresetButton;
