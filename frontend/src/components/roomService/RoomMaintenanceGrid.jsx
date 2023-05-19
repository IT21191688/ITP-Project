import {
  Box,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import backgroundImage from "../../assets/images/hospitalbeds.jpg";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";

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

function RoomMaintenanceGrid() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.maintenance)
      .fetch()
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      });
  }, []);

  const deleteItem = (id) => {
    createAPIEndpoint(ENDPOINTS.maintenance).delete(id);
    window.location.reload();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "roomNo",
        header: "Room No",
        maxSize: 20,
      },
      {
        accessorKey: "date",
        header: "Date",
        maxSize: 10,
      },
      {
        accessorKey: "requestingOfficer",
        header: "Requesting Officer",
        maxSize: 10,
      },
      {
        accessorKey: "reason",
        header: "Reason",
        maxSize: 10,
      },
      {
        accessorKey: "type",
        header: "Type",
        maxSize: 10,
      },
      {
        accessorKey: "requiredMaterials",
        header: "Required Materials",
        maxSize: 10,
      },
      {
        accessorKey: "routineOrNot",
        header: "Routine?",
        maxSize: 10,
      },
      {
        accessorKey: "estimatedCompletionTime",
        header: "Completion Time (estimated)",
        maxSize: 10,
      },
      {
        accessorKey: "description",
        header: "Description",
        maxSize: 10,
      },
    ],
    []
  );

  return (
    <>
      <div style={styles.header}>
        <Box
          //   minWidth='100vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          style={styles.content}
        >
          <Stack spacing={2}>
            <Typography color='#2F4FAA' variant='h4'>
              Room Maintenance
            </Typography>
            <Stack direction='row' spacing={2}>
              <MaterialReactTable
                enableRowActions
                renderRowActionMenuItems={({ row }) => [
                  <MenuItem
                    key='edit'
                    onClick={() =>
                      navigate("/maintenanceUpdate", {
                        state: { maintenance: row.original },
                      })
                    }
                  >
                    Edit
                  </MenuItem>,
                  <MenuItem
                    key='delete'
                    onClick={() => deleteItem(row.original._id)}
                  >
                    Delete
                  </MenuItem>,
                ]}
                columns={columns}
                data={items}
              />
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default RoomMaintenanceGrid;
