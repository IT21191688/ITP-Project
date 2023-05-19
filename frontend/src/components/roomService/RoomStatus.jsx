import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { useState } from "react";

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

const useStyles = makeStyles(() => ({
  square: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // width: "40px",
    // height: "40px",
    fontSize: "1.2rem",
    // fontWeight: "bold",
    // color: "#000",
    border: "1px solid #000",
  },
  redSquare: {
    backgroundColor: "red",
  },
}));

const RoomStatus = () => {
  const classes = useStyles();

  const [numberArray, setNumArray] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.roomBook)
      .fetch()
      .then((res) => {
        res.data.forEach((item) => {
          console.log("item", item);
          numberArray.push(item.roomNo);
        });
        setNumArray([...numberArray]);
        console.log("number array", numberArray);
        // numberArray.append(res.data.roomNo);
      });
  }, []);

  const isNumberIncluded = (num) => {
    return numberArray.includes(num);
  };

  const renderSquare = (num) => {
    const className = isNumberIncluded(num)
      ? `${classes.square} ${classes.redSquare}`
      : classes.square;
    return <div className={className}>{num}</div>;
  };

  return (
    <>
      <div style={styles.header}>
        <Box
          minWidth='100vw'
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          style={styles.content}
        >
          <Stack
            spacing={2}
            minWidth='10vw'
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
          >
            <Typography color='#2F4FAA' variant='h4'>
              Room Booking Status
            </Typography>
            <Grid container spacing={0}>
              {[...Array(10)].map((_, row) => (
                <Grid key={row} container item xs={12}>
                  {[...Array(10)].map((_, col) => (
                    <Grid key={col} item xs={1}>
                      {renderSquare(row * 10 + col + 1)}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default RoomStatus;
