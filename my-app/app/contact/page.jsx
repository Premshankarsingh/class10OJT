
"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid, Avatar, TextField, MenuItem, Button } from "@mui/material";
import { MailOutline, PhoneInTalk, LocationOn } from "@mui/icons-material";
import HomeLayout from "../layouts/HomeLayout/layout";

const DEFAULT_CONTACT_DATA = { staffMembers: [], contactInfo: {}, locations: [] };

const FALLBACK_DATA = {
  "staffMembers": [
    { "name": "Dr. Sarah Johnson", "role": "Principal", "email": "principal@school.edu", "phone": "+1 (555) 123-4567" },
    { "name": "Mr. Michael Chen", "role": "Academic Coordinator", "email": "m.chen@school.edu", "phone": "+1 (555) 234-5678" },
    { "name": "Ms. Emily Rodriguez", "role": "Activities Incharge", "email": "e.rodriguez@school.edu", "phone": "+1 (555) 345-6789" }
  ],
  "contactInfo": {
    "header": "Get In Touch",
    "subtitle": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "address": "Damak-9, Itabhatta, Jhapa, Nepal",
    "phone": "023-570620\n985-267-5320",
    "email": "info@school.edu.np"
  },
  "locations": [
    { "title": "Main Campus - Downtown Branch", "mapUrl": "about:blank" },
    { "title": "Secondary Campus - Riverside Branch", "mapUrl": "about:blank" }
  ]
};

const PageWrapper = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
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

// STYLED COMPONENTS FOR THE NEW "GET IN TOUCH" SECTION
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

const normalizeContactData = (d) => ({
  staffMembers: d.staffMembers || d.staff_members || [],
  contactInfo: d.contactInfo || d.contact_info || {},
  locations: d.locations || [],
  title: d.title || "Contact Us",
  subtitle: d.subtitle || "",
});

