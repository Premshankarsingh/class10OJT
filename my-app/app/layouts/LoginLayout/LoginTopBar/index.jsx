import PropTypes from "prop-types";
import clsx from "clsx";

import {
  IconButton,
  AppBar,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const AppBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
}));

const MainHeader = styled(Box)(({ theme }) => ({
  "& .filtersButton": {
    marginLeft: "20px",
    "& .filterIcon": {
      "& button": {
        background: "rgba(0, 0, 0, 0.08) !important",
        width: "37px",
        height: "37px",
        borderRadius: "50%",
        padding: "0px",
        "& svg": {
          position: "absolute",
          zIndex: 3,
        },
      },
    },
  },
  "& .serchBox": {
    "& .MuiOutlinedInput-root": {
      border: "1px solid #E8E8E8",
      position: "relative",
      borderRadius: "10px",
      background: "#FFFFFF",
      height: "44px",
      color: "#000 !important",
    },
  },
}));

const LoginTopBar = () => {
  return (
    <AppBarContainer
      elevation={3}
      sx={{
        boxShadow: "0px 4px 4px 0px #0000001A",
        color: "#FFFFFF",
        borderRadius: "0px",
        padding: "8px",
      }}
    >
      <MainHeader>
        <Box className="displaySpacebetween">
          <Box sx={{ display: { sm: "none", md: "block" } }}>
            <Box className="filtersButton displayEnd">
              <Box className="displayStart filterIcon">
                <IconButton style={{ cursor: "pointer", marginRight: "8px" }}>
                  <img
                    src="/images/topbar/calisLogo.png"
                    alt="search"
                    width="350px"
                  />
                </IconButton>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ color: "#6FCFB9", fontWeight: 700 }}
                  >
                    Cali's Dairy
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="displayStart">
            <Button variant="contained" color="primary">
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: "8px", marginRight: "8px" }}
            >
              SignUp
            </Button>
          </Box>
        </Box>
      </MainHeader>
    </AppBarContainer>
  );
};

LoginTopBar.propTypes = {
  className: PropTypes.string,
};
LoginTopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default LoginTopBar;
