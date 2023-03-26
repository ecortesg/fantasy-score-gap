import { useState } from "react";

export function useMultipageForm(tabs) {
  const [activeTab, setActiveTab] = useState("root");

  function goTo(tab) {
    setActiveTab(tab);
  }

  return {
    goTo,
    tab: tabs[activeTab],
    isRoot: activeTab === "root",
  };
}
