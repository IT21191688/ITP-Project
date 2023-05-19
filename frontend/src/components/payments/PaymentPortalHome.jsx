import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import { useNavigate } from "react-router-dom";
import backgrounImage from "../../assets/images/payportback.jpg";

const styles = {
  header: {
    backgroundImage: `url(${backgrounImage})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
};

function PaymentPortalHome() {
  let navigate = useNavigate();
  const onClick = () => {
    navigate("pay");
  };
  return (
    <div style={styles.header}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        style={styles.content}
      >
        <Stack gap={4} direction={"column"}>
          <Typography variant='h3'> Payment Portal </Typography>
          <BasicButton text={"Pay Now"} onClick={onClick} width={150} />
        </Stack>
      </Box>
    </div>
  );
}

export default PaymentPortalHome;
