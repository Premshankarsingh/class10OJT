"use client";
import { Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Banner = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#fff",
  paddingTop: "125px",
  "& .heroSlider": {
    maxWidth: "1000px",
    width: "800px",
    height: "400px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    "& img": {
      minWidth: "100%",
      height: "100%",
      objectFit: "cover",
      flexShrink: 0,
      scrollSnapAlign: "center",
    },
  },
}));

const HeroBanner = () => {
  const sliderRef = useRef(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("/api/cms/home-banner")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      })
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) setSlides(res.data);
      })
      .catch((err) => console.error("Banner fetch error:", err.message));
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetch("/api/cms/home-banner")
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const ct = r.headers.get("content-type");
            if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
            return r.json();
          })
          .then((res) => {
            if (res && res.success && Array.isArray(res.data)) setSlides(res.data);
          })
          .catch((err) => console.error("Banner refetch error:", err.message));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollInterval = setInterval(() => {
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(scrollInterval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <Banner>
        <Box className="heroSlider">
          <img src="/images/slider1.png" alt="Default Slide" />
        </Box>
      </Banner>
    );
  }

  return (
    <Banner>
      <Box className="heroSlider" ref={sliderRef}>
        {slides.map((slide) => (
          <img key={slide._id || slide.src} src={slide.src} alt={slide.alt || ""} />
        ))}
      </Box>
    </Banner>
  );
};

export default HeroBanner;
