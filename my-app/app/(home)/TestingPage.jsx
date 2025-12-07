"use client";
import { Box, Button, Typography } from "@mui/material";
import Logo from "@/src/components/Logo";
import NoDataFound from "@/src/components/NoDataFound";
import GoBack from "@/src/components/Goback";
import TableComponent from "@/src/components/TableComponent";
import { useState } from "react";
import CommonConfirmationDialog from "@/src/components/CommonConfirmationDialog";
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const [openBlockUnblockModal, setOpenBlockUnblockModal] = useState();
  const [isBlocking, setIsBlocking] = useState();
  const handleOpenDeleteModal = () => {
    setOpenBlockUnblockModal(true);
  };
  const router = useRouter();
  return (
    <>
      <Box className="displayColumn">
        <Logo />
        <NoDataFound text={"No data Found"} />
        <GoBack title={"Go Back"} />
        <Button
          sx={{ color: "white" }}
          variant="outlined"
          onClick={() => {
            router.push("/about-us");
          }}
        >
          Click me
        </Button>
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Typography variant="h1" gutterBottom>
            h1. Heading
          </Typography>
          <Typography variant="h2" gutterBottom>
            h2. Heading
          </Typography>
          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="h5" gutterBottom>
            h5. Heading
          </Typography>
          <Typography variant="h6" gutterBottom>
            h6. Heading
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="button" gutterBottom sx={{ display: "block" }}>
            button text
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            caption text
          </Typography>
          <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
            overline text
          </Typography>
        </Box>
        <Box my={3} className="displayCenter">
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "8px" }}
          >
            NO
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "16px" }}
            onClick={() => {
              handleOpenDeleteModal();
            }}
          >
            YES
          </Button>
        </Box>
        <TableComponent />
        {openBlockUnblockModal && (
          <CommonConfirmationDialog
            open={openBlockUnblockModal}
            isLoading={isBlocking}
            handleClose={() => {
              setOpenBlockUnblockModal(false);
            }}
            title="BLOCK"
            type="reply"
            heading="Are you sure do you want to  block this brand?"
            handleSubmit={""}
          />
        )}
      </Box>
    </>
  );
}
