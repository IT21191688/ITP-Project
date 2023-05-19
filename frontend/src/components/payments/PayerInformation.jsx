import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import { toast } from "react-toastify";

function PayerInformation({ onClick, values, handleInputChange }) {
  const onFormSubmit = () => {
    if (
      values.payersName === "" ||
      values.nicOrPassport === 0 ||
      values.contactNo === "" ||
      values.email === "" ||
      values.address === ""
    ) {
      toast.error("All Fields required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      onClick();
    }
  };

  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box display='flex' alignItems='center'>
          <Stack gap={2} direction={"column"}>
            <Typography variant='h4'>
              Payment Portal | Payer's Information
            </Typography>
            <FormControl sx={{ gap: 2, width: "75%" }}>
              <TextField
                id='outlined-basic'
                label='Payer’s Name'
                variant='outlined'
                name='payersName'
                value={values.payersName}
                onChange={handleInputChange}
              />
              <TextField
                id='outlined-basic'
                label='NIC or Passport No'
                variant='outlined'
                name='nicOrPassport'
                value={values.nicOrPassport}
                inputProps={{
                  maxlength:12,
                }}
                onChange={handleInputChange}
              />
              <TextField
                id='outlined-basic'
                label='Contact No'
                variant='outlined'
                name='contactNo'
                 inputProps={{
                  maxlength:10,
                  type:'tel'
                }}
                
                value={values.contactNo}
                onChange={handleInputChange}
              />
              <TextField
                id='outlined-basic'
                label='Email'
                variant='outlined'
                type='email'
                name='email'
                value={values.email}
                onChange={handleInputChange}
              />
              <TextField
                id='outlined-basic'
                label='Address'
                variant='outlined'
                name='address'
                value={values.address}
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

export default PayerInformation;
