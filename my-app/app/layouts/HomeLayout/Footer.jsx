







"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FaTwitter, FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const MainComponent = styled(Box)(({ theme }) => ({
  "& .footerSection": {
    width: "100%",
    backgroundColor: "#ffffff", // Matching the light theme of the second image
    padding: "80px 10% 40px", // Adding side padding (10%) to push content in slightly from edges
    color: "#333",
    borderTop: "1px solid #eee",

    "& .logoInfo": {
      "& img": { width: "80px", marginBottom: "20px" },
      "& p": { fontSize: "14px", color: "#666", lineHeight: "1.6" },
    },

    "& .footerHeading": {
      fontWeight: "700",
      fontSize: "18px",
      marginBottom: "25px",
      color: "#000",
    },

    "& .footerLink": {
      display: "block",
      color: "#444",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "500",
      marginBottom: "15px",
      transition: "0.3s",
      "&:hover": { color: "#f53756" },
    },

    "& .socialBox": {
      display: "flex",
      gap: "10px",
      "& .MuiIconButton-root": {
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "10px",
        "& svg": { fontSize: "18px", color: "#333" },
        "&:hover": { backgroundColor: "#eee" }
      }
    },

    "& .copy": {
      borderTop: "1px solid #eee",
      paddingTop: "30px",
      marginTop: "50px",
      fontSize: "14px",
      color: "#888",
    },
  },
}));

const Footer = () => {
  const [footer, setFooter] = useState({
    address: "Satyawati-6,Johang, Gulmi",
    email: "saraswatischool@gmail.com",
    copyright: "Copyright © Saraswati Secondary School. All rights Reserved.",
  });

  useEffect(() => {
    fetch("/api/cms/footer")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      })
      .then((res) => {
        if (res && res.success && res.data) setFooter(res.data);
      })
      .catch((err) => console.error("Footer fetch error:", err.message));
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetch("/api/cms/footer")
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const ct = r.headers.get("content-type");
            if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
            return r.json();
          })
          .then((res) => {
            if (res && res.success && res.data) setFooter(res.data);
          })
          .catch((err) => console.error("Footer refetch error:", err.message));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <MainComponent>
      <Box className="footerSection">
       
        <Container maxWidth={false}>
          <Grid container spacing={4} justifyContent="space-between">
            
            
            <Grid item xs={12} md={5} className="logoInfo">
              <img src="/images/logo.png" alt="Logo" />
              <Typography variant="body2" sx={{ mt: 2, fontWeight: "500", color: "#af59a4", whiteSpace: "pre-line" }}>
                {footer.address}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, fontWeight: "700" }}>
                {footer.email}
              </Typography>
            </Grid>

            
            <Grid item xs={12} sm={4} md={2}>
              <Typography className="footerHeading">Facilities</Typography>
              <Link href="#" className="footerLink">Library</Link>
              <Link href="#" className="footerLink">Science Lab</Link>
              <Link href="#" className="footerLink">Computer Lab</Link>
              <Link href="#" className="footerLink">Hostel</Link>
            </Grid>

           
            <Grid item xs={12} sm={4} md={2}>
              <Typography className="footerHeading">Contact Us</Typography>
              <Link href="#" className="footerLink">Email Us</Link>
              <Link href="#" className="footerLink">Call Us</Link>
              <Link href="#" className="footerLink">Location</Link>
              <Link href="#" className="footerLink">FAQ</Link>
            </Grid>

           
            <Grid item xs={12} sm={4} md={2}>
              <Typography className="footerHeading">Social Media</Typography>
              <Box className="socialBox">
                <IconButton><FaTwitter /></IconButton>
                <IconButton><FaFacebookF /></IconButton>
                <IconButton><FaInstagram /></IconButton>
              </Box>
            </Grid>

          </Grid>

          <Box className="copy">
            <Typography>
              {footer.copyright}
            </Typography>
          </Box>
        </Container>
      </Box>
    </MainComponent>
  );
};

export default Footer;