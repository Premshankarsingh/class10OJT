"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, styled } from "@mui/material";

const Overlay = styled(Box)({
  position: "fixed",
  top: 0, left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  zIndex: 99999,
  display: "flex",
  flexDirection: "column",
});

const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  flexShrink: 0,
  zIndex: 10,
});

const ImageArea = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 0,
});

const StyledImage = styled("img")({
  maxWidth: "80vw",
  maxHeight: "60vh",
  objectFit: "contain",
});

const Counter = styled(Typography)({
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
});

const SwipeArea = styled(Box)({
  position: "absolute",
  top: 0, bottom: 0,
  width: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 5,
  "& svg": { fontSize: "50px", color: "#fff", opacity: 0.7 },
  "&:hover svg": { opacity: 1 },
});

const Filmstrip = styled(Box)({
  display: "flex",
  gap: "8px",
  padding: "12px 20px 16px",
  overflow: "auto hidden",
  flexShrink: 0,
  justifyContent: "center",
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": { height: "6px" },
  "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.1)", borderRadius: "3px" },
  "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.3)", borderRadius: "3px" },
});

const Thumb = styled(Box)(({ active }) => ({
  width: "60px",
  height: "45px",
  borderRadius: "4px",
  overflow: "hidden",
  cursor: "pointer",
  border: active ? "2px solid #F43755" : "2px solid transparent",
  opacity: active ? 1 : 0.5,
  flexShrink: 0,
  transition: "all 0.2s ease",
  "&:hover": { opacity: 1, borderColor: active ? "#F43755" : "rgba(255,255,255,0.5)" },
  "& img": { width: "100%", height: "100%", objectFit: "cover" },
}));

const Lightbox = ({ photo, currentIndex, totalPhotos, onClose, onPrev, onNext, photos }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const filmstripRef = useRef(null);

  const scrollToActive = useCallback(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const thumb = el.children[currentIndex];
    if (thumb) {
      el.scrollTo({ left: thumb.offsetLeft - el.offsetWidth / 2 + thumb.offsetWidth / 2, behavior: "smooth" });
    }
  }, [currentIndex]);

  useEffect(() => { scrollToActive(); }, [currentIndex, scrollToActive]);

  useEffect(() => {
    const timer = setInterval(() => onNext(), 5000);
    return () => clearInterval(timer);
  }, [onNext]);

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = photo.alt || `photo-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const d = touchStart - touchEnd;
    if (d > 50) onNext();
    else if (d < -50) onPrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") onPrev();
    else if (e.key === "ArrowRight") onNext();
    else if (e.key === "Escape") onClose();
  }, [onPrev, onNext, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const displayPhotos = photos && photos.length > 0 ? photos : null;

  return (
    <Overlay onClick={onClose} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <TopBar onClick={(e) => e.stopPropagation()}>
        <Counter>{currentIndex + 1} / {totalPhotos}</Counter>
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Box
            onClick={handleDownload}
            sx={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer",
              backgroundColor: "#4CAF50", padding: "10px 22px", borderRadius: "8px",
              "&:hover": { backgroundColor: "#388E3C" },
              "& svg": { fontSize: "20px" },
            }}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M376 160H272v153.37l52.69-52.68a16 16 0 0122.62 22.62l-80 80a16 16 0 01-22.62 0l-80-80a16 16 0 0122.62-22.62L240 313.37V160H136a56.06 56.06 0 00-56 56v208a56.06 56.06 0 0056 56h240a56.06 56.06 0 0056-56V216a56.06 56.06 0 00-56-56zM272 48a16 16 0 00-32 0v112h32z"></path></svg>
            Download
          </Box>
          <Box
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            sx={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer",
              backgroundColor: "#F43755", padding: "10px 22px", borderRadius: "8px",
              "&:hover": { backgroundColor: "#d32f2f" },
              "& svg": { fontSize: "20px" },
            }}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
            Exit
          </Box>
        </Box>
      </TopBar>

      <ImageArea onClick={(e) => e.stopPropagation()}>
        <SwipeArea sx={{ left: 0 }} onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.4-33.9 0L167 239c-9.4 9.4-9.4 24.6 0 33.9L311 417c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
        </SwipeArea>

        <StyledImage src={photo.src} alt={photo.alt} />

        <SwipeArea sx={{ right: 0 }} onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L201 417c-9.4 9.4-24.6 9.4-33.9 0-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
        </SwipeArea>
      </ImageArea>

      <Filmstrip ref={filmstripRef} onClick={(e) => e.stopPropagation()}>
        {(displayPhotos || Array.from({ length: totalPhotos }, (_, i) => ({ src: i === currentIndex ? photo.src : "", alt: "" }))).map((p, i) => (
          <Thumb
            key={i}
            active={i === currentIndex}
            onClick={(e) => { e.stopPropagation(); if (i > currentIndex) onNext(); else onPrev(); }}
          >
            <img src={displayPhotos ? displayPhotos[i].src : photo.src} alt={displayPhotos ? displayPhotos[i].alt : `Photo ${i + 1}`} />
          </Thumb>
        ))}
      </Filmstrip>
    </Overlay>
  );
};

export default Lightbox;
