"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";
import HomeLayout from "../layouts/HomeLayout/layout";
import FACILITIES_DATA from "../data/facilities.json";

const DEFAULT_FACILITIES_DATA = [];

const PageWrapper = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
  minHeight: "100vh",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "60px",
  "& h2": {
    fontFamily: "'Playfair Display', serif",
    fontSize: "3rem",
    fontWeight: "900",
    color: "#2D3436",
    textTransform: "uppercase",
    letterSpacing: "4px",
    margin: 0,
  },
  "& .subtitle": {
    fontFamily: "'Dancing Script', cursive, serif",
    fontSize: "1.4rem",
    color: "#F43755",
    marginTop: "15px",
  },
});

const FacilityCard = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0px 6px 20px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
  height: "100%",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
    "& .imageOverlay": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  },
  "& .imageWrapper": {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  "& .imageOverlay": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  "& .content": {
    padding: "25px",
  },
  "& .title": {
    fontWeight: 800,
    fontSize: "1.3rem",
    color: "#2D3436",
    marginBottom: "10px",
  },
  "& .description": {
    fontSize: "0.95rem",
    color: "#666",
    lineHeight: "1.6",
  },
});

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState(DEFAULT_FACILITIES_DATA);

  useEffect(() => {
    fetch("/api/cms/facilities")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
      if (res.success && res.data) {
        const items = Array.isArray(res.data) ? res.data : res.data.facilities || [];
        if (items.length > 0) {
          setFacilities(items);
        } else {
          setFacilities(FACILITIES_DATA.facilities);
        }
      } else {
        setFacilities(FACILITIES_DATA.facilities);
      }
    }).catch(() => setFacilities(FACILITIES_DATA.facilities));
  }, []);

  return (
    <HomeLayout>
      <PageWrapper>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:wght@900&display=swap');`}
        </style>

        <Container maxWidth="lg">
          <SectionHeader>
            <Typography variant="h2">Our Facilities</Typography>
            <Typography className="subtitle">
              World-Class Infrastructure for Holistic Development
            </Typography>
          </SectionHeader>

          <Grid container spacing={4}>
            {facilities.map((facility) => (
              <Grid  size={{ xs: 6, sm: 6, md: 3 }} key={facility.id}>
                
                <FacilityCard>
                  <Box className="imageWrapper">
                    <img src={facility.image} alt={facility.title} />
                    <Box className="imageOverlay" />
                  </Box>
                  <Box className="content">
                    <Typography className="title">{facility.title}</Typography>
                    <Typography className="description">{facility.description}</Typography>
                  </Box>
                </FacilityCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageWrapper>
    </HomeLayout>
  );
}
