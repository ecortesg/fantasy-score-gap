import { useState } from "react";
import { useLeague1Store, useLeague2Store } from "../store/leagueSettingsStore";

function SettingsPage({ title, fields }) {
  const [settings1, updateSettings1] = useLeague1Store((state) => [
    state.settings,
    state.updateSettings,
  ]);

  const [settings2, updateSettings2] = useLeague2Store((state) => [
    state.settings,
    state.updateSettings,
  ]);

  const [valuesLeague1, setValuesLeague1] = useState(settings1);
  const [valuesLeague2, setValuesLeague2] = useState(settings2);

  function handleChangeLeague1(e) {
    setValuesLeague1({ ...valuesLeague1, [e.target.id]: e.target.value });
  }

  function handleChangeLeague2(e) {
    setValuesLeague2({ ...valuesLeague2, [e.target.id]: e.target.value });
  }

  const handleBlurLeague1 = (e) => {
    const inputValue = Number(valuesLeague1[e.target.id]) || 0;
    updateSettings1({ [e.target.id]: inputValue });
  };

  const handleBlurLeague2 = (e) => {
    const inputValue = Number(valuesLeague2[e.target.id]) || 0;
    updateSettings2({ [e.target.id]: inputValue });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <>
      <h2 className="text-lg font-bold text-center mb-5">{title}</h2>
      <div className="flex gap-6 justify-end pb-5 mx-8">
        <div className="w-1/2 text-center font-bold">
          <p>League 1</p>
        </div>
        <div className="w-1/2 text-center font-bold">
          <p>League 2</p>
        </div>
      </div>
      {fields.map((field) => {
        return (
          <div className="mx-4 py-2" key={field.id}>
            <label className="block text-sm mb-1">{field.label}</label>
            <div className="flex gap-6 justify-end mx-4">
              <input
                id={field.id}
                type="number"
                step={field.step || "0.1"}
                value={valuesLeague1[field.id]}
                onChange={handleChangeLeague1}
                onBlur={handleBlurLeague1}
                onKeyDown={handleKeyDown}
                className="border rounded py-2 px-3 w-1/2"
              />
              <input
                id={field.id}
                type="number"
                step={field.step || "0.1"}
                value={valuesLeague2[field.id]}
                onChange={handleChangeLeague2}
                onBlur={handleBlurLeague2}
                onKeyDown={handleKeyDown}
                className="border rounded py-2 px-3 w-1/2"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SettingsPage;
