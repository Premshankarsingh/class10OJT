"use client";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardLayout from "../../layouts/DashboardLayout/layout";
import PetCard from "./PetCard";

const FavoritePetsBox = styled(Box)(({ theme }) => ({
  "& .favoritePetsMainBox": {
    margin: "150px 0px 100px 0px",
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

const Marketplace = () => {
  return (
    <DashboardLayout>
      <FavoritePetsBox>
        <Paper>
          <Box className="marketplaceMainBox">
            <Container maxWidth="lg">
              <Box>
                <Typography variant="h6" align="center">
                  Favourites
                </Typography>
              </Box>
              <Box mb={3} className="displayCenter" my={2}>
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

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {petDataList &&
                  petDataList?.map((petData, index) => (
                    <Grid item key={index} size={{ xs: 2, sm: 4, md: 4 }}>
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

export default Marketplace;
