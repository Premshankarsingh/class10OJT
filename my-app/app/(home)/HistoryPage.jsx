"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";

const AboutSection = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "80px 0",
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

const HistoryPage = () => {
  const [data, setData] = useState({
    title: "Our History",
    subtitle: "Legacy of Excellence Since 1952",
    journeyTitle: "The Journey",
    journeyText: "",
    images: [],
    gurukulPrincipals: [],
    modernPrincipals: [],
  });

  useEffect(() => {
    fetch("/api/cms/about-history")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setData(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <AboutSection>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:wght@800&family=Roboto:wght@400;700&display=swap');`}
      </style>

      <Container maxWidth="lg">
        <SectionHeader>
          <SubHeader variant="h2">{data.title}</SubHeader>
          <Typography className="subtitle">{data.subtitle}</Typography>
        </SectionHeader>

        <Box sx={{ maxWidth: "850px", margin: "0 auto" }}>
          <PastSchoolHeader variant="h2">{data.journeyTitle}</PastSchoolHeader>
          <SchoolDescription>{data.journeyText}</SchoolDescription>
        </Box>

        {(data.images?.length > 0) && (
          <SchoolImageWrapper>
            <Grid container spacing={5}>
              {data.images.map((img, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <StyledImg src={img.src} alt={img.alt || "School image"} />
                </Grid>
              ))}
            </Grid>
          </SchoolImageWrapper>
        )}

        <Typography
          variant="h3"
          sx={{
            textAlign: 'center', mt: 15, mb: 2,
            fontFamily: "'Playfair Display', serif", fontWeight: 800
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
          {(data.gurukulPrincipals || []).map((p) => (
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
          {(data.modernPrincipals || []).map((p) => (
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
  );
};

export default HistoryPage;
