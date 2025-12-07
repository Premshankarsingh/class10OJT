import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PerfectScrollbar from "react-perfect-scrollbar";
import { TbLogout } from "react-icons/tb";
import PropTypes from "prop-types";

import {
  Box,
  Drawer,
  List,
  Button,
  ListSubheader,
  Typography,
  Divider,
} from "@mui/material";

import NavItem from "./NavItem";
import { styled } from "@mui/system";
import AppContext from "../../../../src/context/AppContext";
// import LogoutModal from "@/components/LogoutModal";


const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    width: 256,
  },
}));

const DesktopDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    top: "76px",
    width: "250px",
    height: "calc(100% - 115px)",
    margin: "5px 10px 10px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    marginTop: "21px",
    marginLeft: "13px",
  },
  "& .sidebarmainBox": {
    top: "76px",
    width: "250px !important",
    height: "calc(100% - 115px) !important",
    margin: "5px 10px 10px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    marginTop: "21px",
    marginLeft: "13px",
    background: "rgba(69, 46, 84, 0.25) !important",
  },
}));

const SideMenuBox = styled(Box)({
  "& .MuiCollapse-wrapperInner": {
    marginLeft: "45px",
  },
});

const LogoutButton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "transparent",
  fontWeight: "400",
  fontSize: "13px",
  color: "#fff",
  marginTop: "20px",
  "& button": {
    borderRadius: "50px",
    position: "absolute",
    bottom: "10px",
  },
});

const MainSiderBarBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "calc(100% - 73px)",
  overflow: "auto",
  "& .mainSiderBarBox": {
    "& .profileBox": {
      "& img": {
        width: "100%",
        height: "150px",
        maxWidth: "150px",
        objectFit: "cover",
        borderRadius: "50%",
      },
      "& h6": {
        color: "#fff",
        fontWeight: "600",
        margin: "10px 0px",
      },
      "& p": {
        fontWeight: 400,
        color: "#fff",
        marginBottom: "24px",
      },
    },
  },
}));

// -------------------------------------------------------------
// Menu Items
// -------------------------------------------------------------
const sections = [
  {
    items: [
      { title: "Dashboard", icon: "/images/dashboard/menu.png", href: "/admin/dashboard" },
      { title: "User Management", icon: "/images/dashboard/management.png", href: "/admin/user-management" },
      { title: "Vineyard Management", icon: "/images/dashboard/management.png", href: "/admin/vineyard-management" },
      { title: "Brand Management", icon: "/images/dashboard/planning.png", href: "/admin/brand-management" },
      { title: "Add NFT Management", icon: "/images/dashboard/kyc.png", href: "/admin/nft-management" },
      { title: "Category Management", icon: "/images/dashboard/broadcast.png", href: "/admin/category-management" },
      { title: "Commission Management", icon: "/images/dashboard/ip.png", href: "/admin/commission-management" },
      { title: "Report Management", icon: "/images/dashboard/feedback.png", href: "/admin/report-management" },
      { title: "Redeem management", icon: "/images/dashboard/static.png", href: "/admin/redeem-management" },
      { title: "Static Content Management", icon: "/images/dashboard/link.png", href: "/admin/static-management" },
      { title: "My Account", icon: "/images/dashboard/user.png", href: "/admin/my-account" },
    ],
  },
];

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------
function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.map((item) =>
        reduceChildRoutes({ item, pathname, depth, acc: [] })
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = pathname === item.href;

    return (
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={open}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  }

  return (
    <NavItem
      depth={depth}
      href={item.href}
      icon={item.icon}
      info={item.info}
      key={key}
      title={item.title}
    />
  );
}

// -------------------------------------------------------------
// NavBar Component
// -------------------------------------------------------------
const NavBar = ({ onMobileClose, openMobile }) => {
  const router = useRouter();
  const auth = useContext(AppContext);
  const { profileData } = auth;

  // const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <MainSiderBarBox>
        <Box className="mainSiderBarBox">
          <Box className="profileBox displayColumn">
            <Box mt={3}>
              <img src="/images/vendorImg.png" alt="profile" />
            </Box>

            <Typography variant="h6">Prem Singh</Typography>

            <Divider
              style={{
                border: "0.5px solid rgba(255, 255, 255, 0.40)",
                width: "90%",
                marginTop: "8px",
              }}
            />
          </Box>

          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box pt={2} pb={2} style={{ margin: "10px" }}>
              <SideMenuBox>
                {sections.map((section, i) => (
                  <List
                    key={`menu${i}`}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {section.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems({
                      items: section.items,
                      pathname: router.pathname,
                    })}
                  </List>
                ))}
              </SideMenuBox>
            </Box>
          </PerfectScrollbar>
        </Box>
      </MainSiderBarBox>

      <Box>
        <LogoutButton>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => setIsLogout(true)}
            startIcon={<TbLogout />}
          >
            Logout
          </Button>
        </LogoutButton>

        {/* {isLogout && (
          <LogoutModal
            open={isLogout}
            handleClose={() => setIsLogout(false)}
            handleSubmit=""
          />
        )} */}
      </Box>
    </Box>
  );

  return (
    <>
      {/* <Hidden lgUp> */}
        <MobileDrawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box p={2} style={{ position: "relative" }}>
            {content}
          </Box>
        </MobileDrawer>
      {/* </Hidden> */}

      {/* <Hidden lgDown> */}
        <DesktopDrawer anchor="left" open variant="persistent">
          {content}
        </DesktopDrawer>
      {/* </Hidden> */}
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
