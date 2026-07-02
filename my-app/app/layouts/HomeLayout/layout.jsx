"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Footer from "./Footer";
import TopBar from "./Topbar";

// STYLED ROOT BOX
const RootComponent = styled(Box, {
  name: "MuiHomeLayout",
  slot: "root",
})(({ theme }) => ({
  "& .root": {
    backgroundColor: "#161032",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
    backgroundPosition: "top",
    position: "relative",
    "& .mainLayout": {
      zIndex: 1,
      position: "relative",
      minHeight: "calc(100vh - 415px)",
    },
  },
}));

export default function HomeLayout({ children }) {
  return (
    <RootComponent>
      <div className="root">
        <TopBar />
        <div className="mainLayout">{children}</div>
        <Footer />
      </div>
    </RootComponent>
  );
}
