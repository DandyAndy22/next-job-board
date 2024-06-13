'use client'
import NavBar from "@/components/NavBar";
import { Box, Typography } from "@mui/material";

export default function Home() {
  

  return (
    <main>
      <NavBar />
      <Box sx={{ margin: "50px" }}>
        <Typography variant="h3">Welcome,</Typography>
        <Typography variant="h6">Give our Job Board a try!</Typography>
      </Box>
    </main>
  );
}
