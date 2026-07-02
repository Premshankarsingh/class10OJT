"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, styled, IconButton, Typography } from "@mui/material";
import { IoDownload, IoCloseOutline } from "react-icons/io5";
import HomeLayout from "../../layouts/HomeLayout/layout";
import Lightbox from "@/src/components/Lightbox";
import GALLERY_DATA from "../../data/gallery.json";

const GallerySection = styled(Box)({
  backgroundColor: "#f4f8fb",
  padding: "140px 0 80px 0",
  minHeight: "100vh",
});

const BackArrow = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: "20px",
  "&:hover .back-icon": {
    transform: "translateX(-3px)",
    color: "#F43755",
  },
});

const BackIcon = styled("span")({
  fontSize: "28px",
  color: "#2D3436",
  fontWeight: "bold",
  transition: "transform 0.2s ease, color 0.2s ease",
  lineHeight: 1,
});

const GridWrapper = styled(Box)({
  maxWidth: "1600px",
  margin: "0 auto",
  padding: "40px 80px 0 80px",
});

const PhotoGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "28px",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
  },
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },
});

const PhotoCard = styled(Box)({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  height: "180px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const PhotoActionButton = styled(IconButton)({
  color: "#fff",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  width: 30,
  height: 30,
  padding: 0,
  "&:hover": {
    backgroundColor: "rgba(244, 55, 85, 0.7)",
  },
  "& svg": {
    fontSize: "16px",
  },
});

const categoryNames = {
  "science": "Science Exhibition",
  "tour": "Tour & Picnic",
  "volleyball": "Volleyball Competition",
  "computer-lab": "Computer Lab",
  "library": "Library Study",
  "sports": "Annual Sports Day",
  "cultural": "Cultural Program",
  "assembly": "Morning Assembly",
  "art": "Art Competition",
};

export default function CategoryGalleryPage({ params }) {
  const resolvedParams = React.use(params);
  const category = resolvedParams.category;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(categoryNames[category] || category);
  const [router] = useState(() => (typeof window !== "undefined" ? window.history : null));

  function extractPhotos(source) {
    const cats = Array.isArray(source) ? source : source?.categories || [];
    const found = cats.find(c => {
      const slug = c.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return slug === category || c.link?.includes(category);
    });
    if (found && found.photos?.length > 0) {
      setCategoryTitle(found.title);
      setPhotos(found.photos.map((p, i) => ({
        id: i,
        src: p.src || p.url || p.image,
        alt: p.alt || p.caption || `${found.title} - Photo ${i + 1}`,
      })));
      return true;
    }
    return false;
  }

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }).then((res) => {
        if (res.success && res.data) {
          if (!extractPhotos(res.data)) {
            extractPhotos(GALLERY_DATA);
          }
        } else {
          extractPhotos(GALLERY_DATA);
        }
      }).catch((err) => {
        console.error("Gallery category fetch error, using fallback:", err.message);
        extractPhotos(GALLERY_DATA);
      });
  }, [category]);

  const handlePhotoClick = (index, e) => {
    if (e.target.closest(".photo-actions")) return;
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleGoBack = () => {
    if (router) router.back();
  };

  const handleCloseLightbox = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = (photo, e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = photo.alt || `photo-${photo.id + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HomeLayout>
      <GallerySection>
        <Container maxWidth="xl">
          <BackArrow onClick={handleGoBack}>
            <BackIcon className="back-icon">←</BackIcon>
          </BackArrow>

          <Typography variant="h4" sx={{ textAlign: "center", mb: 6, fontWeight: 800 }}>
            {categoryTitle}
          </Typography>

          <GridWrapper>
            {photos.length > 0 ? (
              <PhotoGrid>
                {photos.map((photo, index) => (
                  <PhotoCard key={photo.id} onClick={(e) => handlePhotoClick(index, e)}>
                    <img src={photo.src} alt={photo.alt} />
                    <Box className="photo-actions" onClick={(e) => e.stopPropagation()}>
                      <PhotoActionButton onClick={(e) => handleDownload(photo, e)}>
                        <IoDownload />
                      </PhotoActionButton>
                      <PhotoActionButton onClick={handleGoBack}>
                        <IoCloseOutline />
                      </PhotoActionButton>
                    </Box>
                  </PhotoCard>
                ))}
              </PhotoGrid>
            ) : (
              <Typography sx={{ textAlign: "center", color: "#888", mt: 10 }}>
                No photos available for this category.
              </Typography>
            )}
          </GridWrapper>
        </Container>

        {open && photos.length > 0 && (
          <Lightbox
            photo={photos[currentIndex]}
            currentIndex={currentIndex}
            totalPhotos={photos.length}
            photos={photos}
            onClose={handleCloseLightbox}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </GallerySection>
    </HomeLayout>
  );
}
