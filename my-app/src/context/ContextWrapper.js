'use client';
import { createContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import { getAPIHandler } from "@/src/ApiConfig/service";
import axios from "axios";
export const AccountContext = createContext();

export default function ContextWrapper({ children }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);
  const [staticListData, setStaticListData] = useState([]);
  const [notificationListData, setNotificationListData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isProfileUpdating, setIsProfileUpdating] = useState(true);
  const [openListView, setOpenListView] = useState(true);
  const [sort, setSort] = useState("");
    const [userData, setUserData] = useState({name:"Prem",degination:"developer"});

  const getStaticListDataApi = async (source) => {
    try {
      setStaticListData([]);
      setIsUpdating(true);
      const response = await getAPIHandler({
        endPoint: "staticContentList",
        source: source,
      });
      if (response.data.responseCode === 200) {
        setStaticListData(
          response.data.result.filter((item, index) =>
            window.location.pathname === "/static/terms"
              ? item.privacyPolicy === "TermsConditions"
              : window.location.pathname === "/static/privacy"
              ? item.privacyPolicy === "Privacypolicy"
              : window.location.pathname === "/static/about"
              ? item.privacyPolicy === "About Us"
              : item.privacyPolicy
          )
        );
        setIsUpdating(false);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  const getNotificationListDataApi = async (source) => {
    try {
      setNotificationListData([]);
      setIsNotificationLoading(true);
      const response = await getAPIHandler({
        endPoint: "listNotification",
        paramsData: {
          messageType:
            window.location.pathname === "/home/notification"
              ? "NOTIFICATION"
              : window.location.pathname === "/home/message"
              ? "MESSAGE"
              : "",
        },
        source: source,
      });

      if (response.data.responseCode === 200) {
        setNotificationListData(response.data.result);
        setIsNotificationLoading(false);
      }
      setIsNotificationLoading(false);
    } catch (error) {
      setIsNotificationLoading(false);
    }
  };
  const getProfileDataApi = async (source) => {
    try {
      setProfileData([]);
      setIsProfileUpdating(true);
      const response = await getAPIHandler({
        endPoint: "viewUser",
        source: source,
      });

      if (response.data.responseCode === 200) {
        setProfileData(response.data.result);
        setIsProfileUpdating(false);
      }
      setIsProfileUpdating(false);
    } catch (error) {
      setIsProfileUpdating(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const staticRoutes =
      window.location.pathname === "/static/about" ||
      window.location.pathname === "/static/privacy" ||
      window.location.pathname === "/static/terms";
    const notificationRoutes =
      window.location.pathname === "/home/notification" ||
      window.location.pathname === "/home/message";

    staticRoutes && getStaticListDataApi(source);
    notificationRoutes && getNotificationListDataApi(source);

    getProfileDataApi(source);
    return () => {
      source.cancel();
    };
  }, []);

  let data = {
    isUpdating,
    isNotificationLoading,
    staticListData,
    notificationListData,
    profileData,
    userData,
    isProfileUpdating,
    openListView,
    setOpenListView,
    sort,
    setSort,
    getProfileDataApi: (data) => getProfileDataApi(data),
    getListDataApi: (data) => getListDataApi(data),
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
