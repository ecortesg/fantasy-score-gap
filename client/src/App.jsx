import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { SLEEPER } from "./components/presets_data";

function App() {
  const defaultSeason = "2022";
  const [season, setSeason] = useState(defaultSeason);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [valuesLeague1, setValuesLeague1] = useState(SLEEPER);
  const [valuesLeague2, setValuesLeague2] = useState(SLEEPER);

  useEffect(() => {
    const settings1 = window.localStorage.getItem("LEAGUE1");
    const settings2 = window.localStorage.getItem("LEAGUE2");
    if (settings1 !== null) {
      setValuesLeague1(JSON.parse(settings1));
    }
    if (settings2 !== null) {
      setValuesLeague2(JSON.parse(settings2));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("LEAGUE1", JSON.stringify(valuesLeague1));
  }, [valuesLeague1]);

  useEffect(() => {
    window.localStorage.setItem("LEAGUE2", JSON.stringify(valuesLeague2));
  }, [valuesLeague2]);

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
    <div className="grid min-h-screen grid-rows-[48px_auto] bg-slate-200">
      <div className="shadow-sm z-10">
        <Navbar
          openSidebar={openSidebar}
          onIconClick={() => setOpenSidebar((prev) => !prev)}
        />
      </div>
      <div className="grid lg:grid-cols-[300px_auto]">
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
      </div>
    </div>
  );
}

export default App;
