'use client';
import { Box, Typography, Avatar, Container } from "@mui/material";
import { styled } from "@mui/system";
import HomeLayout from "../../layouts/HomeLayout/layout";
import Goback from "../../../src/components/Goback";
import Marquee from "react-fast-marquee";

const NotificationBox = styled(Box)(({ theme }) => ({
  "& .notificationBox": {
    padding: "130px 0px 50px",
    position: "relative",
    zIndex: "999", 
    "& .notBox": {
      background: "rgba(69, 46, 84, 0.25)",
      padding: "15px 20px",
      border: "1px solid rgba(51, 51, 51, 0.19)",
      borderRadius: "10px",
    },
  },
}));

const notificationData = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
];

export default function Notifications() {
  return (
    <HomeLayout>
      <NotificationBox>
        <Box className="notificationBox">
          <Container>
            <Goback title={"Go Back"}/>
            <Box className="displaySpacebetween">
              <Typography variant="h3" color="#fff">
                Notifications
              </Typography>
            </Box>
            <Box mt={3}>
              {notificationData && notificationData?.map(( data, index) => (
                <Box className="notBox" my={1} key={index}>
                  <Box className="displayStart">
                    <Avatar src="images/profileimage.png" />
                    <Box ml={2}>
                      <Typography variant="body2" color="#fff">
                        {data.text}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ color: "rgb(245, 55, 86)", fontSize: "12px" }}
                      >
                        {data.date}&nbsp;&nbsp;{data.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Marquee>
                  I can be a React component, multiple React components, or just some text.
            </Marquee>
          </Container>
        </Box>
      </NotificationBox>
    </HomeLayout>
  );
}
