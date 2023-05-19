import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import { useState } from "react";
import { toast } from "react-toastify";

function PaymentConfirmation({ onClick, values, handleInputChange }) {
  const [checked, setChecked] = useState();

  console.log("value", checked);

  const onFormSubmit = () => {
    console.log(checked);
    if (values.amount <= 0) {
      toast.error("All Fields required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (checked === false) {
      toast.error("Cannot Continue Unconfirmed Transactions", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      onClick();
    }
  };

  console.log("object", checked);

  const confirmationHandler = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        // minHeight="100vh"
      >
        <Box
          display='flex'
          // justifyContent="center"
          alignItems='center'
          // minHeight="100vh"
        >
          <Stack gap={2} direction={"column"}>
            <Typography variant='h4'>
              Payment Portal | Payment Confirmation
            </Typography>
            <FormControl sx={{ gap: 2, width: "75%" }}>
              <TextField
                id='outlined-basic'
                label='Payment Amount LKR'
                variant='outlined'
                type='number'
                name='amount'
                value={values.amount}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='I confirm the amount to be paid'
                onChange={confirmationHandler}
              />
            </FormControl>
            <BasicButton
              onClick={onFormSubmit}
              text={"Proceed to payment"}
              width={250}
              backgroundColor={"secondary"}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default PaymentConfirmation;
