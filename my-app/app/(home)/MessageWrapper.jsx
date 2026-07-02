
"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, styled, Grid } from "@mui/material";
import Link from "next/link";

const MessageWrapperStyle = styled(Box)(({ theme }) => ({
  padding: "80px 0",
  backgroundColor: "#ffffff",
  "& .teacherCard": {
    height: "100%",
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    border: "1px solid #f0f0f0",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
      borderColor: "#F53756",
    }
  },
  "& .principalImage": {
    width: "130px",
    height: "160px",
    borderRadius: "12px",
    objectFit: "cover",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
    },
  },
  "& .redTitle": {
    color: "#F53756",
    fontWeight: "800",
    fontSize: "22px",
    marginBottom: "8px",
  },
  "& .messageText": {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  "& .learnMoreBtn": {
    backgroundColor: "#F53756",
    textTransform: "none",
    fontWeight: "600",
    borderRadius: "8px",
    marginTop: "auto",
    width: "fit-content",
    color: "white",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
}));

export default function MessageWrapper() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/api/cms/message-cards")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      })
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) setCards(res.data);
      })
      .catch((err) => console.error("MessageWrapper fetch error:", err.message));
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetch("/api/cms/message-cards")
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const ct = r.headers.get("content-type");
            if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
            return r.json();
          })
          .then((res) => {
            if (res && res.success && Array.isArray(res.data)) setCards(res.data);
          })
          .catch((err) => console.error("MessageWrapper refetch error:", err.message));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <MessageWrapperStyle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {cards.map((teacher, idx) => (
            <Grid key={teacher.id ?? idx} size={{ xs: 12, md: 6 }}>
              <Link href={teacher.link} style={{ textDecoration: 'none' }}>
                <Box className="teacherCard">
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <img src={teacher.img} alt={teacher.title} className="principalImage" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                      <Typography variant="h5" className="redTitle">{teacher.title}</Typography>
                      <Typography className="messageText">{teacher.text}</Typography>
                      <Button variant="contained" className="learnMoreBtn" disableElevation>
                        Read More
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MessageWrapperStyle>
  );
}
