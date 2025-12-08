import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TbLogout } from "react-icons/tb";
import PropTypes from "prop-types";
import { Box, Drawer, List, ListSubheader } from "@mui/material";
// import {
//   Hidden,
// } from "@mui/material";
import NavItem from "./NavItem";
import { styled } from "@mui/material/styles";
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

const MainSiderBarBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "calc(100% - 73px)",
  overflow: "auto",
  [theme.breakpoints.down("xs")]: {
    // height: "calc(100% - 470px)",
  },
}));

const sections = [
  {
    items: [
      {
        title: "Home",
        icon: "/images/next.svg",
        href: "/admin/dashboard",
      },
      {
        title: "Favourites",
        icon: "/images/dashboard/FavoriteIcon.svg",
        href: "/admin/user-management",
      },
      {
        title: "Pets On List",
        icon: "/images/dashboard/management.png",
        href: "/admin/vineyard-management",
      },
      {
        title: "Intrested",
        icon: "/images/dashboard/planning.png",
        href: "/admin/brand-management",
      },
      {
        title: "Events",
        icon: "/images/dashboard/kyc.png",
        href: "/admin/nft-management",
      },
      {
        title: "Missing Pets",
        icon: "/images/dashboard/broadcast.png",
        href: "/admin/category-management",
      },

      {
        title: "Tracking",
        icon: "/images/dashboard/ip.png",
        href: "/admin/commission-management",
      },
      {
        title: "Rewards",
        icon: "/images/dashboard/feedback.png",
        href: "/admin/report-management",
      },
      {
        title: "Market",
        icon: "/images/dashboard/static.png",
        href: "/admin/redeem-management",
      },
      {
        title: "Play Game",
        icon: "/images/dashboard/link.png",
        href: "/admin/static-management",
      },
      {
        title: "About Us",
        icon: "/images/dashboard/user.png",
        href: "/admin/my-account",
      },
      {
        title: "Contact Us",
        icon: "/images/dashboard/user.png",
        href: "/admin/my-account",
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = pathname === item.href;

    acc.push(
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
  } else {
    acc.push(
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
  return acc;
}

const NavBar = ({ onMobileClose, openMobile }) => {
  const router = useRouter();
  const auth = useContext(AppContext);
  const { profileData } = auth;
  console.log("gshuehgu", profileData);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <MainSiderBarBox>
        <Box className="mainSiderBarBox">
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box pt={2} pb={2} style={{ margin: "10px" }}>
              <SideMenuBox>
                {sections?.map((section, i) => (
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
    </Box>
  );

  return (
    <>
      <MobileDrawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        sx={{ display: { md: "block", lg: "none" } }}
      >
        <Box p={2} style={{ position: "relative" }}>
          {content}
        </Box>
      </MobileDrawer>

      <DesktopDrawer
        anchor="left"
        open
        variant="persistent"
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      >
        {content}
      </DesktopDrawer>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
