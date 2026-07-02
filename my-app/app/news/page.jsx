"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Box, Container, Typography, Button, styled, Grid, IconButton } from "@mui/material";
import Link from "next/link";
import HomeLayout from "../layouts/HomeLayout/layout";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";

const DEFAULT_NEWS_DATA = {
  technical: [],
  general: [],
};

const NewsPageStyle = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
  minHeight: "100vh",

  "& .pageTitle": {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#2D3436",
    textAlign: "center",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },

  "& .pageSubtitle": {
    textAlign: "center",
    marginBottom: "50px",
    fontFamily: "'Dancing Script', cursive, serif",
    fontSize: "1.2rem",
    color: "#F53756",
  },

  "& .categoryTitle": {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: "30px",
    paddingBottom: "10px",
    borderBottom: "3px solid #F53756",
    display: "inline-block",
  },

  "& .newsRow": {
    display: "flex",
    alignItems: "center",
    height: "2cm",
    padding: "8px 12px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    },
  },

  "& .newsRowImage": {
    width: "2cm",
    height: "2cm",
    objectFit: "cover",
    borderRadius: "6px",
    flexShrink: 0,
  },

  "& .newsRowContent": {
    flex: 1,
    padding: "0 15px",
    minWidth: 0,
  },

  "& .newsRowDate": {
    color: "#888",
    fontSize: "10px",
    marginBottom: "2px",
  },

  "& .newsRowSubject": {
    color: "#F53756",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "2px",
  },

  "& .newsRowPreview": {
    fontSize: "10px",
    color: "#666",
    lineHeight: "1.4",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  "& .newsRowArrow": {
    color: "#F53756",
    "&:hover": {
      backgroundColor: "rgba(245, 55, 86, 0.1)",
    },
  },

  "& .backButton": {
    backgroundColor: "#fff",
    color: "#2D3436",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: "#f4f8fb",
      borderColor: "#F53756",
      color: "#F53756",
    },
  },

  "& .expandedView": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  "& .expandedCard": {
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "900px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    padding: "40px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.3)",
  },

  "& .closeButton": {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  },

  "& .expandedImage": {
    width: "250px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "4px solid #F53756",
  },

  "& .expandedMeta": {
    marginBottom: "15px",
    fontSize: "14px",
    color: "#666",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  "& .expandedTitle": {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#F53756",
    marginBottom: "15px",
  },

  "& .expandedContent": {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#555",
    whiteSpace: "pre-line",
  },
});

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState(DEFAULT_NEWS_DATA);

  useEffect(() => {
    fetch("/api/cms/news")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }).then((res) => {
        if (res.success && res.data) {
          setNewsData({
            general: res.data.general || [],
            technical: res.data.technical || [],
          });
        }
      }).catch((err) => console.error("News page fetch error:", err.message));
  }, []);

  const handleViewDetail = (news) => {
    setSelectedNews(news);
  };

  const handleClose = () => {
    setSelectedNews(null);
  };

  return (
    <HomeLayout>
      <NewsPageStyle>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Link href="/" passHref>
              <Button className="backButton" startIcon={<ArrowBackIcon />} disableElevation>
                Back to Home
              </Button>
            </Link>
          </Box>

          <Typography variant="h2" className="pageTitle">
            Latest News
          </Typography>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: "700", mb: 2, color: "#2D3436", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                General
              </Typography>
              <Box>
                {newsData.general.map((news) => (
                  <Box key={news.id} className="newsRow" onClick={() => handleViewDetail(news)}>
                    <img src={news.images?.[0] || "/images/principal.png"} alt={news.title} className="newsRowImage" />
                    <Box className="newsRowContent">
                      <Typography className="newsRowDate">{news.date}</Typography>
                      <Typography className="newsRowSubject">{news.subject}</Typography>
                      <Typography className="newsRowPreview">
                        {news.content?.length > 60 ? `${news.content.substring(0, 60)}...` : news.content || ""}
                      </Typography>
                    </Box>
                    <Box className="newsRowArrow" onClick={(e) => { e.stopPropagation(); handleViewDetail(news); }}>
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: "700", mb: 2, color: "#2D3436", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Technical
              </Typography>
              <Box>
                {newsData.technical.map((news) => (
                  <Box key={news.id} className="newsRow" onClick={() => handleViewDetail(news)}>
                     <img src={news.images?.[0] || "/images/principal.png"} alt={news.title} className="newsRowImage" />
                    <Box className="newsRowContent">
                      <Typography className="newsRowDate">{news.date}</Typography>
                      <Typography className="newsRowSubject">{news.subject}</Typography>
                      <Typography className="newsRowPreview">
                        {news.content.length > 60 ? `${news.content.substring(0, 60)}...` : news.content}
                      </Typography>
                    </Box>
                    <Box className="newsRowArrow" onClick={(e) => { e.stopPropagation(); handleViewDetail(news); }}>
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </NewsPageStyle>

      {selectedNews && createPortal(
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleClose}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              padding: "40px",
              boxShadow: "0px 10px 40px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "15px",
                right: "15px",
                backgroundColor: "rgba(0,0,0,0.1)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.2)" },
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Box display="flex" justifyContent="center">
                  <img src={selectedNews.images?.[0] || "/images/principal.png"} alt={selectedNews.title} style={{ width: "250px", height: "300px", objectFit: "cover", borderRadius: "12px", border: "4px solid #F53756" }} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography sx={{ fontSize: "1.8rem", fontWeight: "800", color: "#F53756", marginBottom: "15px" }}>{selectedNews.title}</Typography>
                <Box sx={{ marginBottom: "15px", fontSize: "14px", color: "#666", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <CalendarTodayIcon sx={{ fontSize: 14 }} />
                    <span>{selectedNews.date}</span>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <FolderIcon sx={{ fontSize: 14 }} />
                    <span>{selectedNews.subject}</span>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: "1rem", lineHeight: "1.8", color: "#555", whiteSpace: "pre-line" }}>{selectedNews.content}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>,
        document.body
      )}
    </HomeLayout>
  );
}