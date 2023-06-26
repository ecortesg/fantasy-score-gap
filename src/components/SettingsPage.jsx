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
                value={settings1[field.id]}
                onChange={(e) =>
                  updateSettings1({ [e.target.id]: Number(e.target.value) })
                }
                className="border rounded shadow py-2 px-3 w-1/2"
              />
              <input
                id={field.id}
                type="number"
                value={settings2[field.id]}
                onChange={(e) =>
                  updateSettings2({ [e.target.id]: Number(e.target.value) })
                }
                className="border rounded shadow py-2 px-3 w-1/2"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SettingsPage;
