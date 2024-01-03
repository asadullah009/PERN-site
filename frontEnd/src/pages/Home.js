import React from 'react'
import { Box, Tabs, Typography } from "@mui/material";

// ** Style Component **
const styles = {
    backgroundImage: {
      backgroundImage: `url('/background.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textBox: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      padding: "20px",
      borderRadius: "8px",
      color: "white",
    },
  };
  

const Home = () => {
  return (
    <Box sx={styles.backgroundImage}>
        <Box sx={styles.textBox}>
          <Typography variant="h3" align="center">
            Empowering humanity, <br /> voice by voice{" "}
          </Typography>
        </Box>
      </Box>
  )
}

export default Home