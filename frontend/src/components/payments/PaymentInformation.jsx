import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import { toast } from "react-toastify";

function PaymentInformation({ onClick, values, handleInputChange }) {
  const onFormSubmit = () => {
    if (values.purpose === "" || values.amount <= 0) {
      toast.error("All Fields required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      onClick();
    }
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        // minHeight="100vh"
      >
        <Box display='flex' alignItems='center'>
          <Stack gap={2} direction={"column"}>
            <Typography variant='h4'>
              Payment Portal | Payment Information
            </Typography>
            <FormControl sx={{ gap: 2, width: "75%" }}>
              <InputLabel id='demo-simple-select-label'>
                Purpose of the Payment
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={values.purpose}
                onChange={handleInputChange}
                name='purpose'
                label='Purpose of the Payment'
                // onChange={handleChange}
              >
                <MenuItem value={"Consultation Fees"}>
                  Consultation Fees
                </MenuItem>
                <MenuItem value={"Lab Tests"}>Lab Tests</MenuItem>
                <MenuItem value={"Medication"}>Medication</MenuItem>
              </Select>
              <TextField
                id='outlined-basic'
                label='Payment Amount'
                variant='outlined'
                type='number'
                name='amount'
                value={values.amount}
                onChange={handleInputChange}
              />
            </FormControl>
            <BasicButton
              onClick={onFormSubmit}
              text={"Continue"}
              width={150}
              backgroundColor={"secondary"}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default PaymentInformation;
