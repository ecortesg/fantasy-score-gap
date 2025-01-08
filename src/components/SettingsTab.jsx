import { useState } from "react"
import { useLeague1Store, useLeague2Store } from "../store/scoringSettingsStore"

function SettingsTab({ title, fields }) {
  const [settings1, updateSettings1] = useLeague1Store((state) => [
    state.settings,
    state.updateSettings,
  ])

  const [settings2, updateSettings2] = useLeague2Store((state) => [
    state.settings,
    state.updateSettings,
  ])

  function initializeValues(settings, fields) {
    const initialValues = {}
    fields.forEach((field) => {
      const value = settings[field.id]
      initialValues[field.id] = field.displayInverse
        ? value === 0
          ? 0
          : Number((1 / value).toFixed(2))
        : value
    })
    return initialValues
  }

  function parseAndTruncateValue(rawValue, displayInverse) {
    const numericValue = Number(rawValue)
    if (isNaN(numericValue) || numericValue === 0) return 0

    const parsedValue = displayInverse ? 1 / numericValue : numericValue
    return Number(parsedValue.toFixed(6))
  }

  const [valuesLeague1, setValuesLeague1] = useState(
    initializeValues(settings1, fields)
  )

  const [valuesLeague2, setValuesLeague2] = useState(
    initializeValues(settings2, fields)
  )

  function handleBlur(key, value, settings, updateSettings, displayInverse) {
    const parsedValue = parseAndTruncateValue(value, displayInverse)
    if (parsedValue !== settings[key]) {
      updateSettings({ [key]: parsedValue })
    }
  }

  function handleChange(e, setValues) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur()
    }
  }

  return (
    <>
      <h2 className="text-lg font-bold text-center p-4">{title}</h2>
      <div className="flex gap-4 justify-end mx-8">
        <div className="w-1/2 text-center font-bold">
          <p>League 1</p>
        </div>
        <div className="w-1/2 text-center font-bold">
          <p>League 2</p>
        </div>
      </div>
      <div className="px-4 pt-4 pb-40">
        {fields.map((field) => {
          return (
            <fieldset className="mb-4" key={field.id}>
              <legend className="block text-sm mb-2">{field.label}</legend>
              <div className="flex gap-4 justify-end mx-4">
                <div className="w-1/2 space-y-1">
                  <input
                    id={`l1_${field.id}`}
                    name={field.id}
                    type="text"
                    value={valuesLeague1[field.id]}
                    onChange={(e) => handleChange(e, setValuesLeague1)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        settings1,
                        updateSettings1,
                        field.displayInverse
                      )
                    }
                    onKeyDown={handleKeyDown}
                    onWheel={(e) => e.target.blur()} // To disable scroll wheel changing the number
                    className="bg-slate-200 dark:bg-slate-800 outline-none rounded py-1 px-2 w-full [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {field.displayInverse && (
                    <>
                      <p className="px-2 text-xs text-center">
                        1 point every <br />
                        {settings1[field.id] === 0
                          ? 0
                          : Number((1 / settings1[field.id]).toFixed(2))}{" "}
                        yards
                      </p>
                      <p className="px-2 text-xs text-center">
                        ({settings1[field.id]} per yard)
                      </p>
                    </>
                  )}
                </div>
                <div className="w-1/2 space-y-1">
                  <input
                    id={`l2_${field.id}`}
                    name={field.id}
                    type="number"
                    step="0.5"
                    value={valuesLeague2[field.id]}
                    onChange={(e) => handleChange(e, setValuesLeague2)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        settings2,
                        updateSettings2,
                        field.displayInverse
                      )
                    }
                    onKeyDown={handleKeyDown}
                    onWheel={(e) => e.target.blur()} // To disable scroll wheel changing the number
                    className="bg-slate-200 dark:bg-slate-800 outline-none rounded py-1 px-2 w-full [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {field.displayInverse && (
                    <>
                      <p className="px-2 text-xs text-center">
                        1 point every{" "}
                        {settings2[field.id] === 0
                          ? 0
                          : Number((1 / settings2[field.id]).toFixed(2))}{" "}
                        yards
                      </p>
                      <p className="px-2 text-xs text-center">
                        ({settings2[field.id]} per yard)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </fieldset>
          )
        })}
      </div>
    </>
  )
}

export default SettingsTab
