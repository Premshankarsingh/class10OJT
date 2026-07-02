"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, styled, Grid, Avatar, TextField, MenuItem, Button } from "@mui/material";
import { MailOutline, PhoneInTalk, LocationOn } from "@mui/icons-material";

const PageWrapper = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "80px 0",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
  "& .main-title": {
    fontFamily: "'Playfair Display', serif",
    fontSize: "3rem",
    fontWeight: "900",
    color: "#2D3436",
    textTransform: "uppercase",
    letterSpacing: "5px",
    margin: 0,
  },
  "& .subtitle": {
    fontFamily: "'Dancing Script', cursive, serif",
    fontSize: "1.2rem",
    color: "#F43755",
    marginTop: "20px",
  }
});

const StaffCard = styled(Box)({
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  height: "100%",
  "& .staff-info": { display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" },
  "& .contact-row": { display: "flex", alignItems: "center", gap: "10px", color: "#4a4a4a", fontSize: "0.95rem", marginBottom: "8px" },
  "& svg": { color: "#1A56FF", fontSize: "1.1rem" }
});

const FormCard = styled(Box)({
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.03)",
  height: "100%",
});

const ContactDetailRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  gap: "20px",
  "& .icon-box": {
    backgroundColor: "#003060",
    color: "#fff",
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .label": { fontWeight: "800", color: "#003060", fontSize: "1.1rem" },
  "& .value": { color: "#636e72", fontSize: "0.9rem" }
});

const MapCard = styled(Box)({
  borderRadius: "12px",
  overflow: "hidden",
  height: "320px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  position: "relative",
  "& .map-header-text": {
    padding: "10px 15px",
    color: "#2D3436",
    fontWeight: "700",
    fontSize: "1rem",
    borderBottom: "1px solid #eee"
  }
});

const ContactPage = () => {
  const [data, setData] = useState({
    title: "Contact Us",
    subtitle: "",
    staffMembers: [],
    contactInfo: {},
    locations: [],
  });

  useEffect(() => {
    fetch("/api/cms/contact")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setData(json.data);
      })
      .catch(() => {});
  }, []);

  const ci = data.contactInfo || {};

  return (
    <PageWrapper>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Playfair+Display:wght@900&display=swap');`}
      </style>

      <Container maxWidth="lg">
        <SectionHeader>
          <Typography className="main-title">{data.title}</Typography>
          <Typography className="subtitle">{data.subtitle}</Typography>
        </SectionHeader>

        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4}>
            {(data.staffMembers || []).map((staff, index) => (
              <Grid item={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <StaffCard>
                  <Box className="staff-info">
                    <Avatar sx={{ bgcolor: "#E3F2FD", color: "#1A56FF", width: 50, height: 50 }}>
                      <PhoneInTalk sx={{ fontSize: "1.2rem" }} />
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>{staff.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{staff.role}</Typography>
                    </Box>
                  </Box>
                  {staff.email && <Box className="contact-row"><MailOutline /> {staff.email}</Box>}
                  {staff.phone && <Box className="contact-row"><PhoneInTalk /> {staff.phone}</Box>}
                </StaffCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#003060", letterSpacing: 1 }}>
            {ci.header || "GET IN TOUCH"}
          </Typography>
          <Typography sx={{ color: "#636e72", mt: 1 }}>{ci.subtitle}</Typography>
          <Box sx={{ width: "80px", height: "4px", backgroundColor: "#F1C40F", margin: "15px auto" }} />
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 6, sm: 6, md: 5 }}>
            <FormCard>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#003060", mb: 1 }}>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ color: "#636e72", mb: 4 }}>
                Feel free to reach out through any of these channels
              </Typography>

              {ci.address && (
                <ContactDetailRow>
                  <Box className="icon-box"><LocationOn fontSize="small" /></Box>
                  <Box>
                    <Typography className="label">Address</Typography>
                    <Typography className="value">{ci.address}</Typography>
                  </Box>
                </ContactDetailRow>
              )}

              {ci.phone && (
                <ContactDetailRow>
                  <Box className="icon-box"><PhoneInTalk fontSize="small" /></Box>
                  <Box>
                    <Typography className="label">Phone</Typography>
                    <Typography className="value">{ci.phone}</Typography>
                  </Box>
                </ContactDetailRow>
              )}

              {ci.email && (
                <ContactDetailRow>
                  <Box className="icon-box"><MailOutline fontSize="small" /></Box>
                  <Box>
                    <Typography className="label">Email</Typography>
                    <Typography className="value">{ci.email}</Typography>
                  </Box>
                </ContactDetailRow>
              )}
            </FormCard>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 7 }}>
            <FormCard>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#003060", mb: 1 }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: "#636e72", mb: 4 }}>
                Fill out the form below and well get back to you shortly
              </Typography>

              <Grid container spacing={3} alignItems="flex-end">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Full Name <span style={{ color: 'red' }}>*</span></Typography>
                  <TextField fullWidth placeholder="John Doe" variant="outlined" sx={{ bgcolor: "#f8f9fa" }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Email Address <span style={{ color: 'red' }}>*</span></Typography>
                  <TextField fullWidth placeholder="john@example.com" variant="outlined" sx={{ bgcolor: "#f8f9fa" }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Phone Number</Typography>
                  <TextField fullWidth placeholder="+977-XXX-XXX-XXX" variant="outlined" sx={{ bgcolor: "#f8f9fa" }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Subject <span style={{ color: 'red' }}>*</span></Typography>
                  <TextField fullWidth select defaultValue="" variant="outlined" sx={{ bgcolor: "#f8f9fa" }}>
                    <MenuItem value="">Select a subject</MenuItem>
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="admission">Admission</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Message <span style={{ color: 'red' }}>*</span></Typography>
                  <TextField fullWidth multiline rows={4} placeholder="Write your message here..." variant="outlined" sx={{ bgcolor: "#f8f9fa" }} />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#003060",
                      height: "40px",
                      width: "120px",
                      fontWeight: 700,
                      borderRadius: "12px",
                      marginLeft: "50px",
                      marginBottom: "45px"
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
        </Grid>

        {(data.locations?.length > 0) && (
          <Box sx={{ maxWidth: "1100px", margin: "0 auto", marginTop: "80px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, justifyContent: "center" }}>
              <Avatar sx={{ bgcolor: "#F43755" }}><LocationOn /></Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>Our Locations</Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
              {data.locations.map((loc, i) => (
                <Grid item={{ xs: 12, md: 6 }} key={i}>
                  <MapCard>
                    <Typography className="map-header-text">{loc.title}</Typography>
                    <iframe src={loc.mapUrl || "about:blank"} width="100%" height="100%" style={{ border: 0 }}></iframe>
                  </MapCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </PageWrapper>
  );
};

export default ContactPage;
