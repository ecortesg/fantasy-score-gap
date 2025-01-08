import { SLEEPER, ESPN, YAHOO } from "../data/presets_data"
import { useLeague1Store, useLeague2Store } from "../store/scoringSettingsStore"

function PresetsTab() {
  const updateSettings1 = useLeague1Store((state) => state.updateSettings)
  const updateSettings2 = useLeague2Store((state) => state.updateSettings)

  return (
    <>
      <h2 className="text-lg font-bold text-center p-4">Presets</h2>
      <div className="flex gap-4 justify-end pb-4 mx-8">
        <div className="w-1/2 text-center font-bold">
          <p>League 1</p>
        </div>
        <div className="w-1/2 text-center font-bold">
          <p>League 2</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <PresetButton
          label="Sleeper"
          values={SLEEPER}
          updateValues={updateSettings1}
        />
        <PresetButton
          label="Sleeper"
          values={SLEEPER}
          updateValues={updateSettings2}
        />
        <PresetButton
          label="ESPN"
          values={ESPN}
          updateValues={updateSettings1}
        />
        <PresetButton
          label="ESPN"
          values={ESPN}
          updateValues={updateSettings2}
        />
        <PresetButton
          label="Yahoo"
          values={YAHOO}
          updateValues={updateSettings1}
        />
        <PresetButton
          label="Yahoo"
          values={YAHOO}
          updateValues={updateSettings2}
        />
      </div>
    </>
  )
}

export default PresetsTab

function PresetButton({ label, values, updateValues }) {
  return (
    <button
      className="dark:bg-slate-200 bg-slate-800 dark:hover:bg-slate-300 hover:bg-slate-900 py-1 rounded shadow mx-4 text-white dark:text-black"
      onClick={() => updateValues(values)}
    >
      {label}
    </button>
  )
}
