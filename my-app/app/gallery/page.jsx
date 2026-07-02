// "use client";
// import React from "react";
// import { Box, Container, Typography, styled, Grid } from "@mui/material";
// import HomeLayout from "../layouts/HomeLayout/layout";
// import Link from "next/link";

// const PageWrapper = styled(Box)({
//   backgroundColor: "#f4f8fb",
//   padding: "120px 0 80px 0",
//   minHeight: "100vh",
// });

// const GalleryHeader = styled(Box)({
//   textAlign: "center",
//   marginBottom: "50px",
//   "& h2": {
//     fontSize: "2.2rem",
//     fontWeight: "800",
//     color: "#2D3436",
//     letterSpacing: "2px",
//     margin: 0,
//   },
// });

// const PhotoCard = styled(Box)({
//   position: "relative",
//   borderRadius: "12px",
//   overflow: "hidden",
//   height: "200px",
//   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
//   "& img": {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//   },
// });

// const galleryItems = Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   title: `Photo ${i + 1}`,
// }));

// export default function GalleryPage() {
//   return (
//     <HomeLayout>
//       <PageWrapper>
//         <Container maxWidth="lg">
//           <GalleryHeader>
//             <Typography variant="h2">Gallery</Typography>
//           </GalleryHeader>

//           <Grid container spacing={3}>
//             {galleryItems.map((item) => (
//               <Grid item xs={6} sm={4} md={3} key={item.id}>
//                 <PhotoCard>
//                                       <img src={item.img} alt={item.title} />
//                 </PhotoCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </PageWrapper>
//     </HomeLayout>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import HomeLayout from "../layouts/HomeLayout/layout";
import GALLERY_DATA from "../data/gallery.json";

const DEFAULT_GALLERY_DATA = [];

const GallerySection = styled(Box)({
  backgroundColor: "#f4f8fb", 
  padding: "120px 0 80px 0",
});

const GalleryHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "50px",
  "& h2": {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#2D3436",
    letterSpacing: "2px",
    margin: 0,
  },
  "& .subtitle": {
    fontFamily: "'Dancing Script', cursive, serif", 
    fontSize: "1.2rem",
    color: "#F43755",
    marginTop: "5px",
  }
});

const PhotoCard = styled(Box)({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
  height: "220px", 
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
    "& .overlay": {
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    "& a": {
      color: "#87CEEB", 
    }
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    transition: "background-color 0.3s ease",
    paddingBottom: "20px",
    "& span": {
      textDecoration: "none",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "capitalize",
      textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
    },
  },
  "&:hover .overlay span": {
    color: "#87CEEB",
    textDecoration: "underline",
  }
});



const SchoolGallery = () => {
  const [galleryData, setGalleryData] = useState(DEFAULT_GALLERY_DATA);

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Not JSON");
        return r.json();
      }).then((res) => {
      if (res.success && res.data) {
        const categories = Array.isArray(res.data) ? res.data : res.data.categories || [];
        if (categories.length > 0) {
          setGalleryData(categories);
        } else {
          setGalleryData(GALLERY_DATA.categories);
        }
      } else {
        setGalleryData(GALLERY_DATA.categories);
      }
    }).catch(() => setGalleryData(GALLERY_DATA.categories));
  }, []);

  return (
    <HomeLayout>
      <GallerySection>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');`}
        </style>

        <Container maxWidth="lg">
          <GalleryHeader>
            <Typography variant="h2">GALLERY</Typography>
            <Typography className="subtitle">
              Creating Memories At Saraswati Secondary School
            </Typography>
          </GalleryHeader>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
              gap: "40px",
            }}
          >
            {galleryData.map((item) => (
              <Link key={item.id} href={item.link} style={{ textDecoration: 'none' }}>
                <PhotoCard>
                  <img src={item.img} alt={item.title} />
                  <Box className="overlay">
                    <span>{item.title}</span>
                  </Box>
                </PhotoCard>
              </Link>
            ))}
          </Box>
        </Container>
      </GallerySection>
    </HomeLayout>
  );
};

export default SchoolGallery;
