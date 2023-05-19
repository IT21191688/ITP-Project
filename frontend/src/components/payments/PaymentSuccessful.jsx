import { Box, Divider, Stack, Typography } from "@mui/material";
import BasicButton from "../common/BasicButton";
import { useNavigate } from "react-router-dom";
import ReactPDF, {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import PdfGenerator from "./PdfGenerator";
import logo from "../../assets/images/logo.png";
import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function PaymentSuccessful({ values }) {
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

  const form = useRef(values);

  useEffect(() => {}, [values]);

  const Pdf = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header} fixed>
          ~ Medixo Online Payments ~
        </Text>
        <Text style={styles.author}>Payment For</Text>
        <Text style={styles.title}> {values.purpose} </Text>
        <Image style={styles.image} src={logo} />
        <Text style={styles.subtitle}>
          Date and Time : {formatDate(values.dateTime)}
        </Text>
        <Text style={styles.subtitle}>Payers Name : {values.payersName} </Text>
        <Text style={styles.subtitle}>NIC or Passport : {values.purpose} </Text>
        <Text style={styles.subtitle}>Contact No : {values.contactNo} </Text>
        <Text style={styles.subtitle}>Email : {values.email} </Text>
        <Text style={styles.subtitle}>Address : {values.address} </Text>
        <Text style={styles.title}>Amount : LKR {values.amount} </Text>
      </Page>
    </Document>
  );

  const sendEmail = () => {
    console.log(values);
    const form = document.createElement("form");
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "text"; // Set the desired input type
        input.name = key; // Use the property key as the input name
        input.value = values[key]; // Use the property value as the input value
        form.appendChild(input); // Append the input element to the form
      }
    }
    document.body.appendChild(form);

    // form = values;
    emailjs
      .sendForm(
        "service_oy27bia",
        "template_gwj8vmp",
        form,
        "BweV4XKhV1LOdYDpJ"
      )
      .then(
        (result) => {
          confirmAlert({
            title: "Email Sent",
            message: "Check your inbox",
            buttons: [
              {
                label: "Close",
              },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => {},
            afterClose: () => {},
            onClickOutside: () => {},
            onKeypress: () => {},
            onKeypressEscape: () => {},
            overlayClassName: "overlay-custom-class-name",
          });
        },
        (error) => {
          confirmAlert({
            title: "Error occurred",
            message: "Download the receipt in case",
            buttons: [
              {
                label: "Close",
              },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => {},
            afterClose: () => {},
            onClickOutside: () => {},
            onKeypress: () => {},
            onKeypressEscape: () => {},
            overlayClassName: "overlay-custom-class-name",
          });
        }
      );
  };

  let navigate = useNavigate();
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
          //   minHeight="100vh"
        >
          <Stack gap={2} direction={"column"}>
            <Typography variant='h4'>Payment Successful</Typography>
            <Typography variant='h5'>
              Congratulations ! Your payment was successful
            </Typography>
            <Stack direction={"row"} gap={1}>
              <BasicButton
                onClick={() => sendEmail()}
                text={"Email Me the Recipt"}
                width={250}
                backgroundColor={"secondary"}
              />
              <PDFDownloadLink
                document={<Pdf />}
                fileName={`${values.payersName}_${formatDate(
                  values.dateTime
                )}.pdf`}
              >
                <BasicButton
                  text={"Download the Reciept"}
                  width={250}
                  backgroundColor={"secondary"}
                />
              </PDFDownloadLink>
            </Stack>
            <Divider />
            <BasicButton
              onClick={() => {
                navigate("/paymentportal");
              }}
              text={"Back to Home"}
              width={150}
              backgroundColor={"primary"}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default PaymentSuccessful;
