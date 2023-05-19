import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PayerInformation from "./PayerInformation";
import PaymentInformation from "./PaymentInformation";
import { Box } from "@mui/material";
import PaymentConfirmation from "./PaymentConfirmation";
import CardDetails from "./CardDetails";
import PaymentSuccessful from "./PaymentSuccessful";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckIcon from "@mui/icons-material/Check";
import PaymentIcon from "@mui/icons-material/Payment";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import backgrounImage from "../../assets/images/payback.jpg";
import useForm from "../../hooks/useForm";
import { useState } from "react";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className='QontoStepIcon-completedIcon' />
      ) : (
        <div className='QontoStepIcon-circle' />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <MonetizationOnIcon />,
    2: <GroupAddIcon />,
    3: <CheckIcon />,
    4: <PaymentIcon />,
    5: <FactCheckIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Payment Information",
  "Payer's Information",
  "Payment Confirmation",
  "Card Details",
  "Payment Completion",
];

const styles = {
  header: {
    backgroundImage: `url(${backgrounImage})`,
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

export default function PaymentPortal() {
  const getFreshModel = () => ({
    dateTime: new Date(),
    amount: "",
    purpose: "",
    paidVia: "Online Transaction",
    payersName: "",
    nicOrPassport: "",
    contactNo: "",
    email: "",
    address: "",
    paymentConfirmation: "off",
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const [activeStep, setActiveStep] = useState(0);
  const onClick = () => {
    setActiveStep((activeStep) => activeStep + 1);
    console.log("form values", values);
  };

  const renderStepper = (param) => {
    switch (param) {
      case 0:
        return (
          <PaymentInformation
            onClick={onClick}
            values={values}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <PayerInformation
            onClick={onClick}
            values={values}
            handleInputChange={handleInputChange}
          />
        );
        break;
      case 2:
        return (
          <PaymentConfirmation
            onClick={onClick}
            values={values}
            handleInputChange={handleInputChange}
          />
        );
        break;
      case 3:
        return (
          <CardDetails
            onClick={onClick}
            values={values}
            handleInputChange={handleInputChange}
          />
        );
        break;
      case 4:
        return (
          <PaymentSuccessful
            values={values}
            handleInputChange={handleInputChange}
          />
        );
        break;
    }
  };

  console.log(activeStep);

  return (
    <div style={styles.header}>
      <Box
        display='flex'
        flexDirection={"column"}
        minHeight='100vh'
        style={styles.content}
      >
        <Box display='flex' alignItems='center' minHeight='100vh'>
          <Stack
            sx={{ width: "100%" }}
            spacing={4}
            direction={"column"}
            display={"flex"}
            justifyContent='center'
            alignItems='center'
            height='auto'
          >
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderStepper(activeStep)}
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
