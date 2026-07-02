"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";

const PageWrapper = styled(Box)({
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

const SubHeader = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "800",
  color: "#2D3436",
  marginBottom: "15px",
  fontFamily: "'Playfair Display', serif",
  textTransform: "uppercase",
});

const SchoolImageWrapper = styled(Box)({
  maxWidth: "700px",
  margin: "30px auto 60px auto",
});

const StyledImg = styled('img')({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "15px",
  display: "block",
  boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
});

const PrincipalPhotoBox = styled(Box)({
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  "& .imgFrame": {
    width: "100%",
    height: "250px",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "15px",
    "& img": { width: "100%", height: "100%", objectFit: "cover" },
  },
  "& .title": {
    fontWeight: "800",
    color: "#2D3436",
    fontSize: "1rem",
    textTransform: "uppercase"
  }
});

const InfoCard = styled(Box)({
  padding: "25px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  height: "100%",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.04)",
  borderTop: "4px solid #F43755",
  "& h4": { fontWeight: "800", marginBottom: "10px", fontSize: "1.2rem" },
  "& p": { color: "#636e72", fontSize: "0.95rem", lineHeight: "1.6" }
});

const SchoolToday = () => {
  const [data, setData] = useState({
    title: "School Today",
    subtitle: "",
    description: "",
    images: [],
    principal: null,
    stats: [],
    vision: "",
    mission: "",
    achievements: "",
  });

  useEffect(() => {
    fetch("/api/cms/about-today")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setData(json.data);
      })
      .catch(() => {});
  }, []);

  const principal = data.principal || {};

  return (
    <PageWrapper>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Roboto:wght@400;700&display=swap');`}
      </style>

      <Container maxWidth="lg">

        <SectionHeader>
          <SubHeader variant="h2">{data.title}</SubHeader>
          <Typography className="subtitle">{data.subtitle}</Typography>
        </SectionHeader>

        <Box sx={{ mb: 8 }}>
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

          <Typography variant="h4" sx={{ maxWidth: "1100px", mx: "auto", textAlign: "justify", lineHeight: 1.8, fontSize: "1.05rem", fontWeight: 300, fontFamily: "'Roboto', sans-serif", color: "#4a4a4a" }}>
            {data.description}
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "1200px", margin: "0 auto 80px auto", px: 2 }}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 6 }}>
              {principal.name && (
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <PrincipalPhotoBox sx={{ width: "100%", p: "15px", m: 0 }}>
                      <Box className="imgFrame" sx={{ height: "220px !important" }}>
                        <img src={principal.photo || "/images/principal.png"} alt={principal.name} />
                      </Box>
                      <Typography className="title" sx={{ fontSize: "0.85rem", mt: 1 }}>
                        {principal.title || "CURRENT PRINCIPAL"}
                      </Typography>
                      <Typography sx={{ color: "#F43755", fontWeight: 700, fontSize: "0.9rem" }}>
                        {principal.name}
                      </Typography>
                    </PrincipalPhotoBox>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 7 }}>
                    <Typography sx={{ color: "#2D3436", lineHeight: 1.8, textAlign: "justify", fontSize: "1.05rem", fontWeight: 300, fontFamily: "'Roboto', sans-serif" }}>
                      {principal.description}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ pl: { md: 4 } }}>
                <Grid container spacing={2}>
                  {(data.stats || []).map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box sx={{
                        p: "18px",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.03)",
                        borderLeft: "4px solid #87CEEB",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        minHeight: "90px"
                      }}>
                        <Typography sx={{ fontSize: "0.75rem", color: "#F43755", fontWeight: 800, textTransform: "uppercase", mb: 0.5 }}>
                          {stat.label}
                        </Typography>
                        <Typography sx={{ fontSize: "1.15rem", color: "#2D3436", fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCard>
              <Typography variant="h4">Our Vision</Typography>
              <Typography>{data.vision}</Typography>
            </InfoCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCard>
              <Typography variant="h4">Our Mission</Typography>
              <Typography>{data.mission}</Typography>
            </InfoCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCard>
              <Typography variant="h4">Achievements</Typography>
              <Typography dangerouslySetInnerHTML={{ __html: data.achievements }} />
            </InfoCard>
          </Grid>
        </Grid>

      </Container>
    </PageWrapper>
  );
};

export default SchoolToday;
