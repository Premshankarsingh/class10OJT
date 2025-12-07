"use client";
import AppContext from "../../../src/context/AppContext";
import { useState, useEffect, useContext, forwardRef } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../../src/components/Logo";
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
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { IoIosNotifications } from "react-icons/io";
import { AiFillCaretDown } from "react-icons/ai";

// import LogoutModal from "@/components/LogoutModal";
import Link from "next/link";
const headersData = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Brands", href: "/brands" },
  { label: "Wineries", href: "/wineries" },
];

const announcement = [{}];

// STYLED COMPONENTS
const MainComponent = styled(Box)(({ theme }) => ({
  "& .mainComponentBox": {
    "& .toolbar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
    },
    "& .menuButton": {
      fontSize: "14px",
      fontWeight: "400",
      borderRadius: 0,
      minWidth: "auto",
      color: "#fff",
      padding: "5px 7px",
      margin: "0 9px",
      borderBottom: "2px solid transparent",
      textTransform: "capitalize",
      "&.active": { color: "#F43755", borderBottom: "2px solid #F43755" },
      "&:hover": { color: "#F43755", borderBottom: "2px solid #F43755" },
    },
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPopover-paper": {
    outline: "0",
    border: "1px solid #2C235A",
    borderRadius: 10,
    backdropFilter: "blur(100px)",
    background: "rgba(137,113,253,0.1)",
  },
}));

export default function TopBar() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const userData = auth?.userData;
  console.log("userData",userData);

  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [disconnect, setDisconnect] = useState(false);

  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

  // RESPONSIVENESS
  useEffect(() => {
    const setResponsiveness = () => setMobileView(window.innerWidth < 799);
    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);
    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleConnectOpen = () => setOpen(true);
  const handleConnectClose = () => setOpen(false);

  const handleDisconnect = () => {
    setDisconnect(true);
    handleMenuClose();
  };

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const femmecubatorLogo = (
    <Box>
      <Link href ="/">
        <Logo />
      </Link>
    </Box>
  );

  const getMenuButtons = () =>
    headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <Button
          key={label}
          className={`menuButton ${isActive ? "active" : ""}`}
          color="inherit"
          onClick={() => router.push(href)}
        >
          {label}
        </Button>
      );
    });

  const displayDesktop = () => (
    <MainComponent>
      <Box className="mainComponentBox">
        <Toolbar className="toolbar">
          {femmecubatorLogo}

          <Box display="flex" alignItems="center">
            {getMenuButtons()}

            <IconButton onClick={() => router.push("/static/notification")}>
              <IoIosNotifications style={{ color: "#fff", fontSize: 30 }} />
            </IconButton>

            <Box display="flex" alignItems="center" ml={1} onClick={handleMenuClick} sx={{ cursor: "pointer" }}>
              <IconButton>A</IconButton>
              <AiFillCaretDown style={{ color: "#fff", marginLeft: 5 }} />
            </Box>

            <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => router.push("/marketplace/favourite")}>My Wishlist</MenuItem>
              <MenuItem onClick={() => router.push("/wallet")}>My Wallet</MenuItem>
              <MenuItem onClick={handleDisconnect}>Logout</MenuItem>
            </StyledMenu>

            <Button variant="contained" color="primary" onClick={handleConnectOpen} sx={{ ml: 2 }}>
              Connect Wallet
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </MainComponent>
  );

  const displayMobile = () => (
    <MainComponent>
      <Box className="mainComponentBox">
        <Toolbar>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon style={{ color: "#F43755" }} />
          </IconButton>
          {femmecubatorLogo}
        </Toolbar>

        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box sx={{ width: 250, p: 2 }}>
            {headersData.map(({ label, href }) => (
              <Button key={label} fullWidth onClick={() => router.push(href)}>
                {label}
              </Button>
            ))}

            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleConnectOpen}>
              Connect Wallet
            </Button>
          </Box>
        </Drawer>
      </Box>
    </MainComponent>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(4px)" }}>
        <Container maxWidth="lg">{mobileView ? displayMobile() : displayDesktop()}</Container>

        {/* {open && <ConnectWalletModal open={open} handleClose={handleConnectClose} />}
        {disconnect && <LogoutModal open={disconnect} handleClose={() => setDisconnect(false)} />} */}
      </AppBar>
    </>
  );
}
