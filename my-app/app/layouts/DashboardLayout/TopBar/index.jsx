"use client";

import { Box, IconButton, Toolbar, AppBar, Grid, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon } from "@mui/icons-material";
import Logo from "../../../../src/components/Logo";


// ---------- STYLED COMPONENTS ------------ //

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "7px 30px",
  [theme.breakpoints.down("sm")]: {
    padding: "4px 16px",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
}));

const MainHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",

  "& .leftBox img": {
    width: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "28px",
    },
  },
}));

// -------------------------------------------- //

export default function TopBar({ onMobileNavOpen }) {
  return (
    <AppBarContainer elevation={3} color="inherit" position="sticky">
      <StyledToolbar>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { lg: "none", xs: "flex" } }}>
          <StyledIconButton onClick={onMobileNavOpen}>
            <MenuIcon sx={{ fontSize: 30, color: "#f53756" }} />
          </StyledIconButton>
        </Box>

        {/* MAIN HEADER */}
        <MainHeader>
          <Grid container alignItems="center">
            
            {/* LOGO - visible only on large screens */}
            <Grid
              item
              lg={3}
              md={3}
              sm={4}
              xs={4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Logo width="150px" />
            </Grid>

            {/* RIGHT SIDE */}
            <Grid
              item
              lg={9}
              md={9}
              sm={8}
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* Icons removed (commented previously) */}
            </Grid>

          </Grid>
        </MainHeader>
      </StyledToolbar>
    </AppBarContainer>
  );
}

// ------------------------------------------------ //
// Extra User Info Box (JSX version)
// ------------------------------------------------ //

export function TopBarData() {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography variant="h6">NFT Marketplace</Typography>
        <Typography variant="body2" sx={{ color: "#fff" }}>
          example@gmail.com
        </Typography>
      </Box>

      <Avatar src="/images/vendorImg.png" alt="" />
    </Box>
  );
}
