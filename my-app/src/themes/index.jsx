import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeOptions } from "../themes/typography";
import { deepmerge } from "@mui/utils";

const baseOptions = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(122, 105, 254, 0.25) !important",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "rgb(255, 255, 255)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "400px",
          backgroundColor: "#140e2e !important",
          padding: "20px",
          background: "rgb(34 28 61)!important",
        },
        "& .MuiButtonBase": {
          borderRadius: "10px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          // borderRadius: "20px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          background: "rgba(217, 217, 217, 0.03) !important",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(217, 217, 217, 0.05)",
          },
          "&:last-child": {
            borderBottom: "none",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "rgba(0, 0, 0, 0.60)",
          // background: "rgba(0, 0, 0, 0.08)",
          padding: "10px",
          width: "40px",
          height: "40px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-selected": {
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            color: "rgba(0, 0, 0, 0.40)",
          },
          "&.Mui-selected:hover": {
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            color: "rgba(0, 0, 0, 0.40)",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        body: {
          color: "#000",
          whiteSpace: "pre",
          fontSize: "14px",
          fontWeight: "300",
          textAlign: "center",
        },
        root: {
          borderBottom: "transparent",
          color: "#000",
          fontSize: "14px",
          fontWeight: "300",
          borderBottom: "none",
        },
        head: {
          padding: "16px 16px",
          fontWeight: "300",
          background: "rgba(217, 217, 217, 0.10)",
          color: "rgba(255, 255, 255, 0.87)",
          whiteSpace: "pre",
          fontSize: "14px",
          textAlign: "center ",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#222" },
        colorSecondary: {
          "&.Mui-focused": {
            color: "#222",
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontSize: "22px",
          fontWeight: "600",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          position: "relative",
          fontSize: "14px",
          fontWeight: "300",
          color: "#fff",
          padding: "14px 14px",
          borderRadius: "10px",
        },
        root: {
          borderRadius: "10px",
          color: "#fff",
        },
        notchedOutline: {
          border: "1px solid rgba(255, 255, 255, 0.40) !important",
          "&:hover": {
            border: "1px solid #fff !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          padding: "20px",
          width: "100%",
        },
        elevation1: {
          border: "1px solid rgba(255, 255, 255, 0.04)",
          background: "#161032",
          borderRadius: "10px",
          padding: "20px",
        },
        elevation2: {
          border: "1px solid rgba(255, 255, 255, 0.04)",
          background: "rgba(69, 46, 84, 0.25)",
          borderRadius: "10px",
          padding: "20px",
        },
        elevation3: {
          background: "rgba(255, 255, 255, 0.40)",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          padding: "30px",
          boxShadow: "none",
          backdropFilter: "blur(20px)",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: "self-start",
        },
        gutters: {
          paddingLeft: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {},
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.40)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "4px",
          fontSize: "12px",
        },
        colorSecondary: {
          "&.Mui-checked": { color: "#000" },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          paddingBottom: "0",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          Width: 450,
          maxWidth: "100%",
        },
        paper: {
          border: "1px solid #2C235A",
          margin: "32px",
          position: "relative",
          background: "rgba(137, 113, 253, 0.10)",
          overflowY: "auto",
          backdropFilter: "blur(100px)",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px !important",
        },
        paperWidthSm: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 16,
          color: "#000",
          padding: "0px 0 0px",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "#fff",
          fontSize: "14px !important",
          fontWeight: "400",
          letterSpacing: "0px",
          textAlign: "left",
          background: "transparent",
          // height: "40px",
        },
        input: {
          width: "0",
          // minWidth: "30px",
          color: "rgba(255, 255, 255, 0.87)",
          fontSize: "12px !important",
          fontWeight: "400",
        },
      },
    },
    MuiButton: {
      root: {
        background: "red",
        textTransform: "capitalize",
      },
      styleOverrides: {
        outlinedSizeSmall: {
          padding: "7px 18px",
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: "500",
        },
        containedSecondary: {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          padding: "10px 30px",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "21px",
          color: "#ffffff",
          borderRadius: "50px",
          color: "#fff",
          border: "0.5px solid #F43755 !important",
          boxShadow: "none",
          background: "transparent",
          textTransform: "capitalize",
          "&:hover": {
            color: "#ffffff",
            background:
              "linear-gradient(165deg, #FF9AAB -64.52%, #F53756 61.26%)",
          },
        },
        containedPrimary: {
          color: "#fff",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          padding: "10px 30px",
          border: "0.5px solid transparent !important",
          fontSize: "14px",
          borderRadius: "10px",
          background:
            "linear-gradient(165deg, #FF9AAB -64.52%, #F53756 61.26%)",
          fontWeight: "500",
          lineHeight: "21px",
          backgroundColor: "#898989",
          textTransform: "capitalize",
          whiteSpace: "pre",
          "&:hover": {
            color: "#fff",
            border: "0.5px solid #F43755 !important",
            boxShadow: "none",
            background: "transparent",
          },
        },
        outlinedPrimary: {
          color: "#F43755",
          border: "0.5px solid #F43755 !important",
          padding: "7px 28px",
          fontSize: "14px",
          background: "transparent",
          borderRadius: "10px",
          fontWeight: "500",
          textTransform: "capitalize",
          whiteSpace: "pre",
          "&:hover": {
            background:
              "linear-gradient(165deg, #FF9AAB -64.52%, #F53756 61.26%)",
            color: "#fff",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {},
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          background: "#140e2e",
          outline: "0",
          color: "#fff",
        },
        paper: {
          backgroundColor: "transparent !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { paddingLeft: "20px" },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: "transparent !important",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          // padding: "0px 65px !important",
          "@media (max-width: 780px)": {
            // padding: "0px 16px !important",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none !important",
          cursor: "pointer",
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersArrowSwitcher-button": {
            backgroundColor: "transparent !important",
            color: "#000 !important",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            backgroundColor: "transparent !important",
            color: "#000 !important",
            marginLeft: "-15px !important",
          },
          "& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
            {
              color: "#fff !important",
              backgroundColor: "#7A69FE !important",
              border: "none !important",
              borderRadius: "10px !important",
            },
          "& .Mui-selected": {
            backgroundColor: "#7A69FE !important",
            color: "#fff !important",
            border: "none !important",
            borderRadius: "10px !important",
          },
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: "30px",
          },
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "210px !important",
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            fontSize: "15px",
          },
        },
      },
    },
  },
});

export const createCustomTheme = () => {
  let theme = createTheme(deepmerge(baseOptions, themeOptions)); 

  if (typeof config !== "undefined" && config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
