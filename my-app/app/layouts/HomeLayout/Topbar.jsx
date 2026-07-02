"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Container,
  IconButton,
  Button,
  MenuItem,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import Logo from "../../../src/components/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useAuth } from "@/src/context/AuthContext";

const MainComponent = styled(Box)(({ theme }) => ({
  "& .mainComponentBox": {
    "& .menuButton": {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
      margin: "0 8px",
      textTransform: "capitalize",
      "&:hover": { color: "#F43755" },
    },
    "& .aboutButton": {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
      margin: "0 8px",
      textTransform: "capitalize",
      "&:hover": { color: "#F43755" },
    },
    "& .loginButton": {
      backgroundColor: "#F43755",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "600",
      padding: "8px 20px",
      borderRadius: "8px",
      textTransform: "capitalize",
      marginLeft: "16px",
      "&:hover": { backgroundColor: "#d32f2f" },
    },
    "& .toolbar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0px",
      minHeight: "60px",
    },
    "& .dropdownMenu": {
      position: "absolute",
      top: "100%",
      left: 0,
      minWidth: "180px",
      backgroundColor: "#fff",
      borderRadius: "4px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: "8px 0",
      zIndex: 1300,
    },
    "& .dropdownItem": {
      padding: "10px 16px",
      fontSize: "14px",
      color: "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#F43755",
      },
    },
    "& .userMenu": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginLeft: "16px",
    },
  },
}));

export default function TopBar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [topbarData, setTopbarData] = useState(null);
  const [state, setState] = useState({ mobileView: false, drawerOpen: false });
  const { mobileView, drawerOpen } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/cms/topbar")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      })
      .then((res) => {
        if (res && res.success) setTopbarData(res.data);
      })
      .catch((err) => console.error("Topbar fetch error:", err.message));

    const setResponsiveness = () => {
      setState((prevState) => ({
        ...prevState,
        mobileView: window.innerWidth < 900,
      }));
    };
    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);
    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !topbarData) {
        fetch("/api/cms/topbar")
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const ct = r.headers.get("content-type");
            if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
            return r.json();
          })
          .then((res) => {
            if (res && res.success) setTopbarData(res.data);
          })
          .catch((err) => console.error("Topbar refetch error:", err.message));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [topbarData]);

  const handleDrawerOpen = () => setState((p) => ({ ...p, drawerOpen: true }));
  const handleDrawerClose = () => setState((p) => ({ ...p, drawerOpen: false }));
  const handleLogout = async () => { await logout(); router.push("/"); };

  if (!topbarData) return (
    <AppBar
      elevation={1}
      style={{
        backgroundColor: "#ffffff",
        position: "fixed",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: "60px", justifyContent: "space-between" }}>
          <Box sx={{ height: "45px", width: "200px", bgcolor: "#f0f0f0", borderRadius: "4px" }} />
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box sx={{ height: "36px", width: "80px", bgcolor: "#f0f0f0", borderRadius: "4px" }} />
            <Box sx={{ height: "36px", width: "80px", bgcolor: "#f0f0f0", borderRadius: "4px" }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  const schoolBranding = (
    <Box display="flex" alignItems="center">
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Box sx={{ height: mobileView ? "35px" : "45px", display: "flex", alignItems: "center" }}>
           <Logo />
        </Box>
        <Box ml={1} display="flex" flexDirection="column">
          <Typography
            variant="h6"
            style={{
              fontSize: mobileView ? "14px" : "16px",
              fontWeight: "800",
              color: "#F43755",
              lineHeight: "1",
            }}
          >
             {topbarData.schoolName}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: "#666",
              lineHeight: "1",
            }}
          >
            {topbarData.schoolLocation}
          </Typography>
        </Box>
      </Link>
    </Box>
  );

  return (
    <AppBar
      elevation={1}
      style={{
        backgroundColor: "#ffffff",
        position: "fixed",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <MainComponent>
          <Box className="mainComponentBox">
            <Toolbar className="toolbar" disableGutters>
              {schoolBranding}
              {!mobileView ? (
                <Box display="flex" alignItems="center" sx={{ position: "relative" }}>
                  {topbarData.navItems.map(({ label, href, subItems }) => (
                    subItems ? (
                      <Box key={label}>
                        <Button
                          className="aboutButton"
                          onClick={(e) => { setAnchorEl(e.currentTarget); setAboutMenuOpen(true); }}
                          onMouseEnter={() => setAboutMenuOpen(true)}
                        >
                          {label}
                        </Button>
                        {aboutMenuOpen && (
                          <Paper className="dropdownMenu" onMouseLeave={() => setAboutMenuOpen(false)} elevation={3}>
                            {subItems.map((item) => (
                              <MenuItem key={item.label} className="dropdownItem" onClick={() => { router.push(item.href); setAboutMenuOpen(false); }}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Paper>
                        )}
                      </Box>
                    ) : (
                      <Button key={label} className="menuButton" onClick={() => router.push(href)}>
                        {label}
                      </Button>
                    )
                  ))}
                  {user ? (
                    <Box className="userMenu">
                      <Button variant="contained" size="small" onClick={() => router.push("/cms")} sx={{ backgroundColor: "#1a1a2e", "&:hover": { backgroundColor: "#2d2d4e" } }}>
                        CMS
                      </Button>
                      <Avatar sx={{ bgcolor: "#F43755", width: 32, height: 32, fontSize: "14px" }}>
                        {user.fullName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.fullName}</Typography>
                      <IconButton onClick={handleLogout} size="small" title="Logout">
                        <LogoutIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button className="loginButton" onClick={() => router.push("/auth/login")}>
                      Login
                    </Button>
                  )}
                </Box>
              ) : (
                <>
                  <IconButton onClick={handleDrawerOpen} size="small">
                    <MenuIcon style={{ color: "#F43755", fontSize: "24px" }} />
                  </IconButton>
                  <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                    <Box p={2} width="220px">
                      {topbarData.navItems.map(({ label, href }) => (
                        <MenuItem key={label} onClick={() => { router.push(href); handleDrawerClose(); }}>
                          {label}
                        </MenuItem>
                      ))}
                      {user ? (
                        <>
                          <MenuItem onClick={() => { router.push("/cms"); handleDrawerClose(); }}>CMS Dashboard</MenuItem>
                          <MenuItem onClick={() => { handleLogout(); handleDrawerClose(); }}>Logout</MenuItem>
                        </>
                      ) : (
                        <MenuItem onClick={() => { router.push("/auth/login"); handleDrawerClose(); }}>Login</MenuItem>
                      )}
                    </Box>
                  </Drawer>
                </>
              )}
            </Toolbar>
          </Box>
        </MainComponent>
      </Container>
    </AppBar>
  );
}
