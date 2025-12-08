"use client";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import {
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
const MainComponent = styled(Box)(({ theme }) => ({
  "& .footerSection": {
    position: "relative",
    padding: "50px 0px 0",
    zIndex: "2",
    overflow: " hidden",
    background: "rgba(255, 255, 255, 0.02)",
    background: "url(/images/footerBG.svg) no-repeat center/cover",
    padding: "20px 0 0",
    backgroundRepeat: "no-repeat",
    "& .footerContentBox": {
      maxWidth: "260px",
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
      fontSize: "12px",
      "& p": {
        color: "rgba(255, 255, 255, 0.87)",
        fontWeight: "300",
        fontSize: "13px",
      },
    },

    "& svg": {
      color: "#f53756 !important",
      fontSize: "27px !important",
      cursor: "pointer",
    },

    "& h6": {
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },

    "& a": {
      color: "rgba(255, 255, 255, 0.87)",
      display: "flex",
      fontSize: "13px",
      alignItems: "center",
      fontWeight: "300",
      paddingLeft: "0px",
      paddingRight: "0px",
      textDecoration: "none",
      [theme.breakpoints.only("xs")]: {
        fontSize: "11px",
      },
      "& :hover": {
        color: "##fe2efe",

        textDecoration: "none",
        "& svg": {
          color: "red",
          fontSize: "15px",
        },
      },
    },
    "& .borderBox": {
      position: "absolute",
      left: "153px",
      top: "12px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .iconbtn": {
      display: "flex",
      alignItems: "center",
      "& .MuiIconButton-root": {
        background: "transparent",
        marginRight: "15px",
        padding: "0px",
        [theme.breakpoints.down("xs")]: {
          marginBottom: "10px",
        },
      },
    },
  },
}));

const Footer = () => {
  const Router = useRouter();
  return (
    <MainComponent>
      <Box className="footerSection">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Box className="footerContentBox">
                <Box mb={2}>
                  {" "}
                  <Link href="/">
                    <img
                      src="/images/logo.svg"
                      alt=""
                      style={{ width: "152px" }}
                    />{" "}
                    <br />
                  </Link>
                </Box>
                <Typography
                  variant="body2"
                  style={{ color: "#F53756", maxWidth: "200px" }}
                >
                  The NFT Marketplace for Fine Wines
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={3}>
              <Typography
                variant="body2"
                style={{ color: "#F53756", fontWeight: "500" }}
                color="primary"
              >
                Platform
              </Typography>
              <List>
                <ListItem href="/brands" component={Link}>
                  Brands
                </ListItem>
                <ListItem href="/product" component={Link}>
                  Releases
                </ListItem>
                <ListItem href="/marketplace" component={Link}>
                  Marketplace
                </ListItem>
                <ListItem href="/" component={Link}>
                  Collabs
                </ListItem>
                <ListItem href="/static/faq" component={Link}>
                  FAQ
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={3} md={3}>
              <Typography
                variant="body2"
                style={{ color: "#F53756", fontWeight: "500" }}
                color="primary"
              >
                Contact Us
              </Typography>
              <List>
                <ListItem>
                  <Link href="mailto:Vintage@mailinator.com">
                    Vintage@mailinator.com
                  </Link>
                </ListItem>

                <ListItem style={{ cursor: "pointer" }}>
                  <Link href="">9109-9806432790</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                variant="body2"
                style={{ color: "#F53756", fontWeight: "500" }}
                color="primary"
              >
                Contact Us
              </Typography>

              <Box className="iconbtn" mt={2}>
                <IconButton target="_blank" href="https://www.whatsapp.com/">
                  <Link target="_blank" href="https://web.whatsapp.com/">
                    <FaWhatsapp />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link target="_blank" href="https://twitter.com">
                    <FaTwitter />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link target="_blank" href="https://telegram.org/">
                    <FaTelegramPlane />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link target="_blank" href="https://intagram.com/">
                    <FaInstagram />
                  </Link>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box className="copy" mt={1}>
          <Container>
            <Box
              alignItems="center"
              position="relative"
              flexWrap="wrap"
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2">© 2023 Vintage</Typography>

              <Box className="displayStart">
                <List className="displayStart">
                  <ListItem
                    href="/static/about"
                    component={Link}
                    style={{ whiteSpace: "pre" }}
                  >
                    About Us
                  </ListItem>

                  <ListItem
                    href="/static/privacy-policy"
                    component={Link}
                    style={{ marginLeft: "28px", whiteSpace: "pre" }}
                  >
                    Privacy Policy
                  </ListItem>

                  <ListItem
                    href="/static/terms-conditions"
                    component={Link}
                    style={{ marginLeft: "28px", whiteSpace: "pre" }}
                  >
                    Terms & Conditions
                  </ListItem>
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
