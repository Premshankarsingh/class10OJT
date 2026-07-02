"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled, Grid } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ParkIcon from '@mui/icons-material/Park';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeLayout from "../../layouts/HomeLayout/layout";
import COMMITTEES_DATA from "../../data/about-committees.json";

const DEFAULT_COMMITTEES_DATA = {
  smc: [],
  redCrossTechnical: [],
  ecoClubTechnical: [],
  redCrossGeneral: [],
  ecoClubGeneral: [],
};

const transformCommitteesData = (data) => {
  if (data && data.committees) {
    const c = data.committees;
    return {
      smc: c.smc?.members || [],
      redCrossTechnical: c.redCrossTechnical?.members || [],
      ecoClubTechnical: c.ecoClubTechnical?.members || [],
      redCrossGeneral: c.redCrossGeneral?.members || [],
      ecoClubGeneral: c.ecoClubGeneral?.members || [],
    };
  }
  if (Array.isArray(data) && data.length > 0) {
    return {
      smc: data.find(c => c.name === "School Management Committee")?.members || [],
      redCrossTechnical: data.find(c => c.name === "Red Cross (Technical)")?.members || [],
      ecoClubTechnical: data.find(c => c.name === "Eco Club (Technical)")?.members || [],
      redCrossGeneral: data.find(c => c.name === "Red Cross (General)")?.members || [],
      ecoClubGeneral: data.find(c => c.name === "Eco Club (General)")?.members || [],
    };
  }
  return DEFAULT_COMMITTEES_DATA;
};

const SectionWrapper = styled(Box)({
  padding: "120px 0 80px 0",
  backgroundColor: "#ffffff",
});

const CommitteeHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ accentColor }) => ({
  textAlign: "center",
  marginBottom: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .iconBox": {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: accentColor,
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
    backgroundColor: accentColor,
    margin: "0 auto",
    borderRadius: "10px"
  }
}));

const MemberCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})(({ borderColor }) => ({
  backgroundColor: "#fff",
  borderRadius: "14px",
  padding: "25px 20px",
  textAlign: "center",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  borderLeft: `4px solid ${borderColor}`,
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
    border: `3px solid ${borderColor}`,
    backgroundColor: "#f8f9fa"
  }
}));

const CommitteePage = () => {
  const [committeesData, setCommitteesData] = useState(DEFAULT_COMMITTEES_DATA);

  useEffect(() => {
    fetch("/api/cms/about-committees")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
      if (res.success && res.data) {
        const transformed = transformCommitteesData(res.data);
        const hasData = Object.values(transformed).some(arr => arr.length > 0);
        if (hasData) {
          setCommitteesData(transformed);
        } else {
          setCommitteesData(transformCommitteesData(COMMITTEES_DATA));
        }
      } else {
        setCommitteesData(transformCommitteesData(COMMITTEES_DATA));
      }
    }).catch(() => setCommitteesData(transformCommitteesData(COMMITTEES_DATA)));
  }, []);

  const CommitteeMember = committeesData;

  const sectionConfig = {
    smc: { 
      color: "#1a1a2e", 
      icon: <GroupsIcon />,
      name: "School Management Committee",
      showPhone: true
    },
    redCrossTechnical: { 
      color: "#c0392b", 
      icon: <HealthAndSafetyIcon />,
      name: "Red Cross (Technical)",
      showPhone: false
    },
    ecoClubTechnical: { 
      color: "#27ae60", 
      icon: <ParkIcon />,
      name: "Eco Club (Technical)",
      showPhone: false
    },
    redCrossGeneral: { 
      color: "#2980b9", 
      icon: <VolunteerActivismIcon />,
      name: "Red Cross (General)",
      showPhone: false
    },
    ecoClubGeneral: { 
      color: "#16a085", 
      icon: <ParkIcon />,
      name: "Eco Club (General)",
      showPhone: false
    },
  };

  const renderMembers = (members, color, showPhone = false) => {
    return (
      <Grid container spacing={3} rowGap={4} justifyContent="center">
        {members.map((member) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
            <MemberCard borderColor={color}>
              <Box className="imgBox">
                <img src={member.photo || "/images/principal.png"} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e" }}>
                {member.name}
              </Typography>
              <Typography sx={{ color: color, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mt: 0.5, mb: 1 }}>
                {member.position}
              </Typography>
              
              {showPhone && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, pt: 1, borderTop: "1px solid #eee" }}>
                  <PhoneIcon sx={{ fontSize: "0.9rem", color: "#636e72" }} />
                  <Typography sx={{ fontSize: "0.85rem", color: "#636e72", fontWeight: 500 }}>
                    {member.phone}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: "0.8rem", color: "#999" }} />
                <Typography sx={{ fontSize: "0.75rem", color: "#999" }}>
                  {member.address}
                </Typography>
              </Box>
            </MemberCard>
          </Grid>
          
        ))}
      </Grid>
    );
  };

  return (
    <HomeLayout>
      <Box>
      <SectionWrapper>
        <Container maxWidth="lg">
          <CommitteeHeader accentColor={sectionConfig.smc.color}>
            <Box className="iconBox">{sectionConfig.smc.icon}</Box>
            <Typography variant="h2">{sectionConfig.smc.name}</Typography>
            <Box className="line" />
          </CommitteeHeader>
          {renderMembers(CommitteeMember.smc, sectionConfig.smc.color, sectionConfig.smc.showPhone)}
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container maxWidth="lg">
          <CommitteeHeader accentColor={sectionConfig.redCrossTechnical.color}>
            <Box className="iconBox">{sectionConfig.redCrossTechnical.icon}</Box>
            <Typography variant="h2">{sectionConfig.redCrossTechnical.name}</Typography>
            <Box className="line" />
          </CommitteeHeader>
          {renderMembers(CommitteeMember.redCrossTechnical, sectionConfig.redCrossTechnical.color, sectionConfig.redCrossTechnical.showPhone)}
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container maxWidth="lg">
          <CommitteeHeader accentColor={sectionConfig.ecoClubTechnical.color}>
            <Box className="iconBox">{sectionConfig.ecoClubTechnical.icon}</Box>
            <Typography variant="h2">{sectionConfig.ecoClubTechnical.name}</Typography>
            <Box className="line" />
          </CommitteeHeader>
          {renderMembers(CommitteeMember.ecoClubTechnical, sectionConfig.ecoClubTechnical.color, sectionConfig.ecoClubTechnical.showPhone)}
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container maxWidth="lg">
          <CommitteeHeader accentColor={sectionConfig.redCrossGeneral.color}>
            <Box className="iconBox">{sectionConfig.redCrossGeneral.icon}</Box>
            <Typography variant="h2">{sectionConfig.redCrossGeneral.name}</Typography>
            <Box className="line" />
          </CommitteeHeader>
          {renderMembers(CommitteeMember.redCrossGeneral, sectionConfig.redCrossGeneral.color, sectionConfig.redCrossGeneral.showPhone)}
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container maxWidth="lg">
          <CommitteeHeader accentColor={sectionConfig.ecoClubGeneral.color}>
            <Box className="iconBox">{sectionConfig.ecoClubGeneral.icon}</Box>
            <Typography variant="h2">{sectionConfig.ecoClubGeneral.name}</Typography>
            <Box className="line" />
          </CommitteeHeader>
          {renderMembers(CommitteeMember.ecoClubGeneral, sectionConfig.ecoClubGeneral.color, sectionConfig.ecoClubGeneral.showPhone)}
        </Container>
      </SectionWrapper>
    </Box>
    </HomeLayout>
  );
};

export default CommitteePage;