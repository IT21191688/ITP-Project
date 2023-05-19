import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
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

function RoomInventory() {
  const navigate = useNavigate();

  const getFreshModel = () => ({
    itemNo: "",
    itemName: "",
    dueDate: "",
    quantity: null,
    noOfItems: null,
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const addInventory = () => {
    values["quantity"] = parseInt(values["quantity"]);
    values["noOfItems"] = parseInt(values["noOfItems"]);
    createAPIEndpoint(ENDPOINTS.inventory).post(values);
    toast.success("Inventory add successful");
    navigate("/spaceMaintenance");
  };

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
          <Stack
            spacing={2}
            sx={{
              bgcolor: "white",
              padding: 5,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 5,
            }}
          >
            <Typography color='#2F4FAA' variant='h4'>
              Inventory - Rooms
            </Typography>
            <Stack direction='row' spacing={2} width={500}>
              <Stack spacing={2} direction='column'>
                <TextField
                  id='outlined-basic'
                  label='Item No'
                  variant='outlined'
                  name='itemNo'
                  value={values.itemNo}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Expiry / Maintenance Due Date'
                  variant='outlined'
                  name='dueDate'
                  value={values.dueDate}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='No. of Items'
                  variant='outlined'
                  name='noOfItems'
                  value={values.noOfItems}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={2}>
                <TextField
                  id='outlined-basic'
                  label='Item Name'
                  variant='outlined'
                  name='itemName'
                  value={values.itemName}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Quantity'
                  variant='outlined'
                  name='quantity'
                  value={values.quantity}
                  onChange={handleInputChange}
                />
                <Button variant='contained' onClick={() => addInventory()}>
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

export default RoomInventory;
