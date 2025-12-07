"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Collapse,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

// ------------------ Styled Components ------------------ //

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  paddingTop: 0,
  paddingBottom: 0,
  "& .MuiSvgIcon-root": {
    color: "#000",
    transition: "color 0.3s",
  },
  "&:hover .MuiSvgIcon-root": {
    color: "#000",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#000",
  justifyContent: "flex-start",
  textTransform: "none",
  marginBottom: "8px",
  width: "100%",
  fontWeight: 400,
  "&:hover": {
    color: "#000",
    background: "rgba(255, 255, 255, 0.40)",
    border: "1px solid rgba(0, 0, 0, 0.25)",
  },
}));

const StyledButtonLeaf = styled(Button)(({ theme }) => ({
  color: "#fff",
  justifyContent: "flex-start",
  textTransform: "none",
  width: "100%",
  marginBottom: "5px",
  borderRadius: "10px",
  fontWeight: 400,
  fontSize: "13px",
  "&:hover, &.active": {
    borderRadius: "10px",
    border: "0.5px solid #F43755 !important",
    background: "linear-gradient(165deg, #FF9AAB -64.52%, #F53756 61.26%)",
    color: "#fff !important",
  },
  "&.depth-0": {
    "& span": {
      fontWeight: 400,
      fontSize: "12px",
    },
  },
}));

const StyledIcon = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
}));

const SideIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30px",
  height: "35px",
  borderRadius: "50%",
}));

const StyledTitle = styled("span")({
  marginLeft: "5px",
  color: "#fff",
  fontWeight: 300,
  whiteSpace: "pre",
});

const StyledCollapse = styled(Collapse)({
  marginLeft: "0px",
});

// ------------------ Component Logic ------------------ //

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  tabview,
  setSelectedTab,
  ...rest
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    if (tabview === "Sniper") {
      setSelectedTab(tabview);
    }
  }, [tabview]);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const paddingLeft = depth > 0 ? 32 + 8 * depth : 8;
  const isActive = typeof window !== "undefined" && window.location.pathname === href;

  // ------------------ Parent Item (Has Children) ------------------ //
  if (children) {
    return (
      <StyledListItem className={clsx(className)} disableGutters {...rest}>
        <StyledButton onClick={handleToggle}>
          {Icon && (
            <StyledIcon>
              <img src={Icon} alt={`${title}Icon`} />
            </StyledIcon>
          )}

          <StyledTitle>{title}</StyledTitle>

          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledButton>

        <StyledCollapse in={open}>{children}</StyledCollapse>
      </StyledListItem>
    );
  }

  // ------------------ Leaf Item ------------------ //
  return (
    <StyledListItem className={clsx(className)} disableGutters {...rest}>
      <StyledButtonLeaf
        className={clsx(`depth-${depth}`, isActive && "active")}
        onClick={() => router.push(href)}
      >
        <SideIconBox>
          {Icon && (
            <StyledIcon>
              <img src={Icon} alt={`${title}Icon`} width="19px" />
            </StyledIcon>
          )}
        </SideIconBox>

        <StyledTitle>{title}</StyledTitle>

        {Info && <Info />}
      </StyledButtonLeaf>
    </StyledListItem>
  );
};

// ------------------ PropTypes ------------------ //

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  info: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
