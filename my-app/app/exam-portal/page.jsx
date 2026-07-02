
"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import HomeLayout from "../layouts/HomeLayout/layout";
import EXAM_DATA from "../data/exam-portal.json";

const DEFAULT_EXAM_DATA = [];

const GallerySection = styled(Box)({
  backgroundColor: "#f4f8fb", 
  padding: "120px 0 80px 0",
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
    alignItems: "center",
    transition: "background-color 0.3s ease",
    "& span": {
      textDecoration: "none",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "capitalize",
      textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
    },
  },
  "&:hover .overlay span": {
    color: "#87CEEB",
    textDecoration: "underline",
  }
});

const PhotoGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "40px",
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "30px",
  },
  "@media (max-width: 500px)": {
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
});



const Examportal = () => {
  const [examData, setExamData] = useState(DEFAULT_EXAM_DATA);

  useEffect(() => {
    fetch("/api/cms/exam-portal")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
      if (res.success && res.data) {
        const exams = Array.isArray(res.data) ? res.data : res.data.exams || [];
        if (exams.length > 0) {
          setExamData(exams);
        } else {
          setExamData(EXAM_DATA.exams);
        }
      } else {
        setExamData(EXAM_DATA.exams);
      }
    }).catch(() => setExamData(EXAM_DATA.exams));
  }, []);

  return (
    <HomeLayout>
      <GallerySection>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');`}
        </style>

        <Container maxWidth="lg">
          <GalleryHeader>
            <Typography variant="h2">EXAM PORTAL</Typography>
            <Typography className="subtitle">
              Access Examination Resources At Saraswati Secondary School      
            </Typography>
          </GalleryHeader>

          <PhotoGrid>
            {examData.map((item) => (
              <Link key={item.id} href={item.link} style={{ textDecoration: 'none' }}>
                <PhotoCard>
                  <img src={item.img} alt={item.title} />
                  <Box className="overlay">
                    <span>{item.title}</span>
                  </Box>
                </PhotoCard>
              </Link>
          ))}
        </PhotoGrid>
        </Container>
      </GallerySection>
    </HomeLayout>
  );
};

export default Examportal;
