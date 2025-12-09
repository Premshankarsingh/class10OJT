"use client";
import Image from "next/image";
import { Box, Grid, styled, Typography } from "@mui/material";
import LoginTopBar from "./LoginTopBar";

// ---------- STYLED COMPONENT ----------
const MainComponent = styled(Box)(({ theme }) => ({
  "& .loginLayoutBox": {
    marginTop: "60px",
    background: `url("/images/login/backgroundImage.svg")`,
    width: "100%",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat !important",
    objectFit: "cover !important",

    "& .MainLayout": {
      height: "100vh",
      position: "relative",
    },
    "& .careImageBox": {
      width: "100%",
      padding: "150px",
      overflow: "hidden",
      position: "relative",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
}));

export default function LoginLayout({ children }) {
  return (
    <>
      <LoginTopBar />
      <MainComponent>
        <Box className="loginLayoutBox">
          <Box className="MainLayout">
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Box className="displayCenter">
                  <Box className="careImageBox">
                    <img
                      src="/images/login/careImage.svg"
                      width="500px"
                      height="500px"
                      alt="Picture of the author"
                    />
                    <Box align="center">
                      <Typography variant="h1">Cali’s Dairy</Typography>
                      <Typography variant="h4">Find, Connect & Buy</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Box className="MainLayout">{children}</Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </MainComponent>
    </>
  );
}
