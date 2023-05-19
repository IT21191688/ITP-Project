import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
};

function RoomBookingUpdate({ booking }) {
  const [feature, setFeature] = useState("ICU/MOD");
  const [roomClass, setRoomClass] = useState("A");
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state.booking, "location");

  const getFreshModel = () => ({
    regNo: "",
    name: "",
    age: null,
    gender: "",
    contactNo: "",
    email: "",
    contactNo: "",
    doctorName: "",
    admitType: "",
    roomNo: null,
    feature: "",
    class: "",
  });

  const [items, setItems] = useState([]);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.roomBook)
      .fetch()
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  useEffect(() => {
    setValues(location.state.booking);
  }, []);

  const addBooking = () => {
    values["feature"] = feature;
    values["age"] = parseInt(values["age"]);
    values["roomNo"] = parseInt(values["roomNo"]);
    values["class"] = roomClass;
    console.log(values);
    items.forEach((item) => {
      if (
        item.roomNo === values["roomNo"] &&
        item.roomNo !== location.state.booking.roomNo
      ) {
        toast.error("Room Not Available");
      } else {
        createAPIEndpoint(ENDPOINTS.roomBook).put(values._id, values);
        toast.success("Booking successful");
        navigate("/roomBookingGrid");
      }
    });
  };

  return (
    <>
      <div style={styles.header}>
        <Box
          minWidth='100vh'
          display='flex'
          justifyContent='center'
          //   alignItems='center'
          minHeight='100vh'
          style={styles.content}
        >
          <Stack
            spacing={1}
            sx={{
              bgcolor: "white",
              padding: 5,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 5,
            }}
          >
            <Typography color='#2F4FAA' variant='h4'>
              Hospital Room Maintenance Form
            </Typography>
            <Typography>Patients Details</Typography>
            <Stack direction='row' spacing={2} width={500}>
              <Stack spacing={2} direction='column'>
                <TextField
                  id='outlined-basic'
                  label='Reg. No'
                  variant='outlined'
                  name='regNo'
                  value={values.regNo}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  name='name'
                  value={values.name}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Age'
                  variant='outlined'
                  name='age'
                  value={values.age}
                  type='number'
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Gender'
                  variant='outlined'
                  name='gender'
                  value={values.gender}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Contact No'
                  variant='outlined'
                  name='contactNo'
                  value={values.contactNo}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  name='email'
                  value={values.email}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={2}>
                <TextField
                  id='outlined-basic'
                  label='Doctor Name'
                  variant='outlined'
                  name='doctorName'
                  value={values.doctorName}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Admit Type'
                  variant='outlined'
                  name='admitType'
                  value={values.admitType}
                  onChange={handleInputChange}
                />

                <TextField
                  id='outlined-basic'
                  label='Room Number'
                  variant='outlined'
                  name='roomNo'
                  type='number'
                  value={values.roomNo}
                  onChange={handleInputChange}
                />

                <ButtonGroup aria-label='outlined primary button group'>
                  <Button
                    onClick={() => setFeature("ICU/MOD")}
                    variant={feature === "ICU/MOD" ? "contained" : "outlined"}
                  >
                    ICU/MOD
                  </Button>
                  <Button
                    onClick={() => setFeature("NON ICU")}
                    variant={feature === "NON ICU" ? "contained" : "outlined"}
                  >
                    NON ICU
                  </Button>
                </ButtonGroup>

                <ButtonGroup aria-label='outlined primary button group'>
                  <Button
                    onClick={() => setRoomClass("A")}
                    variant={roomClass === "A" ? "contained" : "outlined"}
                  >
                    Class A
                  </Button>
                  <Button
                    onClick={() => setRoomClass("B")}
                    variant={roomClass === "B" ? "contained" : "outlined"}
                  >
                    Class B
                  </Button>
                </ButtonGroup>

                <Button onClick={() => addBooking()} variant='contained'>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default RoomBookingUpdate;
