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
import ViewPaymentDetails from "./ViewPaymentDetails";

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

function Payments() {
    const [payments, setPayments] = React.useState();
    const [currentPayment, setCurrentPayment] = React.useState();

    React.useEffect(() => {
        createAPIEndpoint(ENDPOINTS.payment)
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

    const deletePayment = (id) => {
        createAPIEndpoint(ENDPOINTS.payment).delete(id);
        window.location.reload();
    };

    const verifyPayment = (payment) => {
        payment["verified"] = true;
        createAPIEndpoint(ENDPOINTS.payment).put(payment._id, payment);
        window.location.reload();
    };

    const setCurrentPay = (payment) => {
        setCurrentPayment(payment);
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
                accessorKey: "payersName",
                header: "Payers Name",
                maxSize: 1,
            },
            {
                accessorKey: "address",
                header: "Address",
                maxSize: 1,
            },
            {
                accessorKey: "email",
                header: "Payers Name",
                maxSize: 1,
            },
            {
                accessorKey: "amount",
                header: "Amount",
                maxSize: 1,
            },
            {
                header: " ",
                maxSize: 20,
                Cell: ({ cell, row }) => {
                    return (
                        <>
                            <Avatar>
                                <IconButton
                                    onClick={() => {
                                        setCurrentPayment(row.original);
                                        setOpen(true);
                                    }}
                                    aria-label='delete'
                                >
                                    <VisibilityIcon color='#4A75D3' />
                                </IconButton>
                            </Avatar>
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
                            <Avatar sx={{ bgcolor: row.original.verified ? "blue" : "red" }}>
                                <IconButton
                                    disabled={row.original.verified}
                                    onClick={() => verifyPayment(row.original)}
                                    aria-label='delete'
                                >
                                    <VerifiedIcon sx={{ color: "white" }} color='#4A75D3' />
                                </IconButton>
                            </Avatar>
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
                                    onClick={() => deletePayment(row.original._id)}
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

            {currentPayment && (
                <ViewPaymentDetails
                    currentPayment={currentPayment}
                    open={open}
                    onClose={handleClose}
                    setOpen={setOpen}
                />
            )}
            <div style={styles.header}>
                <Box
                    display='flex'
                    justifyContent='center'
                    flexDirection={"column"}
                    alignItems='center'
                    minHeight='100vh'
                    style={styles.content}
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
                    <Typography variant='h4'>Payments</Typography>
                    {payments === undefined ? (
                        <CircularProgress />
                    ) : (<>

                        <MaterialReactTable columns={columns} data={payments} />
                    </>
                    )}
                </Box>
            </div>
        </>
    );
}

export default Payments;
