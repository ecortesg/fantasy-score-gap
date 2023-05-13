import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { SLEEPER } from "./data/presets_data";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const defaultSeason = "2022";
  const [season, setSeason] = useState(defaultSeason);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [valuesLeague1, setValuesLeague1] = useLocalStorage("league1", SLEEPER);
  const [valuesLeague2, setValuesLeague2] = useLocalStorage("league2", SLEEPER);

  function updateSeason(e) {
    setSeason(e.target.value);
  }

  function updateValuesLeague1(newValues) {
    setValuesLeague1((prevValues) => {
      return { ...prevValues, ...newValues };
    });
  }

  function updateValuesLeague2(newValues) {
    setValuesLeague2((prevValues) => {
      return { ...prevValues, ...newValues };
    });
  }

  return (
    <main className="grid min-h-screen grid-rows-[48px_auto] bg-slate-200">
      <section className="shadow-sm z-10">
        <Navbar
          openSidebar={openSidebar}
          onIconClick={() => setOpenSidebar((prev) => !prev)}
        />
      </section>
      <section className="grid lg:grid-cols-[300px_auto]">
        <Sidebar
          season={season}
          updateSeason={updateSeason}
          openSidebar={openSidebar}
          valuesLeague1={valuesLeague1}
          valuesLeague2={valuesLeague2}
          updateValuesLeague1={updateValuesLeague1}
          updateValuesLeague2={updateValuesLeague2}
        />
        <Dashboard
          season={season}
          valuesLeague1={valuesLeague1}
          valuesLeague2={valuesLeague2}
        />
      </section>
    </main>
  );
}

export default App;
