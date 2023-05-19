import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginedited from "../patientImages/loginedited.jpeg";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        axios.post("http://localhost:8050/auth/login", {
            email: data.get("email"),
            password: data.get("password"),
        }).then(function (res) {
            if (res.status === 200) {
                //alert("Success!!");
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                window.location.href = '/';
            } else {
                alert(res.data.message);
            }
            console.log(res);
            // navigate("/readMedicine"); // navigate to medicine page after successful addition of medicine
        })
            .catch(function (err) {
                alert(err.response.data.message);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'admin') {
            navigate('/admin');
        } else if (localStorage.getItem('role') === 'user') {
            navigate('/');
        }
    }, []);

    return (
        <div style={{

            backgroundImage: `url(${loginedited})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '100%',
            //opacity: '5.0'
        }}><br></br><br></br><br></br><br></br>
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        paddingTop: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link><br></br>
                                <Link to="/doctorLogin" variant="body2">
                                    {"Doctor Loging"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}