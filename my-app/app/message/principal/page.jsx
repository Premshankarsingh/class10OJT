"use client";
import { Box, Container, Typography, styled, Grid, Button, IconButton } from "@mui/material";
import HomeLayout from "../../layouts/HomeLayout/layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const DEFAULT_MESSAGE = {
  name: "Mr. Chhabilal Bhandari",
  photo: "/images/principal.png",
  message: "Welcome to Shree Saraswati Secondary School!",
  address: "Satyawati-6, Johang, Gulmi",
};

const PageWrapper = styled(Box)({
  padding: "120px 0 80px 0",
  backgroundColor: "#f4f8fb",
  minHeight: "100vh",
});

const MessageCard = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "40px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
});

const PrincipalImage = styled("img")({
  width: "200px",
  height: "250px",
  objectFit: "cover",
  borderRadius: "12px",
  border: "4px solid #F43755",
});

const MessageContent = styled(Typography)({
  color: "#4a4a4a",
  lineHeight: "1.8",
  fontSize: "1.05rem",
  textAlign: "justify",
});

export default function PrincipalMessage() {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  useEffect(() => {
    fetch("/api/cms/messages")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
        if (res && res.success && res.data?.principal) setMessage(res.data.principal);
      }).catch((err) => console.error("Principal message fetch error:", err.message));
  }, []);

  return (
    <HomeLayout>
      <Link href="/">
        <IconButton sx={{
          position: "fixed",
          top: "140px",
          left: "20px",
          zIndex: 1000,
          color: "#2D3436",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          "&:hover": { backgroundColor: "#fff", transform: "scale(1.1)" },
        }}>
          <ArrowBackIcon />
        </IconButton>
      </Link>

      <PageWrapper>
        <Container maxWidth="md">
          <MessageCard>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Box display="flex" justifyContent="center">
                  <PrincipalImage src={message.photo} alt="Principal" />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#F43755", mb: 1 }}>
                  Message from Principal
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#2D3436", mb: 3 }}>
                  {message.name}
                </Typography>
                <MessageContent>
                  {message.message.split('\n').map((paragraph, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <><br /><br /></>}
                      {paragraph}
                    </React.Fragment>
                  ))}
                </MessageContent>
                <Box mt={3}>
                  <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                    <strong>Address:</strong> {message.address}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MessageCard>
        </Container>
      </PageWrapper>
    </HomeLayout>
  );
}
