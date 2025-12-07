"use client";
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FaTwitter, FaTelegramPlane, FaWhatsapp, FaInstagram } from "react-icons/fa";
import Link from "next/link";

// STYLED ROOT BOX
const MainComponent = styled(Box, {
  name: "MuiFooter",
  slot: "root",
})(({ theme }) => ({
  "& .footerSection": {
    position: "relative",
    padding: "20px 0 0",
    zIndex: 2,
    overflow: "hidden",
    background: "url(/images/footerBG.svg) no-repeat center/cover",
    color: "#fff",
    "& .footerContentBox": {
      maxWidth: 260,
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
    "& p": {
      color: "rgba(255, 255, 255, 0.87)",
    },
    "& .copy": {
      borderTop: "1px solid #d0d0d017",
      padding: "10px 0",
      textAlign: "center",
      fontWeight: 300,
      fontSize: 12,
      "& p": {
        color: "rgba(255, 255, 255, 0.87)",
        fontWeight: 300,
        fontSize: 13,
      },
    },
    "& svg": {
      color: "#f53756 !important",
      fontSize: 27,
      cursor: "pointer",
    },
    "& h6": {
      [theme.breakpoints.down("sm")]: { marginTop: 30 },
      [theme.breakpoints.down("xs")]: { marginTop: 10 },
    },
    "& a": {
      color: "rgba(255, 255, 255, 0.87)",
      display: "flex",
      fontSize: 13,
      alignItems: "center",
      fontWeight: 300,
      textDecoration: "none",
      [theme.breakpoints.only("xs")]: { fontSize: 11 },
      "&:hover": {
        color: "#fe2efe",
        textDecoration: "none",
        "& svg": { color: "red", fontSize: 15 },
      },
    },
    "& .iconbtn": {
      display: "flex",
      alignItems: "center",
      "& .MuiIconButton-root": {
        background: "transparent",
        marginRight: 15,
        padding: 0,
        [theme.breakpoints.down("xs")]: { marginBottom: 10 },
      },
    },
  },
}));

const Footer = () => {
  const router = useRouter();
  return (
    <MainComponent>
      <Box className="footerSection">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Logo & Description */}
            <Grid item xs={12} sm={12} md={4}>
              <Box className="footerContentBox">
                <Box mb={2}>
                
                    <Link href="/" >
                      <img src="/images/logo.svg" alt="Vintage Logo" style={{ width: 152 }} />
                    </Link>
                
                </Box>
                <Typography variant="body2" sx={{ color: "#F53756", maxWidth: 200 }}>
                  The NFT Marketplace for Fine Wines
                </Typography>
              </Box>
            </Grid>

            {/* Platform Links */}
            <Grid item xs={6} sm={3} md={3}>
              <Typography variant="body2" sx={{ color: "#F53756", fontWeight: 500 }}>
                Platform
              </Typography>
              <List>
                <ListItem component={Link} href="/brands">Brands</ListItem>
                <ListItem component={Link} href="/product">Releases</ListItem>
                <ListItem component={Link} href="/marketplace">Marketplace</ListItem>
                <ListItem component={Link} href="/">Collabs</ListItem>
                <ListItem component={Link} href="/static/faq">FAQ</ListItem>
              </List>
            </Grid>

            {/* Contact */}
            <Grid item xs={6} sm={3} md={3}>
              <Typography variant="body2" sx={{ color: "#F53756", fontWeight: 500 }}>
                Contact Us
              </Typography>
              <List>
                <ListItem>
                  <Link href="mailto:Vintage@mailinator.com">Vintage@mailinator.com</Link>
                </ListItem>
                <ListItem>
                  <Link href="tel:91099806432790">9109-9806432790</Link>
                </ListItem>
              </List>
            </Grid>

            {/* Social Icons */}
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="body2" sx={{ color: "#F53756", fontWeight: 500 }}>
                Follow Us
              </Typography>
              <Box className="iconbtn" mt={2}>
                <IconButton component={Link} target="_blank" href="https://www.whatsapp.com/">
                  <FaWhatsapp />
                </IconButton>
                <IconButton component={Link} target="_blank" href="https://twitter.com">
                  <FaTwitter />
                </IconButton>
                <IconButton component={Link} target="_blank" href="https://telegram.org/">
                  <FaTelegramPlane />
                </IconButton>
                <IconButton component={Link} target="_blank" href="https://instagram.com/">
                  <FaInstagram />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Copyright & Policies */}
        <Box className="copy" mt={1}>
          <Container>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
              <Typography variant="body2">© 2023 Vintage</Typography>
              <Box>
                <List sx={{ display: "flex", p: 0 }}>
                  <ListItem component={Link} href="/static/about" sx={{ whiteSpace: "pre", p: 0 }}>About Us</ListItem>
                  <ListItem component={Link} href="/static/privacy-policy" sx={{ whiteSpace: "pre", ml: 3, p: 0 }}>Privacy Policy</ListItem>
                  <ListItem component={Link} href="/static/terms-conditions" sx={{ whiteSpace: "pre", ml: 3, p: 0 }}>Terms & Conditions</ListItem>
                </List>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </MainComponent>
  );
};

export default Footer;
