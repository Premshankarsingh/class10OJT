export const themeOptions = {
  typography: {
    h1: {
      fontFamily: "'Vidaloka', serif",
      fontWeight: 500,
      fontSize: 45,
      lineHeight: "52px",
      "@media(max-width:767px)": {
        fontSize: "30px !important",
        lineHeight: "40px",
      },
    },
    h2: {
      fontFamily: "'Vidaloka', serif",
      fontWeight: 300,
      fontSize: 40,
      lineHeight: "50px",
      wordBreak: "break-word",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "25px !important",
        lineHeight: "30px !important",
      },
    },
    h3: {
      fontFamily: "'Vidaloka', serif",
      fontWeight: 600,
      fontSize: 30,
      lineHeight: "40px",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    h4: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 500,
      fontSize: 25,
      lineHeight: "30px",
      "@media(max-width:767px)": {
        fontSize: "16px !important",
      },
    },
    h5: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 400,
      fontSize: 22,
      lineHeight: "23px",
      "@media(max-width:767px)": {
        fontSize: "14px !important",
      },
    },
    h6: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "24px",
      "@media(max-width:767px)": {
        lineHeight: "22px",
        fontSize: "14px !important",
      },
    },
    body2: {
      fontFamily: "'Space Grotesk'",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "25px",
      "@media(max-width:767px)": {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    body1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 300,
      lineHeight: "20px",
      fontSize: 12,
    },
    subText1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 400,
      lineHeight: "20px",
      fontSize: 14,
    },
    subText2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      lineHeight: "20px",
      fontSize: 16,
      color: "#31CD7F",
    },
  },
};
