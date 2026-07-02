"use client";
import { useRouter } from "next/navigation";
import HomeLayout from "../layouts/HomeLayout/layout";
import History from "./history/page";
import SchoolToday from "./schooltoday/page";
import CommitteesPage from "./committees/page";
import { Box, Button, Typography } from "@mui/material";

export default function About() {
  const router = useRouter();
  
  return (
    <HomeLayout>
      <Box sx={{ p: "120px 16px 80px", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Select a section:</Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="contained" onClick={() => router.push("/about/history")}>
            History
          </Button>
          <Button variant="contained" onClick={() => router.push("/about/schooltoday")}>
            School Today
          </Button>
          <Button variant="contained" onClick={() => router.push("/about/committees")}>
            Committees
          </Button>
        </Box>
      </Box>
    </HomeLayout>
  );
}