const Contact = () => {
  const [contactData, setContactData] = useState(normalizeContactData(DEFAULT_CONTACT_DATA));
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    fetch("/api/cms/contact")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
        if (res && res.success && res.data) setContactData(normalizeContactData(res.data));
        else setContactData(normalizeContactData(FALLBACK_DATA));
      }).catch((err) => {
        console.error("Contact fetch error:", err.message);
        setContactData(normalizeContactData(FALLBACK_DATA));
      });
  }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setSubmitStatus("validation");
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);
    setServerError("");
    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setServerError(json.error || "Unknown server error");
        setSubmitStatus("server");
      }
    } catch (err) {
      setServerError(err.message || "Network error");
      setSubmitStatus("server");
    } finally {
      setSubmitting(false);
    }
  };

  const staffMembers = contactData.staffMembers || [];
  const info = contactData.contactInfo || {};

  return (
    <HomeLayout>
      <PageWrapper>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Playfair+Display:wght@900&display=swap');`}
      </style>

      <Container maxWidth="lg">
        {/* 1. SECTION: MAIN HEADER */}
        <SectionHeader>
          <Typography className="main-title">Contact Us</Typography>
          <Typography className="subtitle">Reach out to our dedicated team members for any assistance</Typography>
        </SectionHeader>

        {/* 2. SECTION: STAFF CARDS */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4}>
            {staffMembers.map((staff, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                  <Box className="contact-row"><MailOutline /> {staff.email}</Box>
                  <Box className="contact-row"><PhoneInTalk /> {staff.phone}</Box>
                </StaffCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        
        {/* HEADER SECTION WITH YELLOW UNDERLINE */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#003060", letterSpacing: 1 }}>
            GET IN TOUCH
          </Typography>
          <Typography sx={{ color: "#636e72", mt: 1 }}>
            {info.subtitle || "We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible."}
          </Typography>
          {/* The Yellow Underline from your pic */}
          <Box sx={{ width: "80px", height: "4px", backgroundColor: "#F1C40F", margin: "15px auto" }} />
        </Box>

        {/* SIDE-BY-SIDE GRID: Exactly like the reference image */}
        <Grid container spacing={4} alignItems="stretch">
          
          {/* LEFT SIDE: Contact Information */}
         < Grid size={{ xs: 6, sm: 6, md: 5 }}>
            <FormCard>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#003060", mb: 1 }}>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ color: "#636e72", mb: 4 }}>
                Feel free to reach out through any of these channels
              </Typography>

              <ContactDetailRow>
                <Box className="icon-box"><LocationOn fontSize="small" /></Box>
                <Box>
                  <Typography className="label">Address</Typography>
                  <Typography className="value">{info.address || "Damak-9, Itabhatta, Jhapa, Nepal"}</Typography>
                </Box>
              </ContactDetailRow>

              <ContactDetailRow>
                <Box className="icon-box"><PhoneInTalk fontSize="small" /></Box>
                <Box>
                  <Typography className="label">Phone</Typography>
                  <Typography className="value">{info.phone || "023-570620"}</Typography>
                </Box>
              </ContactDetailRow>

              <ContactDetailRow>
                <Box className="icon-box"><MailOutline fontSize="small" /></Box>
                <Box>
                  <Typography className="label">Email</Typography>
                  <Typography className="value">{info.email || "info@school.edu.np"}</Typography>
                </Box>
              </ContactDetailRow>
            </FormCard>
          </Grid>
  
          {/* Right SIDE: Contact Information  Formcard*/}
<Grid size={{ xs: 6, sm: 6, md: 7 }}>
  <FormCard>
    <Typography variant="h5" sx={{ fontWeight: 900, color: "#003060", mb: 1 }}>
      Send Us a Message
    </Typography>
    <Typography variant="body2" sx={{ color: "#636e72", mb: 4 }}>
      Fill out the form below and we&apos;ll get back to you shortly
    </Typography>

    {submitStatus === "success" && (
      <Box sx={{ mb: 2, p: 2, bgcolor: "#d4edda", color: "#155724", borderRadius: "8px" }}>
        Message sent successfully! We&apos;ll get back to you shortly.
      </Box>
    )}
    {submitStatus === "validation" && (
      <Box sx={{ mb: 2, p: 2, bgcolor: "#f8d7da", color: "#721c24", borderRadius: "8px" }}>
        Please fill in all required fields and try again.
      </Box>
    )}
    {submitStatus === "server" && (
      <Box sx={{ mb: 2, p: 2, bgcolor: "#f8d7da", color: "#721c24", borderRadius: "8px" }}>
        <strong>Server error:</strong> {serverError}
      </Box>
    )}
    <Grid container spacing={3} alignItems="flex-end">
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Full Name <span style={{ color: 'red' }}>*</span></Typography>
        <TextField fullWidth placeholder="John Doe" variant="outlined" value={form.name} onChange={handleChange("name")} sx={{ bgcolor: "#f8f9fa" }} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Email Address <span style={{ color: 'red' }}>*</span></Typography>
        <TextField fullWidth placeholder="john@example.com" variant="outlined" value={form.email} onChange={handleChange("email")} sx={{ bgcolor: "#f8f9fa" }} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Phone Number</Typography>
        <TextField fullWidth placeholder="+977-XXX-XXX-XXX" variant="outlined" value={form.phone} onChange={handleChange("phone")} sx={{ bgcolor: "#f8f9fa" }} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Subject <span style={{ color: 'red' }}>*</span></Typography>
        <TextField fullWidth select value={form.subject} onChange={handleChange("subject")} variant="outlined" sx={{ bgcolor: "#f8f9fa" }}>
          <MenuItem value="">Select a subject</MenuItem>
          <MenuItem value="general">General Inquiry</MenuItem>
          <MenuItem value="admission">Admission</MenuItem>
        </TextField>
      </Grid>
      
      <Grid size={{ xs: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Message <span style={{ color: 'red' }}>*</span></Typography>
        <TextField fullWidth multiline rows={4} placeholder="Write your message here..." variant="outlined" value={form.message} onChange={handleChange("message")} sx={{ bgcolor: "#f8f9fa" }} />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Button 
          variant="contained" 
          fullWidth 
          disabled={submitting}
          onClick={handleSubmit}
          sx={{ 
            bgcolor: "#003060", 
            height: "40px",
            width:"120px",
            fontWeight: 700,
            borderRadius: "12px",
            marginLeft:"50px",
            marginBottom:"45px"
          }}
        >
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </Grid>
    </Grid>
  </FormCard>
</Grid>
   </Grid>







<Box sx={{ maxWidth: "1100px", margin: "0 auto",  marginTop:"80px"}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, justifyContent: "center" }}>
            <Avatar sx={{ bgcolor: "#F43755" }}><LocationOn /></Avatar>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Our Locations</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {(contactData.locations || []).map((loc, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <MapCard>
                  <Typography className="map-header-text">{loc.title}</Typography>
                  <iframe src={loc.mapUrl || "about:blank"} width="100%" height="100%" style={{ border: 0 }}></iframe>
                </MapCard>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ backgroundColor: "#f4f8fb", py: 10 }}>
      <Container maxWidth="lg">
      </Container>
    </Box>
    
      </Container>
    </PageWrapper>
    </HomeLayout>
  );
};

export default Contact;