"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";
import HomeLayout from "../../layouts/HomeLayout/layout";

const FALLBACK_HISTORY_DATA = {
  title: "Our History",
  subtitle: "Legacy of Excellence Since 1952",
  journeyTitle: "The Journey",
  journeyText: "Shree Saraswati Secondary School began its journey in the Gurukul era...",
  images: [{ src: "/images/principal.png", alt: "Past School" }, { src: "/images/principal.png", alt: "Modern School" }],
  gurukulPrincipals: [],
  modernPrincipals: [],
};

const AboutSection = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
  position: "relative",
  "& h2": {
    fontFamily: "'Playfair Display', serif",
    fontSize: "3.8rem",
    fontWeight: "900",
    color: "#2D3436",
    textTransform: "uppercase",
    letterSpacing: "6px",
    margin: 0,
    position: "relative",
    display: "inline-block",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-12px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px",
      height: "5px",
      backgroundColor: "#F43755",
      borderRadius: "10px",
    }
  },
  "& .subtitle": {
    fontFamily: "'Dancing Script', cursive, serif",
    fontSize: "1.6rem",
    color: "#F43755",
    marginTop: "25px",
    display: "block",
  },
});

const EraDivider = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "60px 0 40px 0",
  "& .line": { flex: 1, height: "1px", backgroundColor: "#d1d8e0" },
  "& .text": { 
    padding: "0 20px", 
    fontFamily: "'Playfair Display', serif", 
    fontWeight: 900, 
    fontSize: "1.5rem",
    color: "#2D3436" 
  }
});

const PastSchoolHeader = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "800",
  color: "#2D3436",
  marginBottom: "15px",
  textTransform: "capitalize",
  letterSpacing: "1px",
  fontFamily: "'Playfair Display', serif",
});

const SchoolDescription = styled(Typography)({
  maxWidth: "850px",
  margin: "0 auto 40px auto",
  textAlign: "justify",
  color: "#4a4a4a",
  lineHeight: "1.8",
  fontSize: "1.05rem",
  fontFamily: "'Roboto', sans-serif",
});

const SchoolImageWrapper = styled(Box)({
  maxWidth: "750px", 
  margin: "0 auto 80px auto",
});

const StyledImg = styled('img')({
  width: "100%",
  height: "200px", 
  objectFit: "cover",
  borderRadius: "15px",
  display: "block",
  boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
});

const SubHeader = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "800",
  color: "#2D3436",
  textAlign: "center",
  marginBottom: "50px",
  fontFamily: "'Playfair Display', serif",
});

const PrincipalCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'era',
})(({ era }) => ({
  textAlign: "center",
  padding: "25px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  height: "100%",
  borderTop: era === "gurukul" ? "4px solid #CD7F32" : "4px solid #87CEEB",
  "& .imgSquare": {
    width: "150px",
    height: "150px",
    margin: "0 auto 15px auto",
    borderRadius: "15px",
    overflow: "hidden",
    filter: era === "gurukul" ? "sepia(0.5) contrast(1.1)" : "none",
    border: era === "gurukul" ? "3px solid #CD7F32" : "3px solid #87CEEB",
    "& img": { width: "100%", height: "100%", objectFit: "cover" },
  },
  "& .name": { fontWeight: "700", color: "#2D3436", fontSize: "1.1rem" },
  "& .years": { color: "#F43755", fontSize: "0.85rem", fontWeight: "600", marginTop: "5px" }
}));

const normalizeHistoryData = (d) => ({
  title: d.title || "Our History",
  subtitle: d.subtitle || "Legacy of Excellence Since 1952",
  journeyTitle: d.journeyTitle || d.journey_title || "The Journey",
  journeyText: d.journeyText || d.journey_text || "",
  images: d.images || [],
  gurukulPrincipals: d.gurukulPrincipals || d.gurukul_principals || [],
  modernPrincipals: d.modernPrincipals || d.modern_principals || [],
});

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState(normalizeHistoryData(FALLBACK_HISTORY_DATA));

  useEffect(() => {
    fetch("/api/cms/about-history")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
        if (res && res.success && res.data) setHistoryData(normalizeHistoryData(res.data));
      }).catch((err) => console.error("History fetch error:", err.message));
  }, []);

  const gurukulPrincipals = historyData.gurukulPrincipals || [];
  const modernPrincipals = historyData.modernPrincipals || [];

  return (
    <HomeLayout>
    <AboutSection>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:wght@800&family=Roboto:wght@400;700&display=swap');`}
      </style>
      
      <Container maxWidth="lg">
        <SectionHeader>
          <SubHeader variant="h2">Our History</SubHeader>
          <Typography className="subtitle">Legacy of Excellence Since 1952</Typography>
        </SectionHeader>

        <Box sx={{ maxWidth: "850px", margin: "0 auto" }}>
          <PastSchoolHeader variant="h2">{historyData.journeyTitle || "The Journey"}</PastSchoolHeader>
          <SchoolDescription>
            {historyData.journeyText}
          </SchoolDescription>
        </Box>

       
                 <SchoolImageWrapper>
                           <Grid container spacing={5}>
                             <Grid size={{ xs: 12, sm: 6 }}>
                               <StyledImg src={historyData.images[0]?.src} alt={historyData.images[0]?.alt || "Past School"} />
                             </Grid>
                             <Grid size={{ xs: 12, sm: 6 }}>
                               <StyledImg src={historyData.images[1]?.src} alt={historyData.images[1]?.alt || "Modern School"} />
                             </Grid>
                           </Grid>
                         </SchoolImageWrapper>

        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mt: 15, 
            mb: 2, 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 800 
          }}
        >
          Principals Over The Years
        </Typography>

        <EraDivider>
          <Box className="line" />
          <Typography className="text">The Gurukul Era</Typography>
          <Box className="line" />
        </EraDivider>

        <Grid container spacing={9} justifyContent="center">
          {gurukulPrincipals.map((p) => (
            <Grid item key={p.id} xs={12} sm={6} md={4}>
              <PrincipalCard era="gurukul">
                <Box className="imgSquare">
                  <img src={p.photo || "/images/principal.png"} alt={p.name} />
                </Box>
                <Typography className="name">{p.name}</Typography>
                <Typography className="years">Foundation Years: {p.years}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#666", mt: 1 }}>
                  {p.address}
                </Typography>
              </PrincipalCard>
            </Grid>
          ))}
        </Grid>

        <EraDivider>
          <Box className="line" />
          <Typography className="text">The Modern Era</Typography>
          <Box className="line" />
        </EraDivider>

        <Grid container spacing={9} justifyContent="center">
          {modernPrincipals.map((p) => (
            <Grid item key={p.id} xs={12} sm={6} md={4}>
              <PrincipalCard era="modern">
                <Box className="imgSquare">
                  <img src={p.photo || "/images/principal.png"} alt={p.name} />
                </Box>
                <Typography className="name">{p.name}</Typography>
                <Typography className="years">Working Years: {p.years}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#666", mt: 1 }}>
                  {p.address}
                </Typography>
              </PrincipalCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AboutSection>
    </HomeLayout>
  );
};

export default HistoryPage;