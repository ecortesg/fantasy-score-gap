import { useMultipageForm } from "../hooks/useMultipageForm";
import CategoryLink from "./CategoryLink";
import SettingsPage from "./SettingsPage";
import PresetsPage from "./PresetsPage";
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
  IDP,
} from "../data/fields_data";
import { IoMdArrowBack } from "react-icons/io";

function Sidebar({ openSidebar }) {
  const { tab, goTo, isRoot } = useMultipageForm({
    root: (
      <h2 className="text-center text-lg font-bold h-14 p-4">
        Scoring Settings
      </h2>
    ),
    presets: <PresetsPage />,
    passing: <SettingsPage title="Passing" fields={PASSING} />,
    rushing: <SettingsPage title="Rushing" fields={RUSHING} />,
    receiving: <SettingsPage title="Receiving" fields={RECEIVING} />,
    kicking: <SettingsPage title="Kicking" fields={KICKING} />,
    defense: <SettingsPage title="Defense" fields={DEFENSE} />,
    special_teams: (
      <SettingsPage title="Special Teams" fields={SPECIAL_TEAMS} />
    ),
    special_teams_player: (
      <SettingsPage
        title="Special Teams Player"
        fields={SPECIAL_TEAMS_PLAYER}
      />
    ),
    misc: <SettingsPage title="Misc" fields={MISC} />,
    bonus: <SettingsPage title="Bonus" fields={BONUS} />,
    idp: <SettingsPage title="IDP" fields={IDP} />,
  });

  return (
    <div
      className={`flex flex-col justify-between bg-white dark:bg-slate-700 border-r w-full sm:w-[300px] 2xl:w-full 2xl:sticky top-14 2xl:z-0 z-40 fixed h-[calc(100vh_-_48px)] transition-transform .3s ease-in-out 2xl:translate-x-0 ${
        !openSidebar ? "-translate-x-full" : ""
      }`}
    >
      <div className="2xl:sticky top-0 2xl:top-14 overflow-y-auto">
        <div className="flex justify-center relative">
          {!isRoot && (
            <IoMdArrowBack
              size={28}
              onClick={() => goTo("root")}
              className="absolute left-4 top-4 cursor-pointer"
            />
          )}
        </div>
        <div>{tab}</div>
        {isRoot && (
          <div className="pb-32">
            <CategoryLink
              label="Presets"
              onClickFunction={() => goTo("presets")}
            />
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
            <CategoryLink label="IDP" onClickFunction={() => goTo("idp")} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
