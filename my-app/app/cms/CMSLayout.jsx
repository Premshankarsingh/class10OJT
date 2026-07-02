"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NavigationIcon from "@mui/icons-material/Navigation";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MessageIcon from "@mui/icons-material/Message";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/src/context/AuthContext";

const drawerWidth = 260;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  zIndex: 1201,
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "margin-left 0.3s ease, width 0.3s ease",
  marginLeft: open ? `${drawerWidth}px` : 0,
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
}));

const MainContent = styled("main")(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: "64px",
  minHeight: "calc(100vh - 64px)",
  backgroundColor: "#f5f7fa",
}));

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, href: "/cms" },
  { label: "Topbar & Footer", icon: <NavigationIcon />, href: "/cms/topbar-footer" },
  { label: "Home Page", icon: <HomeIcon />, href: "/cms/home" },
  { label: "News", icon: <MessageIcon />, href: "/cms/news" },
  { label: "About", icon: <InfoIcon />, href: "/cms/about" },
  { label: "Staff", icon: <PeopleIcon />, href: "/cms/staff" },
  { label: "Facilities", icon: <BusinessIcon />, href: "/cms/facilities" },
  { label: "Gallery", icon: <PhotoLibraryIcon />, href: "/cms/gallery" },
  { label: "Exam Portal", icon: <SchoolIcon />, href: "/cms/exam-portal" },
  { label: "Contact", icon: <ContactMailIcon />, href: "/cms/contact" },
  { label: "Messages", icon: <MessageIcon />, href: "/cms/messages" },
  { label: "CMS Users", icon: <GroupIcon />, href: "/cms/users" },
];

export default function CMSLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar open={drawerOpen} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ color: "#1a1a2e", fontWeight: 700 }}>
              CMS Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: "#666" }}>{user.fullName}</Typography>
            <Avatar sx={{ bgcolor: "#F43755", width: 36, height: 36 }}>
              {user.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <IconButton onClick={async () => { await logout(); router.push("/"); }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fff",
          },
        }}
      >
        <Toolbar />
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.href}
              onClick={() => router.push(item.href)}
              sx={{
                borderRadius: "8px",
                mx: 1,
                mb: 0.5,
                backgroundColor: pathname === item.href ? "#f5f5f5" : "transparent",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.href ? "#F43755" : "#666", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: pathname === item.href ? 700 : 500,
                  color: pathname === item.href ? "#F43755" : "#333",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <MainContent>
        {children}
      </MainContent>
    </Box>
  );
}
