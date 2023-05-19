import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { toast } from "react-toastify";

function CardDetails({ onClick, values }) {
  const [cardState, setCardState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setCardState((state) => ({ ...state, focus: e.target.name }));
  };

  const handleInputChange = (e) => {
    setCardState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = () => {
    values["dateTime"] = new Date();
    values["verified"] = false;
    createAPIEndpoint(ENDPOINTS.payment)
      .post(values)
      .then((res) =>
        toast.success("Payment Successful", {
          position: toast.POSITION.TOP_RIGHT,
        })
      )
      .catch((err) =>
        toast.error("Payment Failed", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
    onClick();
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
            <Typography variant='h4'>Payment Portal | Card Details</Typography>
            <FormControl sx={{ gap: 2, width: "75%" }}>
              <TextField
                label='Name on Card'
                variant='outlined'
                name='name'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                pattern='[a-z A-Z-]+'
              />
              <TextField
                // type="number"
                id='outlined-basic'
                label='Card Number'
                variant='outlined'
                name='number'
                inputProps={{
                  pattern: "[d| ]{16,22}",
                  maxlength: 16,
                  type: "tel",
                }}
                onChange={handleInputChange}
                required
                onFocus={handleInputFocus}
              />
              <TextField
                type='tel'
                id='outlined-basic'
                label='CVC'
                variant='outlined'
                name='cvc'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                pattern='\d{3}'
                inputProps={{ pattern: "d{3}", maxlength: 3 }}
              />
              <TextField
                type='tel'
                id='outlined-basic'
                label='Expiration Date'
                variant='outlined'
                name='expiry'
                required
                inputProps={{
                  pattern: "dd/dd",
                  maxlength: 4,
                }}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </FormControl>
            <BasicButton
              onClick={onFormSubmit}
              text={"Proceed to payment"}
              width={250}
              backgroundColor={"secondary"}
            />
          </Stack>
          <Cards
            cvc={cardState.cvc}
            expiry={cardState.expiry}
            focused={cardState.focus}
            name={cardState.name}
            number={cardState.number}
          />
        </Box>
      </Box>
    </>
  );
}

export default CardDetails;
