"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid, Avatar } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeLayout from "../layouts/HomeLayout/layout";
import STAFF_DATA from "../data/staff.json";

const PageWrapper = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
  minHeight: "100vh",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
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

const BranchHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})(({ bgColor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "40px",
  padding: "15px 30px",
  backgroundColor: bgColor,
  borderRadius: "50px",
  "& h3": { fontWeight: 800, fontSize: "1.5rem", color: "#fff", margin: 0 },
}));

const StaffCard = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "25px",
  textAlign: "center",
  boxShadow: "0px 6px 20px rgba(0,0,0,0.06)",
  transition: "transform 0.3s ease",
  height: "100%",
  "&:hover": { transform: "translateY(-8px)", boxShadow: "0px 12px 30px rgba(0,0,0,0.1)" },
  "& .avatarBox": {
    width: "100px", height: "100px", margin: "0 auto 15px auto", borderRadius: "50%", overflow: "hidden", border: "4px solid #F43755",
    "& img": { width: "100%", height: "100%", objectFit: "cover" },
  },
  "& .name": { fontWeight: 800, fontSize: "1.1rem", color: "#2D3436", marginBottom: "5px" },
  "& .subject": { color: "#F43755", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", marginBottom: "15px" },
});

const InfoRow = styled(Box)({
  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px",
  "& svg": { fontSize: "0.9rem", color: "#666" },
  "& span": { fontSize: "0.85rem", color: "#666" },
});

const renderStaff = (staffList) => (
  <Grid container spacing={4} justifyContent="center">
    {staffList.map((staff) => (
      <Grid key={staff.id} size={{ xs: 6, sm: 6, md: 3 }}>
        <StaffCard>
          <Box className="avatarBox">
            <img src={staff.photo || "/images/principal.png"} alt={staff.name} />
          </Box>
          <Typography className="name">{staff.name}</Typography>
          <Typography className="subject">{staff.subject}</Typography>
          <InfoRow><PhoneIcon /><span>{staff.phone}</span></InfoRow>
          <InfoRow><LocationOnIcon /><span>{staff.address}</span></InfoRow>
        </StaffCard>
      </Grid>
    ))}
  </Grid>
);

export default function StaffPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/cms/staff")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
      if (res.success && res.data) {
        const staffArray = res.data;
        const technicalBranch = staffArray.filter(m => m.branch === "technical");
        const generalBranch = staffArray.filter(m => m.branch === "general");
        if (technicalBranch.length > 0 || generalBranch.length > 0) {
          setData({
            title: "Our Staff",
            subtitle: "Dedicated Teachers of Saraswati Secondary School",
            technicalBranch: { label: "Technical Branch", bgColor: "#2C235A", members: technicalBranch },
            generalBranch: { label: "General Branch", bgColor: "#F43755", members: generalBranch },
          });
        } else {
          setData(STAFF_DATA);
        }
      } else {
        setData(STAFF_DATA);
      }
    }).catch(() => setData(STAFF_DATA));
  }, []);

  if (!data) return <HomeLayout><PageWrapper /></HomeLayout>;

  return (
    <HomeLayout>
      <PageWrapper>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:wght@900&display=swap');`}</style>
        <Container maxWidth="lg">
          <SectionHeader>
            <Typography variant="h2">{data.title}</Typography>
            <Typography className="subtitle">{data.subtitle}</Typography>
          </SectionHeader>
          <Box mb={8}>
            {data.technicalBranch && (
              <>
                <BranchHeader bgColor={data.technicalBranch.bgColor}>
                  <Typography variant="h3">{data.technicalBranch.label}</Typography>
                </BranchHeader>
                {renderStaff(data.technicalBranch.members)}
              </>
            )}
          </Box>
          <Box>
            {data.generalBranch && (
              <>
                <BranchHeader bgColor={data.generalBranch.bgColor}>
                  <Typography variant="h3">{data.generalBranch.label}</Typography>
                </BranchHeader>
                {renderStaff(data.generalBranch.members)}
              </>
            )}
          </Box>
        </Container>
      </PageWrapper>
    </HomeLayout>
  );
}
