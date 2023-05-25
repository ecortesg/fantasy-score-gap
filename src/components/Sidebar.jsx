import { useMultipageForm } from "../hooks/useMultipageForm";
import CategoryLink from "./CategoryLink";
import Root from "./Root";
import SettingsPage from "./SettingsPage";
import { SLEEPER, ESPN, YAHOO } from "../data/presets_data";
import {
  PASSING,
  RUSHING,
  RECEIVING,
  KICKING,
  DEFENSE,
  SPECIAL_TEAMS,
  SPECIAL_TEAMS_PLAYER,
  MISC,
  BONUS,
} from "../data/fields_data";
import { IoMdArrowBack } from "react-icons/io";
import PresetButton from "./PresetButton";

function Sidebar({
  dataFilters,
  updateDataFilters,
  openSidebar,
  valuesLeague1,
  valuesLeague2,
  updateValuesLeague1,
  updateValuesLeague2,
}) {
  const { tab, goTo, isRoot } = useMultipageForm({
    root: (
      <Root dataFilters={dataFilters} updateDataFilters={updateDataFilters} />
    ),
    passing: (
      <SettingsPage
        title="Passing"
        fields={PASSING}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    rushing: (
      <SettingsPage
        title="Rushing"
        fields={RUSHING}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    receiving: (
      <SettingsPage
        title="Receiving"
        fields={RECEIVING}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    kicking: (
      <SettingsPage
        title="Kicking"
        fields={KICKING}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    defense: (
      <SettingsPage
        title="Defense"
        fields={DEFENSE}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    special_teams: (
      <SettingsPage
        title="Special Teams"
        fields={SPECIAL_TEAMS}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    special_teams_player: (
      <SettingsPage
        title="Special Teams Player"
        fields={SPECIAL_TEAMS_PLAYER}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    misc: (
      <SettingsPage
        title="Misc"
        fields={MISC}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
    bonus: (
      <SettingsPage
        title="Bonus"
        fields={BONUS}
        valuesLeague1={valuesLeague1}
        valuesLeague2={valuesLeague2}
        updateValuesLeague1={updateValuesLeague1}
        updateValuesLeague2={updateValuesLeague2}
      />
    ),
  });

  return (
    <div
      className={`flex flex-col justify-between bg-white lg:w-full lg:sticky top-12 lg:z-0 z-10 fixed h-[calc(100vh_-_48px)] w-[300px] transition-transform .3s ease-in-out lg:translate-x-0 ${
        !openSidebar ? "-translate-x-full" : ""
      }`}
    >
      <div className="lg:sticky top-0 lg:top-12 overflow-y-auto py-5">
        <div className="flex justify-center relative">
          {!isRoot && (
            <IoMdArrowBack
              size={28}
              onClick={() => goTo("root")}
              className="absolute left-4 cursor-pointer"
            />
          )}
        </div>
        <div>{tab}</div>
        {isRoot && (
          <div>
            <CategoryLink
              label="Passing"
              onClickFunction={() => goTo("passing")}
            />
            <CategoryLink
              label="Rushing"
              onClickFunction={() => goTo("rushing")}
            />
            <CategoryLink
              label="Receiving"
              onClickFunction={() => goTo("receiving")}
            />
            <CategoryLink
              label="Kicking"
              onClickFunction={() => goTo("kicking")}
            />
            <CategoryLink
              label="Defense"
              onClickFunction={() => goTo("defense")}
            />
            <CategoryLink
              label="Special Teams"
              onClickFunction={() => goTo("special_teams")}
            />
            <CategoryLink
              label="Special Teams Player"
              onClickFunction={() => goTo("special_teams_player")}
            />
            <CategoryLink label="Misc" onClickFunction={() => goTo("misc")} />
            <CategoryLink label="Bonus" onClickFunction={() => goTo("bonus")} />
            <div className="px-4 py-4">
              <p className="mb-4">Presets</p>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-center font-bold">League 1</p>
                <p className="text-center font-bold">League 2</p>
                <PresetButton
                  label="Sleeper"
                  values={SLEEPER}
                  updateValues={updateValuesLeague1}
                />
                <PresetButton
                  label="Sleeper"
                  values={SLEEPER}
                  updateValues={updateValuesLeague2}
                />
                <PresetButton
                  label="ESPN"
                  values={ESPN}
                  updateValues={updateValuesLeague1}
                />
                <PresetButton
                  label="ESPN"
                  values={ESPN}
                  updateValues={updateValuesLeague2}
                />
                <PresetButton
                  label="Yahoo"
                  values={YAHOO}
                  updateValues={updateValuesLeague1}
                />
                <PresetButton
                  label="Yahoo"
                  values={YAHOO}
                  updateValues={updateValuesLeague2}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
