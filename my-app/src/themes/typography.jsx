export const themeOptions = {
  typography: {
    h1: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 50,
      color:"#404040",
      lineHeight: "52px",
      "@media(max-width:767px)": {
        fontSize: "30px !important",
        lineHeight: "40px",
      },
    },
    h2: {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: 30,
      color:"#404040",
      lineHeight: "50px",
      wordBreak: "break-word",
      textTransform: "uppercase", 
      "@media(max-width:767px)": {
        fontSize: "22px !important",
        lineHeight: "30px !important",
      },
    },
    h3: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "40px",
      color:"#404040",
      textTransform: "uppercase",
      "@media(max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    h4: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 20,
      color:"#404040",
      lineHeight: "30px",
      "@media(max-width:767px)": {
        fontSize: "16px !important",
      },
    },
    h5: {
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 18,
      color:"#404040",
      lineHeight: "23px",
      "@media(max-width:767px)": {
        fontSize: "14px !important",
      },
    },
    h6: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: 16,
      color:"#404040",
      lineHeight: "24px",
      "@media(max-width:767px)": {
        lineHeight: "22px",
        fontSize: "14px !important",
      },
    },
    body2: {
      fontFamily: "Inter",
      fontSize: 14,
      color:"#404040",
      fontWeight: 500,
      lineHeight: "25px",
      "@media(max-width:767px)": {
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    body1: {
      fontFamily: "Inter",
      fontWeight: 300,
      color:"#404040",
      lineHeight: "20px",
      fontSize: 12,
    },
    subText1: {
      fontFamily: "Inter",
      fontWeight: 400,
      color:"#404040",
      lineHeight: "20px",
      fontSize: 10,
    },
    subText2: {
      fontFamily: "Inter",
      fontWeight: 700,
      color:"#404040",
      lineHeight: "20px",
      fontSize: 11,
    },
  },
};
