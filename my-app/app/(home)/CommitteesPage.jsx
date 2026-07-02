"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ParkIcon from '@mui/icons-material/Park';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const iconMap = {
  Groups: GroupsIcon,
  HealthAndSafety: HealthAndSafetyIcon,
  Park: ParkIcon,
  VolunteerActivism: VolunteerActivismIcon,
};

const SectionWrapper = styled(Box)({
  padding: "80px 0",
  backgroundColor: "#ffffff",
});

const CommitteeHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentcolor',
})(({ accentcolor }) => ({
  textAlign: "center",
  marginBottom: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .iconBox": {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: accentcolor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
    "& svg": {
      fontSize: "30px",
      color: "#fff"
    }
  },
  "& h2": {
    fontWeight: 900,
    textTransform: "uppercase",
    fontSize: "2.2rem",
    color: "#1a1a2e",
    marginBottom: "10px"
  },
  "& .line": {
    width: "70px",
    height: "5px",
    backgroundColor: accentcolor,
    margin: "0 auto",
    borderRadius: "10px"
  }
}));

const MemberCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bordercolor',
})(({ bordercolor }) => ({
  backgroundColor: "#fff",
  borderRadius: "14px",
  padding: "25px 20px",
  textAlign: "center",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  borderLeft: `4px solid ${bordercolor}`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  maxWidth: "300px",
  margin: "0 auto",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 8px 30px rgba(0,0,0,0.12)"
  },
  "& .imgBox": {
    width: "90px",
    height: "90px",
    margin: "0 auto 15px auto",
    borderRadius: "50%",
    overflow: "hidden",
    border: `3px solid ${bordercolor}`,
    backgroundColor: "#f8f9fa"
  }
}));

const renderMembers = (members, color, showPhone = false) => {
  return (
    <Grid container spacing={3} rowGap={4} justifyContent="center">
      {members.map((member) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
          <MemberCard bordercolor={color}>
            <Box className="imgBox">
              <img src={member.photo || "/images/principal.png"} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e" }}>
              {member.name}
            </Typography>
            <Typography sx={{ color: color, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mt: 0.5, mb: 1 }}>
              {member.position}
            </Typography>

            {showPhone && member.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, pt: 1, borderTop: "1px solid #eee" }}>
                <PhoneIcon sx={{ fontSize: "0.9rem", color: "#636e72" }} />
                <Typography sx={{ fontSize: "0.85rem", color: "#636e72", fontWeight: 500 }}>
                  {member.phone}
                </Typography>
              </Box>
            )}

            {member.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: "0.8rem", color: "#999" }} />
                <Typography sx={{ fontSize: "0.75rem", color: "#999" }}>
                  {member.address}
                </Typography>
              </Box>
            )}
          </MemberCard>
        </Grid>
      ))}
    </Grid>
  );
};

const CommitteePage = () => {
  const [committees, setCommittees] = useState({});

  useEffect(() => {
    fetch("/api/cms/about-committees")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data?.committees) {
          setCommittees(json.data.committees);
        }
      })
      .catch(() => {});
  }, []);

  const committeeKeys = Object.keys(committees);

  if (committeeKeys.length === 0) return null;

  return (
    <Box>
      {committeeKeys.map((key) => {
        const c = committees[key];
        const IconComponent = iconMap[c.icon] || GroupsIcon;

        return (
          <SectionWrapper key={key}>
            <Container maxWidth="lg">
              <CommitteeHeader accentcolor={c.color}>
                <Box className="iconBox"><IconComponent /></Box>
                <Typography variant="h2">{c.name}</Typography>
                <Box className="line" />
              </CommitteeHeader>
              {renderMembers(c.members || [], c.color, c.showPhone)}
            </Container>
          </SectionWrapper>
        );
      })}
    </Box>
  );
};

export default CommitteePage;
