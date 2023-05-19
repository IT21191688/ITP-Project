import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Box, Chip, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function ViewPaymentDetails({
  currentPayment,
  onClose,
  open,
  setOpen,
}) {
  //   const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year.toString()}`;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Payment Details</DialogTitle>
      <Box sx={{ bgcolor: "white", padding: 5, borderRadius: 5 }}>
        <Stack spacing={1}>
          <Typography variant='h6'>
            Payment ID : {currentPayment?._id}
          </Typography>
          <Typography variant='h6'>
            Payment Amount : LKR {currentPayment?.amount}
          </Typography>
          <Typography variant='h6'>
            Payment Address : {currentPayment?.address}
          </Typography>
          <Typography variant='h6'>
            Date and Time : {formatDate(currentPayment?.dateTime)}
          </Typography>
          <Typography variant='h6'>Email: {currentPayment?.email}</Typography>
          <Typography variant='h6'>
            NIC or Passport : {currentPayment?.nicOrPassport}
          </Typography>
          <Typography variant='h6'>
            Paid Via : {currentPayment?.paidVia}
          </Typography>
          <Typography variant='h6'>
            Payers Name : {currentPayment?.payersName}
          </Typography>
          <Typography variant='h6'>
            Purpose : {currentPayment?.purpose}
          </Typography>
          {currentPayment.verified ? (
            <Chip
              color='success'
              icon={<VerifiedIcon sx={{ color: "blue" }} />}
              label='Verified'
            />
          ) : (
            <Chip
              color='error'
              icon={<VerifiedIcon sx={{ color: "blue" }} />}
              label='Not Verified'
            />
          )}
        </Stack>
      </Box>
    </Dialog>
  );
}
