"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, styled, Grid } from "@mui/material";
import HomeLayout from "../../layouts/HomeLayout/layout";

const DEFAULT_SCHOOL_TODAY_DATA = {
  stats: [],
  principal: { name: "Mr. Chhabilal Bhandari", image: "/images/principal.png", description: "" },
  description: "",
  images: ["/images/past_school.jpg", "/images/modern_school.jpg"],
  vision: "",
  mission: "",
  achievements: [],
};

const PageWrapper = styled(Box)({
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

const SchoolImageWrapper = styled(Box)({
  marginBottom: "40px",
});

const StyledImg = styled("img")({
  width: "100%",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  objectFit: "cover",
  height: "250px",
});

const PrincipalPhotoBox = styled(Box)({
  textAlign: "center",
  "& .imgFrame": {
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  },
  "& .title": {
    fontSize: "0.75rem",
    color: "#888",
    fontWeight: 600,
    letterSpacing: "1px",
  }
});

const InfoCard = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  height: "100%",
  "& h4": {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: "#2D3436",
    marginBottom: "15px",
  },
  "& p": {
    color: "#555",
    lineHeight: 1.7,
  }
});

const SchoolToday = () => {
  const [data, setData] = useState(DEFAULT_SCHOOL_TODAY_DATA);

  useEffect(() => {
    fetch("/api/cms/about-today")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
        if (res && res.success) setData(res.data);
      }).catch((err) => console.error("SchoolToday fetch error:", err.message));
  }, []);

  const stats = data.stats || [];
  return (
    <HomeLayout>
      <PageWrapper>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Roboto:wght@400;700&display=swap');`}
      </style>

      <Container maxWidth="lg">
        
        <SectionHeader>
          <Typography variant="h2">School Today</Typography>
          <Typography className="subtitle">Modern Education for Modern Minds</Typography>
        </SectionHeader>
        
        <Box sx={{ mb: 8 }}>
          <SchoolImageWrapper>
                    <Grid container spacing={5}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <StyledImg src={data.images[0]?.src} alt={data.images[0]?.alt || "Past School"} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <StyledImg src={data.images[1]?.src} alt={data.images[1]?.alt || "Modern School"} />
                      </Grid>
                    </Grid>
                  </SchoolImageWrapper>

                <Typography variant="h4">
            {data.description}
         </Typography>
        </Box>

        
        <Box sx={{ maxWidth: "1200px", margin: "0 auto 80px auto", px: 2 }}>
  <Grid container spacing={6} alignItems="flex-start">
    
    <Grid size={{ xs: 12, md: 6 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, sm: 5 }}>
          <PrincipalPhotoBox sx={{ width: "100%", p: "15px", m: 0 }}>
            <Box className="imgFrame" sx={{ height: "220px !important" }}>
              <img src={data.principal.photo} alt="Principal" />
            </Box>
            <Typography className="title" sx={{ fontSize: "0.85rem", mt: 1 }}>
              CURRENT PRINCIPAL
            </Typography>
            <Typography sx={{ color: "#F43755", fontWeight: 700, fontSize: "0.9rem" }}>
              {data.principal.name}
            </Typography>
          </PrincipalPhotoBox>
        </Grid>

        <Grid size={{ xs: 12, sm: 7 }}>
          <Typography sx={{ color: "#2D3436", lineHeight: 1.8, textAlign: "justify", fontSize: "1.05rem", fontWeight: 300, fontFamily: "'Roboto', sans-serif" }}>
          {data.principal.description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <Box sx={{ pl: { md: 4 } }}>
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
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
              <Typography>
                {data.vision}
              </Typography>
            </InfoCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCard>
              <Typography variant="h4">Our Mission</Typography>
              <Typography>
                {data.mission}
              </Typography>
            </InfoCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCard>
              <Typography variant="h4">Achievements</Typography>
              <Typography>
                <span dangerouslySetInnerHTML={{ __html: data.achievements }} />
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>

      </Container>
    </PageWrapper>
    </HomeLayout>
  );
};

export default SchoolToday;