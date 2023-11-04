import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className="grid min-h-screen grid-rows-[56px_auto] bg-slate-200 dark:bg-slate-800 dark:text-white">
      <section className="shadow-sm z-50">
        <Navbar
          openSidebar={openSidebar}
          onIconClick={() => setOpenSidebar((prev) => !prev)}
        />
      </section>
      <section className="grid 2xl:grid-cols-[minmax(300px,15%)_auto]">
        <Sidebar openSidebar={openSidebar} />
        <div className="flex flex-col">
          <Header />
          <Dashboard />
        </div>
      </section>
    </main>
  );
}

export default App;
