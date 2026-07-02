"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid, Button, IconButton, TextField, InputAdornment } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";

const DEFAULT_NEWS_DATA = {
  technical: [],
  general: [],
};

const NewsSectionStyle = styled(Box)({
  padding: "60px 0",
  backgroundColor: "#f4f8fb",

  "& .sectionTitle": {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: "30px",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },

  "& .headerRow": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  "& .searchField": {
    width: "250px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      fontSize: "14px",
      "& fieldset": {
        borderColor: "#ddd",
      },
      "&:hover fieldset": {
        borderColor: "#F53756",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F53756",
      },
    },
  },

  "& .searchContainer": {
    position: "relative",
    zIndex: 1600,
  },

  "& .searchBackdrop": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1500,
  },

  "& .searchDropdown": {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
    maxHeight: "400px",
    overflowY: "auto",
    zIndex: 1600,
    padding: "10px",
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
    width: "1.5cm",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    color: "#F53756",
  },

  "& .viewMoreBtn": {
    display: "block",
    margin: "30px auto 0",
    backgroundColor: "#F53756",
    color: "#fff",
    padding: "10px 30px",
    borderRadius: "8px",
    fontWeight: "600",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },

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

  "& .expandedGallery": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "20px",
  },

  "& .galleryThumb": {
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
});

export default function NewsSection() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAllNews, setShowAllNews] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    fetch("/api/cms/news")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      })
      .then((res) => {
        if (res && res.success && res.data) {
          setNewsData({
            general: res.data.general || [],
            technical: res.data.technical || [],
          });
        } else {
          setNewsData({ general: [], technical: [] });
        }
      })
      .catch((err) => {
        console.error("NewsSection fetch error:", err.message);
        setNewsData({ general: [], technical: [] });
      });
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetch("/api/cms/news")
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const ct = r.headers.get("content-type");
            if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
            return r.json();
          })
          .then((res) => {
            if (res && res.success && res.data) {
              setNewsData({
                general: res.data.general || [],
                technical: res.data.technical || [],
              });
            } else {
              setNewsData({ general: [], technical: [] });
            }
          })
          .catch((err) => console.error("NewsSection refetch error:", err.message));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleViewMore = () => {
    window.location.href = "/news";
  };

  const handleViewDetail = (news) => {
    setSelectedNews(news);
  };

  const handleClose = () => {
    setSelectedNews(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const general = newsData?.general || [];
  const technical = newsData?.technical || [];

  const filteredGeneral = general.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTechnical = technical.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <NewsSectionStyle>
      <Container maxWidth="lg">
        <Box className="headerRow">
          <Typography variant="h2" className="sectionTitle">
            Latest News
          </Typography>
          <Box className="searchContainer">
            <TextField
              id="news-search"
              className="searchField"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#888", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            {searchQuery && (
              <>
                <Box className="searchBackdrop" onClick={() => setSearchQuery("")} />
                <Box className="searchDropdown">
                  {[...filteredGeneral, ...filteredTechnical].length > 0 ? (
                    [...filteredGeneral, ...filteredTechnical].map((news) => (
                      <Box
                        key={`${news.subject}-${news.id}`}
                        className="newsRow"
                        onClick={() => {
                          handleViewDetail(news);
                          setSearchQuery("");
                        }}
                        sx={{ marginBottom: "8px", cursor: "pointer" }}
                      >
                        <img src={news.images[0]} alt={news.title} className="newsRowImage" />
                        <Box className="newsRowContent">
                          <Typography className="newsRowDate">{news.date}</Typography>
                          <Typography className="newsRowSubject">{news.subject}</Typography>
                          <Typography className="newsRowPreview">
                            {news.content.length > 60 ? `${news.content.substring(0, 60)}...` : news.content}
                          </Typography>
                        </Box>
                        <Box className="newsRowArrow">
                          <ArrowForwardIcon sx={{ fontSize: 18 }} />
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "#888", padding: "20px" }}>
                      No results found
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: "700", mb: 2, color: "#2D3436", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
              General
            </Typography>
            <Box>
              {general.slice(0, 4).map((news) => (
                <Box key={news.id} className="newsRow" onClick={() => handleViewDetail(news)}>
                  <img src={news.images[0]} alt={news.title} className="newsRowImage" />
                  <Box className="newsRowContent">
                    <Typography className="newsRowDate">{news.date}</Typography>
                    <Typography className="newsRowSubject">{news.subject}</Typography>
                    <Typography className="newsRowPreview">
                      {news.content.length > 60 ? `${news.content.substring(0, 60)}...` : news.content}
                    </Typography>
                  </Box>
                  <Box className="newsRowArrow">
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
              {technical.slice(0, 4).map((news) => (
                <Box key={news.id} className="newsRow" onClick={() => handleViewDetail(news)}>
                  <img src={news.images[0]} alt={news.title} className="newsRowImage" />
                  <Box className="newsRowContent">
                    <Typography className="newsRowDate">{news.date}</Typography>
                    <Typography className="newsRowSubject">{news.subject}</Typography>
                    <Typography className="newsRowPreview">
                      {news.content.length > 60 ? `${news.content.substring(0, 60)}...` : news.content}
                    </Typography>
                  </Box>
                  <Box className="newsRowArrow">
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Button className="viewMoreBtn" onClick={handleViewMore} disableElevation>
          View More News
        </Button>
      </Container>

      {selectedNews && (
        <Box className="expandedView" onClick={handleClose}>
          <Box className="expandedCard" onClick={(e) => e.stopPropagation()}>
            <IconButton className="closeButton" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Box display="flex" justifyContent="center">
                  <img src={selectedNews.images[0]} alt={selectedNews.title} className="expandedImage" />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography className="expandedTitle">{selectedNews.title}</Typography>
                <Box className="expandedMeta">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <CalendarTodayIcon sx={{ fontSize: 14 }} />
                    <span>{selectedNews.date}</span>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <FolderIcon sx={{ fontSize: 14 }} />
                    <span>{selectedNews.subject}</span>
                  </Box>
                </Box>
                <Typography className="expandedContent">{selectedNews.content}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </NewsSectionStyle>
  );
}
