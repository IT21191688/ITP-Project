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
        width: "100%",
    },

    content: {
        height: "100%",
        width: " 100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
};

function RoomBookingGrid() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.roomBook)
            .fetch()
            .then((res) => {
                setItems(res.data);
                console.log(res.data);
            });
    }, []);

    const deleteItem = (id) => {
        createAPIEndpoint(ENDPOINTS.roomBook).delete(id);
        window.location.reload();
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "regNo",
                header: "RegNo",
                maxSize: 20,
            },
            {
                accessorKey: "name",
                header: "Name",
                maxSize: 10,
            },
            {
                accessorKey: "age",
                header: "Age",
                maxSize: 10,
            },
            {
                accessorKey: "gender",
                header: "Gender",
                maxSize: 10,
            },
            {
                accessorKey: "contactNo",
                header: "Contact No",
                maxSize: 10,
            },
            {
                accessorKey: "email",
                header: "Email",
                maxSize: 10,
            },
            {
                accessorKey: "doctorName",
                header: "Doctor Name",
                maxSize: 10,
            },
            {
                accessorKey: "admitType",
                header: "Admit Type",
                maxSize: 10,
            },
            {
                accessorKey: "roomNo",
                header: "Room Number",
                maxSize: 10,
            },
            {
                accessorKey: "feature",
                header: "Feature",
                maxSize: 10,
            },
            {
                accessorKey: "class",
                header: "Class",
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
                    width='100%'
                    style={styles.content}
                >
                    <Stack spacing={2}>
                        <Typography color='#2F4FAA' variant='h4'>
                            Bookings
                        </Typography>
                        <Box
                            overflow='scroll'>
                            <Stack direction='row' spacing={2}>
                                <MaterialReactTable
                                    enableRowActions
                                    renderRowActionMenuItems={({ row }) => [
                                        <MenuItem
                                            key='edit'
                                            onClick={() =>
                                                navigate("/roomBookingEdit", {
                                                    state: { booking: row.original },
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
                        </Box>
                    </Stack>
                </Box>
            </div>
        </>
    );
}

export default RoomBookingGrid;
