import { useMultipageForm } from "../hooks/useMultipageForm";
import CategoryLink from "./CategoryLink";
import Root from "./Root";
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
} from "../data/fields_data";
import { IoMdArrowBack } from "react-icons/io";

function Sidebar({ openSidebar }) {
  const { tab, goTo, isRoot } = useMultipageForm({
    root: <Root />,
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
    presets: <PresetsPage />,
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
            <CategoryLink
              label="Presets"
              onClickFunction={() => goTo("presets")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
