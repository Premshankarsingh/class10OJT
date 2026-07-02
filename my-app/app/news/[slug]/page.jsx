"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, styled, Grid } from "@mui/material";
import Link from "next/link";
import HomeLayout from "../../layouts/HomeLayout/layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";

const DetailPageStyle = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
  minHeight: "100vh",

  "& .backButton": {
    position: "fixed",
    top: "140px",
    left: "20px",
    zIndex: 1000,
    color: "#2D3436",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: "#fff",
      transform: "scale(1.1)",
    },
  },

  "& .newsHeader": {
    textAlign: "center",
    marginBottom: "40px",
  },

  "& .newsSubject": {
    display: "inline-block",
    backgroundColor: "#F53756",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "15px",
  },

  "& .newsTitle": {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: "20px",
    lineHeight: "1.3",
  },

  "& .newsMeta": {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    color: "#666",
    fontSize: "14px",
  },

  "& .metaItem": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  "& .featuredImage": {
    width: "100%",
    maxHeight: "500px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "40px",
  },

  "& .contentSection": {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "40px",
  },

  "& .newsContent": {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#555",
    whiteSpace: "pre-line",
  },

  "& .gallerySection": {
    marginTop: "40px",
  },

  "& .galleryTitle": {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: "20px",
  },

  "& .galleryGrid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  "& .galleryImage": {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  "& .authorInfo": {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
    marginTop: "40px",
  },

  "& .authorLabel": {
    fontSize: "12px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "5px",
  },

  "& .authorName": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2D3436",
  },
});

export default function NewsDetailPage({ params }) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const slug = React.use(params).slug;

  useEffect(() => {
    fetch("/api/cms/news")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }).then((res) => {
        if (res.success && res.data) {
          const allNews = [...(res.data.general || []), ...(res.data.technical || [])];
          const found = allNews.find(n => n.slug === slug);
          setNews(found || null);
        }
        setLoading(false);
      }).catch((err) => {
        console.error("News detail fetch error:", err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <HomeLayout>
        <DetailPageStyle>
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ textAlign: "center", mt: 10 }}>
              Loading...
            </Typography>
          </Container>
        </DetailPageStyle>
      </HomeLayout>
    );
  }

  if (!news) {
    return (
      <HomeLayout>
        <DetailPageStyle>
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ textAlign: "center", mt: 10 }}>
              News article not found
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Link href="/news">
                <Button variant="contained" sx={{ backgroundColor: "#F53756" }}>
                  Back to News
                </Button>
              </Link>
            </Box>
          </Container>
        </DetailPageStyle>
      </HomeLayout>
    );
  }

  const images = news.images || (news.image ? [news.image] : []);

  return (
    <HomeLayout>
      <Link href="/news">
        <Button className="backButton" disableElevation>
          <ArrowBackIcon />
        </Button>
      </Link>

      <DetailPageStyle>
        <Container maxWidth="lg">
          <Box className="newsHeader">
            <Typography className="newsSubject">{news.subject}</Typography>
            <Typography variant="h2" className="newsTitle">{news.title}</Typography>
            <Box className="newsMeta">
              <Box className="metaItem">
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
                <span>{news.date}</span>
              </Box>
              <Box className="metaItem">
                <FolderIcon sx={{ fontSize: 18 }} />
                <span>By {news.author || "School Administration"}</span>
              </Box>
            </Box>
          </Box>

          {images.length > 0 && <img src={images[0]} alt={news.title} className="featuredImage" />}

          <Box className="contentSection">
            <Typography className="newsContent">{news.content}</Typography>
          </Box>

          {images.length > 1 && (
            <Box className="gallerySection">
              <Typography className="galleryTitle">Photo Gallery</Typography>
              <Grid container spacing={3}>
                {images.map((image, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <img src={image} alt={`Gallery ${index + 1}`} className="galleryImage" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Box className="authorInfo">
            <Typography className="authorLabel">Published By</Typography>
            <Typography className="authorName">{news.author || "School Administration"}</Typography>
          </Box>
        </Container>
      </DetailPageStyle>
    </HomeLayout>
  );
}
