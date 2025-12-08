import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { BiBell } from "react-icons/bi";
import { styled } from "@mui/system";
import {
  IconButton,
  Toolbar,
  AppBar,
  Grid,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import Logo from "@/src/components/Logo";

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
 
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "7px 30px 7px 30px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 20px 0px 20px",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: "pointer",
}));

const MainHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",

  "& .leftBox": {
    width: "40px",
    [theme.breakpoints.down("md")]: {
      width: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "10px",
    },
    "& img": {
      width: "40px",
      [theme.breakpoints.down("xs")]: {
        width: "10px",
        paddingLeft: "0 !important",
      },
    },
    "& h4": {
     
      fontWeight: 400,
    },
  },
  "& .filtersButton": {
    marginLeft: "20px",
    "& .filterIcon": {
      "& button": {
        background: "rgba(0, 0, 0, 0.08) !important",
        width: "37px",
        height: "37px",
        borderRadius: "50%",

        padding: "0px",
        "& svg": {
          position: "absolute",
          color: "rgba(0, 0, 0, 0.40)",
          zIndex: 3,
        },
      },
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  return (
    
      <AppBarContainer
      elevation={3}
      style={{ padding: "0px" }}
      className={clsx(className)}
      color="inherit"
    >
      <StyledToolbar>
        {/* <Hidden lgUp> */}
          <StyledIconButton onClick={onMobileNavOpen}>
            <MenuIcon style={{ fontSize: "30px", color:"#f53756" }} />
          </StyledIconButton>
        {/* </Hidden> */}
        <MainHeader>
          <Grid container>
            {/* <Hidden mdDown> */}
              <Grid item lg={3} md={3} sm={4} xs={3}>
                <Logo width="150px" />
              </Grid>
            {/* </Hidden> */}
            <Grid lg={9} md={9} sm={12} xs={12} style={{display:"flex", justifyContent:"end"}}>
              <Box className="filtersButton displayEnd">
                <Box className="filterIcon">
                  <IconButton style={{ cursor: "pointer", marginRight: "8px" }}>
                    <HiOutlineDocumentArrowUp />
                  </IconButton>
                </Box>
                <Box className="filterIcon">
                  <IconButton>
                    <BiBell />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </MainHeader>
      </StyledToolbar>
    </AppBarContainer>
  
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Hidden xsDown>
          <Box>
            <Typography variant="h5">NFT Marketplace</Typography>
            <Typography variant="body1" style={{ color: "#fff" }}>
              example@gmail.com
            </Typography>
          </Box>
        </Hidden>
        &nbsp; &nbsp;
        <Avatar src="/images/vendorImg.png" alt="" />
      </Box>
    </>
  );
}
