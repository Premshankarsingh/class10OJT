"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";
import Link from "next/link";

const GallerySection = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "80px 0",
});

const GalleryHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
  "& h2": {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#2D3436",
    letterSpacing: "2px",
    margin: 0,
  },
  "& .subtitle": {
    fontFamily: "'Dancing Script', cursive, serif",
    fontSize: "1.2rem",
    color: "#F43755",
    marginTop: "5px",
  }
});

const PhotoCard = styled(Box)({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
  height: "220px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
    "& .overlay": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    "& a": {
      color: "#87CEEB",
    }
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    transition: "background-color 0.3s ease",
    paddingBottom: "20px",
  }
});

const SchoolGallery = () => {
  const [data, setData] = useState({ categories: [], title: "GALLERY", subtitle: "" });

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setData(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <GallerySection>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');`}
      </style>

      <Container maxWidth="lg">
        <GalleryHeader>
          <Typography variant="h2">{data.title}</Typography>
          <Typography className="subtitle">{data.subtitle}</Typography>
        </GalleryHeader>

        <Grid container spacing={10}>
          {(data.categories || []).map((item) => (
            <Grid key={item.id} size={{ xs: 6, sm: 6, md: 4 }}>
              <Link href={item.link} style={{ textDecoration: 'none' }}>
                <PhotoCard>
                  <img src={item.img} alt={item.title} />
                  <Box className="overlay">
                    <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "16px", textAlign: "center", textTransform: "capitalize", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
                      {item.title}
                    </Typography>
                  </Box>
                </PhotoCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GallerySection>
  );
};

export default SchoolGallery;
