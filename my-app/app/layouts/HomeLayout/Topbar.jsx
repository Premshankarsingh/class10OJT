"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Container,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
 
} from "@mui/material";
import Link from "next/link";
import Scroll from "react-scroll";
import Logo from "../../../src/components/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import AppContext from "../../../src/context/AppContext";
import styled from "@emotion/styled";
import { IoIosNotifications } from "react-icons/io";
import { AiFillCaretDown } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
// import { CiBullhorn } from "react-icons/ci";

// import AddcartCard from "@/components/AddcartCard";
// import ConnectWalletModal from "@/components/ConnectWalletModal";
// import LogoutModal from "@/components/LogoutModal";
const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Brands",
    href: "/brands",
  },
  {
    label: "Wineries",
    href: "/wineries",
  },
];
// const announcement = [{}];
const MainComponent = styled(Box)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "200px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
  },
  "& .mainComponentBox": {
    "& .menubox": {
      "& .Component-paper": {
        marginTop: "20px",
      },
      "& .MuiPopover-paper": {
        outline: "0",
        position: "absolute",
        maxHeight: "calc(100% - 32px)",
        minHeight: "16px",
        overflowX: "hidden",
        overflowY: "auto",
        border: "1px solid #2C235A !important",
        borderRadius: "10px",
        backdropFilter: "blur(100px)",
        background: "rgba(137, 113, 253, 0.10) !important",
      },
      "& ul": {
        "& .MuiMenuItem-root": {
          color: "rgba(255, 255, 255, 0.87)",
          fontSize: "13px",
          borderBottom: "1px solid transparent",
          padding: "10px",
          "&:not(:last-child)": {
            borderBottom: "1px solid rgb(255 255 255 / 17%)",
            padding: "10px",
          },
        },
        "& a": {
          fontSize: "15px",
          fontWeight: "500",
          color: "#B7B7B7",
          "&.active": {
            color: "#fff",
          },
          "&:hover": {
            color: "#fff",
          },
        },
      },
      "& .iconBox": {
        marginRight: "10px",
        width: "18px",
      },
    },
    "& .menuButton": {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: "400",
      borderRadius: 0,
      minWidth: "auto",
      color: "#fff",
      padding: "5px 7px",
      textDecoration: " none",
      margin: "0 9px",
      borderBottom: "2px solid transparent",
      position: "relative",
      textTransform: "capitalize",
      "@media (max-width: 900px)": {
        lineHeight: "24px",
        color: "#FFF",
        padding: "15px 0 !important",
        height: "41px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      "&.active": {
        color: "#F43755",
        borderBottom: "2px solid #F43755",
      },
      "&:hover": {
        color: "#F43755",
        borderBottom: "2px solid #F43755",
      },
    },
    "& .toolbar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 0,
      padding: " 10px 0px",
      // marginTop: 20,
    },
    "& .maindrawer": {
      height: "100%",
      background: "#0c0731",
      width: "260px",
    },
    "& .logoDrawer": {
      // paddingLeft: "10px",
      width: "140px",
      // marginBottom: "30px",
    },
    "& .drawerContainer": {
      padding: "20px 0px 20px 20px",
      height: "100%",
      background: "#161032",
      background: "#161032",
      width: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "& .drawericon": {
      fontSize: "25px",
      paddingRight: "0px",
      marginLeft: "0px !important",
    },
    "& .logoImg": {
      width: "75px",
      // height: '44.5px',
      margin: " 14px 15px 11px 0px",
      objectFit: "contain",
      "@media (max-width: 500px)": {
        margin: " 11px 1px 3px 0px",
        width: "52px",
        width: "75px",
      },
    },
    "& .menuMobile": {
      padding: "16px",
      "@media (max-width: 500px)": {
        padding: "7px 0",
        width: "100%",
      },
    },

    "& .mainHeader": {
      justifyContent: "space-between",
      padding: "0px",
    },

    "& .menuButton1": {
      paddingLeft: "0",
    },
    "& .menuMobile1": {
      padding: "15px 0",
      "& h4": {
        fontSize: "14px !important",
        lineHeight: " 17px",
        color: theme.palette.text.main,
        margin: "0 8px",
        fontWeight: "400",
        [theme.breakpoints.only("xs")]: {
          fontSize: "12px !important",
        },
      },
      "& svg": {
        color: theme.palette.text.main,
        "@media (max-width:767px)": {
          display: "none",
        },
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& figure": {
        margin: 0,
        width: 40,
        height: 40,
        borderRadius: "50px",
        overflow: "hidden",
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
        "& img": {
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          // maxHeight: "100%",
        },
      },
    },

    "& .sidebarBox": {
      // maxWidth: "400px",
      // width: "100%",
      padding: "20px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "355px",
      },
    },
  },
}));
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .Component-paper": {
    marginTop: "20px",
  },
  "& .MuiPopover-paper": {
    outline: "0",
    position: "absolute",
    maxHeight: "calc(100% - 32px)",
    minHeight: "16px",
    overflowX: "hidden",
    overflowY: "auto",
    border: "1px solid #2C235A !important",
    borderRadius: "10px",
    backdropFilter: "blur(100px)",
    background: "rgba(137, 113, 253, 0.10) !important",
  },
  "& ul": {
    "& .MuiMenuItem-root": {
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: "13px",
      borderBottom: "1px solid transparent",
      padding: "10px",
      "&:not(:last-child)": {
        borderBottom: "1px solid rgb(255 255 255 / 17%)",
        padding: "10px",
      },
    },
    "& a": {
      fontSize: "15px",
      fontWeight: "500",
      color: "#B7B7B7",
      "&.active": {
        color: "#fff",
      },
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .iconBox": {
    marginRight: "10px",
    width: "18px",
  },
}));
export default function TopBar() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const userData = auth.userData;
  const [open, setOpen] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [disconnect, setDisconnect] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDrawerOpen11 = () => {
    setOpen11(true);
  };
  const handleDrawerClose11 = () => {
    setOpen11(false);
  };

  const ScrollLink = Scroll.Link;
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { mobileView, drawerOpen } = state;
  const handleOpendisconnect = () => {
    setDisconnect(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      setState((prevState) => ({
        ...prevState,
        mobileView: window.innerWidth < 799,
      }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const displayDesktop = () => (
    <MainComponent>
      <Box className="mainComponentBox">
        <Toolbar className="toolbar">
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            {femmecubatorLogo}
          </Box>
          <Box className="displayStart serchBox">
            <TextField
              style={{ width: "100%", maxWidth: "225px" }}
              variant="outlined"
              placeholder="Search by brands name or category...."
              fullWidth
              type="search"
            />
            &nbsp;&nbsp;
            <IconButton style={{ padding: "0px", background: "transparent" }}>
              <img src="/images/searchbutton.png" alt="search" width="40px" />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {getMenuButtons()}
            <IconButton onClick={() => router.push("/static/notification")}>
              <IoIosNotifications style={{ color: "#fff", fontSize: "30px" }} />
            </IconButton>
            {/* <IconButton onClick={handleDrawerOpen11}>
              <img src="/images/cart.svg" width="25px" />
            </IconButton> */}

            <Box
              ml={1}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleClick}
            >
              <IconButton onClick={handleClick} className="accountMenuBox">
                A
              </IconButton>

              <AiFillCaretDown style={{ color: "#fff", marginLeft: "5px" }} />
            </Box>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              className="menubox"
              onClose={handleClose1}
            >
              <MenuItem onClick={() => router.push("/profile")}>
                <Box className="displayStart">
                  <img
                    src="/images/Account/account.svg"
                    alt="Account"
                    className="iconBox"
                  />
                  Profile
                </Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/marketplace/favourite")}>
                <Box className="displayStart">
                  <img
                    src="/images/Account/wislist.svg"
                    alt="Account"
                    className="iconBox"
                  />
                  My Wishlist
                </Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/wallet")}>
                <Box className="displayStart">
                  <img
                    src="/images/Account/wallet.svg"
                    alt="Account"
                    className="iconBox"
                  />
                  My Wallet
                </Box>
              </MenuItem>
              <MenuItem onClick={handleOpendisconnect}>
                <Box className="displayStart">
                  <img
                    src="/images/Account/logout.svg"
                    alt="Account"
                    className="iconBox"
                  />
                  Logout
                </Box>
              </MenuItem>
            </StyledMenu>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              startIcon={<img src="/images/connect.svg" />}
              style={{ marginLeft: "15px" }}
            >
              Connect Wallet
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </MainComponent>
  );

  const femmecubatorLogo = (
    <Box>
      <Link href="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <MainComponent key={href}>
          <Box className="mainComponentBox">
            <ScrollLink to={label}>
              <Button
                key={label}
                color="inherit"
                className={`menuButton ${isActive ? "active" : ""}`}
                onClick={() => {
                  if (href !== "/price") {
                    router.push(href);
                  } else {
                    router.push(`/?id=${label}`);
                  }
                }}
              >
                {label}
              </Button>
            </ScrollLink>
          </Box>
        </MainComponent>
      );
    });
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    //mobile
    return (
      <MainComponent>
        <Box className="mainComponentBox">
          <Toolbar className="mainHeader">
            <Drawer
              {...{
                anchor: "right",
                open: drawerOpen,
                onClose: handleDrawerClose,
              }}
              style={{ width: "200px" }}
            >
              <div className="drawerContainer" style={{padding:"10px", width:"225px"}}>
                <img className="logoDrawer" src="images/logo.svg" alt="" style={{ width:"140px"}}/>
                {getDrawerChoices()}
                <div>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                      startIcon={<img src="/images/connect.svg" />}
                      style={{ whiteSpace: "pre", width: "94%" }}
                    >
                      Connect Wallet
                    </Button>
                  </Box>
                </div>

                <Box className="displayStart serchBox" mt={2}>
                  <TextField
                    style={{ width: "100%", maxWidth: "225px" }}
                    variant="outlined"
                    placeholder="Search by brands name or category...."
                    fullWidth
                    type="search"
                  />
                  &nbsp;&nbsp;
                  <IconButton
                    style={{ padding: "0px", background: "transparent" }}
                  >
                    <img
                      src="/images/searchbutton.png"
                      alt="search"
                      width="40px"
                    />
                  </IconButton>
                </Box>
              </div>
            </Drawer>

            <Box display="flex" justifyContent="space-between">
              {femmecubatorLogo}
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton style={{ padding: "4px" }}>
                <IoIosNotifications
                  // style={{ color: "#fff", fontSize: "20px" }}
                />
              </IconButton>
              <IconButton
                onClick={handleDrawerOpen11}
                style={{ padding: "4px" }}
              >
                <img src="/images/cart.svg" width="20px" />
              </IconButton>
              <Box
                ml={1}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleClick}
              >
                <IconButton onClick={handleClick} className="accountMenuBox">
                  A
                </IconButton>

                <AiFillCaretDown style={{ color: "#fff", marginLeft: "5px" }} />
              </Box>
              <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                className="menubox"
                onClose={handleClose1}
              >
                <MenuItem onClick={() => history.push("/my-profile")}>
                  <Box className="displayStart">
                    <img
                      src="/images/Account/account.svg"
                      alt="Account"
                      className="iconBox"
                    />
                    Profile
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => history.push("/favourite")}>
                  <Box className="displayStart">
                    <img
                      src="/images/Account/wislist.svg"
                      alt="Account"
                      className="iconBox"
                    />
                    My Wishlist
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => history.push("/wallet")}>
                  <Box className="displayStart">
                    <img
                      src="/images/Account/wallet.svg"
                      alt="Account"
                      className="iconBox"
                    />
                    My Wallet
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleOpendisconnect}>
                  <Box className="displayStart">
                    <img
                      src="/images/Account/logout.svg"
                      alt="Account"
                      className="iconBox"
                    />
                    Logout
                  </Box>
                </MenuItem>
              </StyledMenu>
              <IconButton
                className="drawericon"
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                <MenuIcon
                  width="60px"
                  height="60px"
                  style={{ color: "#F43755", fontSize: "26px" }}
                />
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </MainComponent>
    );
  };
  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <MainComponent key={label}>
          <Box className="mainComponentBox">
            <Button
              className="menuButton"
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: Link,
              }}
            >
              <MenuItem className="menuMobile">{label}</MenuItem>
            </Button>
          </Box>
        </MainComponent>
      );
    });
  };
  return (
    <>
      <AppBar
        elevation={0}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          // position: "absolute",
          backdropFilter: "blur(4px)",
          top: "0",
          left: "auto",
          right: "0",
        }}
      >
        <Container maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
        {open && (
          <ConnectWalletModal
            open={open}
            handleClose={handleClose}
            handleSubmit=""
          />
        )}

        <Drawer
          variant="temporary"
          anchor="right"
          open={open11}
          className="carddrawerBox1"
          onClose={handleDrawerClose11}
          style={{ overflowY: "scroll" }}
        >
          <Box
          // className={sidebarBox}
          >
            <Box>
              <IconButton
                style={{ position: "absolute", top: "0px", right: "5px" }}
                onClick={handleDrawerClose11}
              >
                <IoClose style={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box
              align="left"
              mb={2}
              mt={1}
              pb={2}
              style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.60)" }}
            >
              <Typography variant="h4" style={{ color: "#fff" }}>
                Your cart
              </Typography>
            </Box>
            {/* <Grid container>
              <Grid item xs={12}>
                {announcement.map(() => (
                  <AddcartCard />
                ))}
              </Grid>
            </Grid> */}
            <Box align="right" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => history.push("/payment-method")}
              >
                Complete purchase
              </Button>
            </Box>
          </Box>
        </Drawer>
        {/* {disconnect && (
          <LogoutModal
            open={disconnect}
            handleClose={() => setDisconnect(false)}
            handleSubmit=""
          />
        )} */}
      </AppBar>
    </>
  );
}
