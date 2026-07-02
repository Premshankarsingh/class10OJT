"use client";
import { createContext, useState } from "react";
import AppContext from "./AppContext";

export const AccountContext = createContext();

export default function ContextWrapper({ children }) {
  const [openListView, setOpenListView] = useState(true);
  const [sort, setSort] = useState("");
  const [userData] = useState({ name: "Prem", designation: "developer" });

  let data = {
    isUpdating: false,
    isNotificationLoading: false,
    staticListData: [],
    notificationListData: [],
    profileData: [],
    userData,
    isProfileUpdating: false,
    openListView,
    setOpenListView,
    sort,
    setSort,
    getProfileDataApi: () => {},
    getListDataApi: () => {},
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
