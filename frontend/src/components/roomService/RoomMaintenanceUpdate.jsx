import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

function RoomMaintenanceUpdate() {
  const navigate = useNavigate();
  const location = useLocation();

  const getFreshModel = () => ({
    roomNo: null,
    date: "",
    requestingOfficer: "",
    reason: "",
    type: "",
    requiredMaterials: "",
    routineOrNot: "",
    estimatedCompletionTime: "",
    description: "",
    maintenanceTechSignature: "",
    supervisorSignature: "",
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  useEffect(() => {
    setValues(location.state.maintenance);
  }, []);

  const addMaintenance = () => {
    values["roomNo"] = parseInt(values["roomNo"]);
    createAPIEndpoint(ENDPOINTS.maintenance).put(values._id, values);
    toast.success("Maintenance add successful");
    navigate("/maintenanceGrid");
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
                  label='Room No'
                  variant='outlined'
                  name='roomNo'
                  value={values.roomNo}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Date'
                  variant='outlined'
                  name='date'
                  value={values.date}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Requesting Officer'
                  variant='outlined'
                  name='requestingOfficer'
                  value={values.requestingOfficer}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Reason'
                  variant='outlined'
                  name='reason'
                  value={values.reason}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Type'
                  variant='outlined'
                  name='type'
                  value={values.type}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Required Materials'
                  variant='outlined'
                  name='requiredMaterials'
                  value={values.requiredMaterials}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={2}>
                <TextField
                  id='outlined-basic'
                  label='Routine or Not'
                  variant='outlined'
                  name='routineOrNot'
                  value={values.routineOrNot}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Estimated Completion Time'
                  variant='outlined'
                  name='estimatedCompletionTime'
                  value={values.estimatedCompletionTime}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-multiline-static'
                  label='Description'
                  multiline
                  rows={2}
                  name='description'
                  value={values.description}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Maintenance Tech Signature'
                  variant='outlined'
                  name='maintenanceTechSignature'
                  value={values.maintenanceTechSignature}
                  onChange={handleInputChange}
                />
                <TextField
                  id='outlined-basic'
                  label='Supervisor Signature'
                  variant='outlined'
                  name='supervisorSignature'
                  value={values.supervisorSignature}
                  onChange={handleInputChange}
                />
                <Button onClick={() => addMaintenance()} variant='contained'>
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

export default RoomMaintenanceUpdate;
