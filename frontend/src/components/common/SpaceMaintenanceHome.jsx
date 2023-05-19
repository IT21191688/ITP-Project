import { Box, Stack } from "@mui/material";
import HomeCard from "./HomeCard";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import rooms from "../../assets/images/rooms.jpg";
import inventory from "../../assets/images/inventory.jpg";
import maintenance from "../../assets/images/maintenance.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

const styles = {
  header: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};

function SpaceMaintenanceHome() {
  const navigate = useNavigate();

  return (
    <>
      <div style={styles.header}>
        <Box
          minWidth='100vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          style={styles.content}
        >
          <Stack direction={"row"} spacing={2}>
            <Stack spacing={2} direction={"column"}>
              <HomeCard
                title={"Room Booking"}
                img={rooms}
                onAdd={() => navigate("/roomBooking")}
                onView={() => navigate("/roomBookingGrid")}
              />
              <Button
                onClick={() => navigate("/roomBookingStatus")}
                variant='contained'
              >
                Room Booking Status
              </Button>
            </Stack>
            <HomeCard
              title={"Inventory"}
              img={inventory}
              onAdd={() => navigate("/inventory")}
              onView={() => navigate("/inventoryGrid")}
            />
            <Stack spacing={2} direction={"column"}>
              <HomeCard
                title={"Maintenance"}
                img={maintenance}
                onAdd={() => navigate("/maintenance")}
                onView={() => navigate("/maintenanceGrid")}
              />
              <Button
                onClick={() => navigate("/roomMaintenanceStatus")}
                variant='contained'
              >
                Room Maintenance Status
              </Button>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default SpaceMaintenanceHome;
