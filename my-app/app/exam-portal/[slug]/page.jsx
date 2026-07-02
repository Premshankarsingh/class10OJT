"use client";
import React, { useState, useMemo } from "react";
import { Box, Container, Typography, styled, IconButton } from "@mui/material";
import HomeLayout from "../../layouts/HomeLayout/layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import Lightbox from "@/src/components/Lightbox";

const PageSection = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "120px 0 80px 0",
  minHeight: "100vh",
});

const PageHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
  "& h2": {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#2D3436",
    letterSpacing: "2px",
    margin: 0,
    textTransform: "uppercase",
  },
});

const SubjectGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "30px",
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 500px)": {
    gridTemplateColumns: "1fr",
  },
});

const SubjectCard = styled(Box)({
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    "& .subject-img": {
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
    },
  },
  "& .subject-img": {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
  },
  "& .subject-name": {
    textAlign: "center",
    marginTop: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2D3436",
  },
});



const examData = {
  "class-10-2081": {
    title: "Class 10 2081",
    subjects: [
      {
        name: "Science",
        img: "/images/Sciencee.png",
        papers: [
          { src: "/images/physics.png", alt: "Science - Model Set 1" },
          { src: "/images/chemistry.png", alt: "Science - Model Set 2" },
          { src: "/images/tech.png", alt: "Science - Model Set 3" },
          { src: "/images/Sciencee.png", alt: "Science - Model Set 4" },
          { src: "/images/physics.png", alt: "Science - Model Set 5" },
        ],
      },
      {
        name: "English",
        img: "/images/English.png",
        papers: [
          { src: "/images/principal.png", alt: "English - Model Set 1" },
          { src: "/images/English.png", alt: "English - Model Set 2" },
          { src: "/images/principal.png", alt: "English - Model Set 3" },
          { src: "/images/English.png", alt: "English - Model Set 4" },
        ],
      },
      {
        name: "Mathematics",
        img: "/images/Mathematics.png",
        papers: [
          { src: "/images/Mathematics.png", alt: "Mathematics - Model Set 1" },
          { src: "/images/Sciencee.png", alt: "Mathematics - Model Set 2" },
          { src: "/images/Mathematics.png", alt: "Mathematics - Model Set 3" },
        ],
      },
      {
        name: "Nepali",
        img: "/images/Nepali.png",
        papers: [
          { src: "/images/principal.png", alt: "Nepali - Model Set 1" },
          { src: "/images/Nepali.png", alt: "Nepali - Model Set 2" },
        ],
      },
    ],
  },
  "class-10-2082": {
    title: "Class 10 2082",
    subjects: [
      {
        name: "Science",
        img: "/images/Sciencee.png",
        papers: [
          { src: "/images/physics.png", alt: "Science 2082 - Set 1" },
          { src: "/images/chemistry.png", alt: "Science 2082 - Set 2" },
          { src: "/images/tech.png", alt: "Science 2082 - Set 3" },
        ],
      },
      {
        name: "English",
        img: "/images/English.png",
        papers: [
          { src: "/images/principal.png", alt: "English 2082 - Set 1" },
          { src: "/images/English.png", alt: "English 2082 - Set 2" },
        ],
      },
      {
        name: "Mathematics",
        img: "/images/Mathematics.png",
        papers: [
          { src: "/images/Mathematics.png", alt: "Mathematics 2082 - Set 1" },
          { src: "/images/Sciencee.png", alt: "Mathematics 2082 - Set 2" },
          { src: "/images/Mathematics.png", alt: "Mathematics 2082 - Set 3" },
          { src: "/images/physics.png", alt: "Mathematics 2082 - Set 4" },
        ],
      },
      {
        name: "Nepali",
        img: "/images/Nepali.png",
        papers: [
          { src: "/images/principal.png", alt: "Nepali 2082 - Set 1" },
          { src: "/images/Nepali.png", alt: "Nepali 2082 - Set 2" },
          { src: "/images/principal.png", alt: "Nepali 2082 - Set 3" },
        ],
      },
    ],
  },
  "class-12-2082": {
    title: "Class 12 2082",
    subjects: [
      {
        name: "Physics",
        img: "/images/physics.png",
        papers: [
          { src: "/images/physics.png", alt: "Physics 2082 - Set 1" },
          { src: "/images/tech.png", alt: "Physics 2082 - Set 2" },
          { src: "/images/physics.png", alt: "Physics 2082 - Set 3" },
          { src: "/images/tech.png", alt: "Physics 2082 - Set 4" },
        ],
      },
      {
        name: "Chemistry",
        img: "/images/chemistry.png",
        papers: [
          { src: "/images/chemistry.png", alt: "Chemistry 2082 - Set 1" },
          { src: "/images/Sciencee.png", alt: "Chemistry 2082 - Set 2" },
        ],
      },
      {
        name: "Biology",
        img: "/images/tech.png",
        papers: [
          { src: "/images/tech.png", alt: "Biology 2082 - Set 1" },
          { src: "/images/principal.png", alt: "Biology 2082 - Set 2" },
          { src: "/images/tech.png", alt: "Biology 2082 - Set 3" },
        ],
      },
      {
        name: "Mathematics",
        img: "/images/Mathematics.png",
        papers: [
          { src: "/images/Mathematics.png", alt: "Mathematics 2082 - Set 1" },
          { src: "/images/Sciencee.png", alt: "Mathematics 2082 - Set 2" },
          { src: "/images/Mathematics.png", alt: "Mathematics 2082 - Set 3" },
        ],
      },
    ],
  },
  "class-10-2083": {
    title: "Class 10 2083",
    subjects: [
      {
        name: "Science",
        img: "/images/Sciencee.png",
        papers: [
          { src: "/images/physics.png", alt: "Science 2083 - Set 1" },
          { src: "/images/chemistry.png", alt: "Science 2083 - Set 2" },
        ],
      },
      {
        name: "English",
        img: "/images/English.png",
        papers: [
          { src: "/images/principal.png", alt: "English 2083 - Set 1" },
          { src: "/images/English.png", alt: "English 2083 - Set 2" },
          { src: "/images/principal.png", alt: "English 2083 - Set 3" },
        ],
      },
      {
        name: "Mathematics",
        img: "/images/Mathematics.png",
        papers: [
          { src: "/images/Mathematics.png", alt: "Mathematics 2083 - Set 1" },
        ],
      },
      {
        name: "Nepali",
        img: "/images/Nepali.png",
        papers: [
          { src: "/images/principal.png", alt: "Nepali 2083 - Set 1" },
          { src: "/images/Nepali.png", alt: "Nepali 2083 - Set 2" },
        ],
      },
    ],
  },
  "class-10-2080": {
    title: "Class 10 2080",
    subjects: [
      { name: "Science", img: "/images/Sciencee.png", papers: [{ src: "/images/physics.png", alt: "Science 2080 - Set 1" }, { src: "/images/chemistry.png", alt: "Science 2080 - Set 2" }] },
      { name: "English", img: "/images/English.png", papers: [{ src: "/images/principal.png", alt: "English 2080 - Set 1" }, { src: "/images/English.png", alt: "English 2080 - Set 2" }, { src: "/images/principal.png", alt: "English 2080 - Set 3" }] },
      { name: "Mathematics", img: "/images/Mathematics.png", papers: [{ src: "/images/Mathematics.png", alt: "Mathematics 2080 - Set 1" }] },
      { name: "Nepali", img: "/images/Nepali.png", papers: [{ src: "/images/principal.png", alt: "Nepali 2080 - Set 1" }] },
    ],
  },
  "class-12-2080": {
    title: "Class 12 2080",
    subjects: [
      { name: "Physics", img: "/images/physics.png", papers: [{ src: "/images/physics.png", alt: "Physics 2080 - Set 1" }, { src: "/images/tech.png", alt: "Physics 2080 - Set 2" }] },
      { name: "Chemistry", img: "/images/chemistry.png", papers: [{ src: "/images/chemistry.png", alt: "Chemistry 2080 - Set 1" }] },
      { name: "Biology", img: "/images/tech.png", papers: [{ src: "/images/tech.png", alt: "Biology 2080 - Set 1" }, { src: "/images/principal.png", alt: "Biology 2080 - Set 2" }] },
      { name: "Mathematics", img: "/images/Mathematics.png", papers: [{ src: "/images/Mathematics.png", alt: "Mathematics 2080 - Set 1" }, { src: "/images/Sciencee.png", alt: "Mathematics 2080 - Set 2" }] },
    ],
  },
  "class-10-2079": {
    title: "Class 10 2079",
    subjects: [
      { name: "Science", img: "/images/Sciencee.png", papers: [{ src: "/images/physics.png", alt: "Science 2079 - Set 1" }, { src: "/images/chemistry.png", alt: "Science 2079 - Set 2" }] },
      { name: "English", img: "/images/English.png", papers: [{ src: "/images/principal.png", alt: "English 2079 - Set 1" }] },
      { name: "Mathematics", img: "/images/Mathematics.png", papers: [{ src: "/images/Mathematics.png", alt: "Mathematics 2079 - Set 1" }, { src: "/images/Sciencee.png", alt: "Mathematics 2079 - Set 2" }] },
      { name: "Nepali", img: "/images/Nepali.png", papers: [{ src: "/images/principal.png", alt: "Nepali 2079 - Set 1" }, { src: "/images/Nepali.png", alt: "Nepali 2079 - Set 2" }] },
    ],
  },
  "class-10-2078": {
    title: "Class 10 2078",
    subjects: [
      { name: "Science", img: "/images/Sciencee.png", papers: [{ src: "/images/physics.png", alt: "Science 2078 - Set 1" }] },
      { name: "English", img: "/images/English.png", papers: [{ src: "/images/principal.png", alt: "English 2078 - Set 1" }, { src: "/images/English.png", alt: "English 2078 - Set 2" }] },
      { name: "Mathematics", img: "/images/Mathematics.png", papers: [{ src: "/images/Mathematics.png", alt: "Mathematics 2078 - Set 1" }] },
      { name: "Nepali", img: "/images/Nepali.png", papers: [{ src: "/images/principal.png", alt: "Nepali 2078 - Set 1" }] },
    ],
  },
};

