import { useState } from "react";
import {
  useLeague1Store,
  useLeague2Store,
} from "../store/scoringSettingsStore";

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
    setValuesLeague1({ ...valuesLeague1, [e.target.name]: e.target.value });
  }

  function handleChangeLeague2(e) {
    setValuesLeague2({ ...valuesLeague2, [e.target.name]: e.target.value });
  }

  const handleBlurLeague1 = (e) => {
    const inputValue = Number(valuesLeague1[e.target.name]) || 0;
    updateSettings1({ [e.target.name]: inputValue });
  };

  const handleBlurLeague2 = (e) => {
    const inputValue = Number(valuesLeague2[e.target.name]) || 0;
    updateSettings2({ [e.target.name]: inputValue });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <>
      <h2 className="text-lg font-bold text-center p-4">{title}</h2>
      <div className="flex gap-8 justify-end mx-8">
        <div className="w-1/2 text-center font-bold">
          <p>League 1</p>
        </div>
        <div className="w-1/2 text-center font-bold">
          <p>League 2</p>
        </div>
      </div>
      <div className="px-4 pt-4 pb-32">
        {fields.map((field) => {
          return (
            <fieldset className="mb-4" key={field.id}>
              <legend className="block text-sm mb-2">{field.label}</legend>
              <div className="flex gap-8 justify-end mx-4">
                <input
                  id={`l1_${field.id}`}
                  name={field.id}
                  type="number"
                  step={field.step || "0.5"}
                  value={valuesLeague1[field.id]}
                  onChange={handleChangeLeague1}
                  onBlur={handleBlurLeague1}
                  onKeyDown={handleKeyDown}
                  className="bg-slate-200 dark:bg-slate-800 outline-none rounded py-1 px-2 w-1/2"
                />
                <input
                  id={`l2_${field.id}`}
                  name={field.id}
                  type="number"
                  step={field.step || "0.5"}
                  value={valuesLeague2[field.id]}
                  onChange={handleChangeLeague2}
                  onBlur={handleBlurLeague2}
                  onKeyDown={handleKeyDown}
                  className="bg-slate-200 dark:bg-slate-800 outline-none rounded py-1 px-2 w-1/2"
                />
              </div>
            </fieldset>
          );
        })}
      </div>
    </>
  );
}

export default SettingsPage;
