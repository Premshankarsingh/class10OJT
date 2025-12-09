"use client";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardLayout from "../../layouts/DashboardLayout/layout";
import PetCard from "./PetCard";

const FavoritePetsBox = styled(Box)(({ theme }) => ({
  "& .favoritePetsMainBox": {
    margin: "200px 0px 100px 0px",
    position: "relative",
  },
}));
const petDataList = [
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
  {
    backgroundImage: "images/favoritePets/dogImage.jpg",
    name: "Elected Pair",
    petOwnerName: "Umair Siddiqui",
    price: "524",
    address: "Sec-23,FBD,Delhi",
  },
];

const FavoritePets = () => {
  return (
    <DashboardLayout>
      <FavoritePetsBox>
        <Paper>
          <Box className="marketplaceMainBox">
            <Container maxWidth="lg">
              <Typography
                variant="h5"
                align="center"
                sx={{ color: "#535353", fontWeight: 700 }}
              >
                Favourites
              </Typography>

              <Box mb={3} className="displayCenter" my={5}>
                <Box>
                  <Button variant="contained" color="primary">
                    Pets
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginLeft: "8px", marginRight: "8px" }}
                  >
                    Services
                  </Button>
                  <Button variant="contained" color="secondary">
                    Products
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={{ xs: 2, md: 3 }}>
                {petDataList &&
                  petDataList?.map((petData, index) => (
                    <Grid
                      item
                      key={index}
                      size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                    >
                      <Box>
                        <PetCard petData={petData} />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </Box>
        </Paper>
      </FavoritePetsBox>
    </DashboardLayout>
  );
};

export default FavoritePets;
