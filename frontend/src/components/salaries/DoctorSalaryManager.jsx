import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import { Link, useNavigate } from "react-router-dom";
import backgrounImage from "../../assets/images/payportback.jpg";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VerifiedIcon from "@mui/icons-material/Verified";
import MaterialReactTable from "material-react-table";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
};

function DoctorSalaryManager() {
    const [payments, setPayments] = React.useState();
    const [currentPayment, setCurrentPayment] = React.useState();

    React.useEffect(() => {
        createAPIEndpoint(ENDPOINTS.salary)
            .fetch()
            .then((res) => {
                setPayments(res.data);
                setCurrentPayment(res.data[0]);
            });
    }, []);
    console.log(payments);

    let navigate = useNavigate();
    const onClick = () => {
        navigate("pay");
    };

    const deleteSalary = (id) => {
        createAPIEndpoint(ENDPOINTS.salary).delete(id);
        window.location.reload();
    };

    const transferSalary = () => {
        console.log(currentPayment, "crrp");
        currentPayment["salaryPaid"] = true;
        createAPIEndpoint(ENDPOINTS.salary).put(currentPayment._id, currentPayment);
        window.location.reload();
    };

    const setCurrentPay = (payment) => {
        setCurrentPayment(payment);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    const columns = React.useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                maxSize: 1,
            },
            {
                accessorKey: "basicsalary",
                header: "Basic Salary",
                maxSize: 1,
            },
            {
                accessorKey: "completedhours",
                header: "Completed Hours",
                maxSize: 1,
            },
            {
                accessorKey: "OTsalary",
                header: "OT Salary",
                maxSize: 1,
            },
            {
                header: "Full Payment",
                maxSize: 20,
                Cell: ({ cell, row }) => {
                    return (
                        <>
                            <Chip
                                label={`LKR ${row.original.basicsalary + row.original.OTsalary
                                    }`}
                                color='success'
                                variant='contained'
                            />
                        </>
                    );
                },
            },
            {
                header: "Pay Salary",
                maxSize: 20,
                Cell: ({ cell, row }) => {
                    return (
                        <>
                            <Button
                                disabled={row.original.salaryPaid}
                                onClick={() => {
                                    confirmAlert({
                                        title: "Pay the amount?",
                                        message:
                                            "Are you sure you want to pay the salary? The action cannot be undone.",
                                        buttons: [
                                            {
                                                label: "Yes",
                                                onClick: () => {
                                                    const formToPost = row.original;
                                                    formToPost["salaryPaid"] = true;
                                                    createAPIEndpoint(ENDPOINTS.salary).put(
                                                        row.original._id,
                                                        formToPost
                                                    );
                                                    window.location.reload();
                                                },
                                            },
                                            {
                                                label: "No",
                                            },
                                        ],
                                        closeOnEscape: true,
                                        closeOnClickOutside: true,
                                        keyCodeForClose: [8, 32],
                                        willUnmount: () => { },
                                        afterClose: () => { },
                                        onClickOutside: () => { },
                                        onKeypress: () => { },
                                        onKeypressEscape: () => { },
                                        overlayClassName: "overlay-custom-class-name",
                                    });
                                }}
                                variant='contained'
                                endIcon={<AttachMoneyIcon />}
                            >
                                Pay
                            </Button>
                        </>
                    );
                },
            },
            {
                header: " ",
                maxSize: 20,
                Cell: ({ cell, row }) => {
                    return (
                        <>
                            <Avatar sx={{ bgcolor: "red" }}>
                                <IconButton
                                    onClick={() => deleteSalary(row.original._id)}
                                    aria-label='delete'
                                >
                                    <DeleteForeverIcon sx={{ color: "white" }} color='#4A75D3' />
                                </IconButton>
                            </Avatar>
                        </>
                    );
                },
            },
        ],
        []
    );

    return (
        <>
            <div style={styles.header}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    minHeight='100vh'
                    style={styles.content}
                    flexDirection='column'
                >
                    <Box
                        marginBottom='20px'
                    >
                        <Link to='/payments' className="m-3">
                            <BasicButton
                                text='Payments'
                                variant='contained'
                                color='primary'
                                size='large'
                            />
                        </Link>
                        <Link to='/doctorSalaryManager' className="m-3" >
                            <BasicButton
                                text='Salary Payments'
                                variant='contained'
                                color='primary'
                                size='large'
                            />
                        </Link>
                    </Box>
                    <Stack direction={"column"} spacing={2}>
                        <Typography variant='h4'>Salary Payments</Typography>
                        {payments === undefined ? (
                            <CircularProgress />
                        ) : (
                            <MaterialReactTable columns={columns} data={payments} />
                        )}
                    </Stack>
                </Box>
            </div>
        </>
    );
}

export default DoctorSalaryManager;