export default function ExamPortalDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPapers, setCurrentPapers] = useState([]);

  const data = useMemo(() =>
    slug && examData[slug] ? examData[slug] : { title: "Not Found", subjects: [] }
  , [slug]);

  const handleSubjectClick = (subjectIndex) => {
    const subject = data.subjects[subjectIndex];
    if (subject && subject.papers && subject.papers.length > 0) {
      const papers = subject.papers.map((p, i) => ({ src: p.src, alt: p.alt, id: i }));
      setCurrentPapers(papers);
      setCurrentIndex(0);
      setOpen(true);
    }
  };

  const handleCloseLightbox = () => {
    setOpen(false);
    setCurrentPapers([]);
  };

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? currentPapers.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === currentPapers.length - 1 ? 0 : prev + 1));

  return (
    <HomeLayout>
      <PageSection>
        <Container maxWidth="lg">
          <PageHeader>
            <Typography variant="h2">{data.title}</Typography>
          </PageHeader>

          <SubjectGrid>
            {data.subjects.map((subject, index) => (
              <SubjectCard key={index} onClick={() => handleSubjectClick(index)}>
                <img src={subject.img} alt={subject.name} className="subject-img" />
                <Typography className="subject-name">{subject.name}</Typography>
              </SubjectCard>
            ))}
          </SubjectGrid>
        </Container>
      </PageSection>

      {open && currentPapers.length > 0 && (
        <Lightbox
          photo={currentPapers[currentIndex]}
          currentIndex={currentIndex}
          totalPhotos={currentPapers.length}
          photos={currentPapers}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <IconButton
        onClick={() => router.push("/exam-portal")}
        sx={{
          position: "fixed",
          top: "140px",
          left: "20px",
          zIndex: 1000,
          color: "#2D3436",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          "&:hover": { backgroundColor: "#fff", transform: "scale(1.1)" },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </HomeLayout>
  );
}
