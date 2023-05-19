import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Home from "../siteImages/Home.jpeg"
import logoheader from "../siteImages/logoheader.png"
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

function HeaderNew() {
    const [user, setUser] = useState({});
    const [role, setRole] = useState("") // user object
    const logOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }



    useEffect(() => {
        const data = localStorage.getItem("user");
        setUser(JSON.parse(data));
        setRole(localStorage.getItem("role"));
    }, []);
    return (
        <header>
            <nav class="navbar navbar-expand-lg">
                <div class="container">

                    <a class="navbar-brand text-white" href="#"><img src={logoheader} alt="img" style={{ width: "60px" }} /><i class="fa fa-graduation-cap fa-lg mr-2"></i>MEDIXO E-HEALTH</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="nvbCollapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item pl-1">
                                <a class="nav-link" href="/"><i class="fa fa-home fa-fw mr-1"></i>Home</a>
                            </li>

                            {
                                role === 'admin' ?
                                    <>
                                        <li class="nav-item pl-1">
                                            <a class="nav-link" href="/admin"><i class="fa fa-th-list fa-fw mr-1"></i>Dashboard</a>
                                        </li>
                                    </> : null
                            }

                            {role === 'user' ?
                                <>
                                    <li class="nav-item pl-1">
                                        <a class="nav-link" href="/get"><i class="fa fa-th-list fa-fw mr-1"></i>Search Reports</a>
                                    </li>
                                    <li class="nav-item pl-1">
                                        <div class="dropdown">
                                            <button class="btn nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "#000000", opacity: "0.6" }}>
                                                <i class="fa fa-th-list fa-fw mr-1"></i>Services
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="/get">Lab Reports</a>
                                                <a class="dropdown-item" href="/appoinment">Channeling</a>
                                                <a class="dropdown-item" href="/add">Inquiry </a>
                                                <a class="dropdown-item" href="/addpriscription">Buy Medicine</a>
                                                <a class="dropdown-item" href="/videoconsultant">Video Consultant</a>
                                                <a class="dropdown-item" href="/saerchOrder">Saerch Order</a>
                                                <a class="dropdown-item" href="/paymentportal">Payment</a>
                                            </div>
                                        </div>
                                    </li> </> : null}
                            <li class="nav-item pl-1">
                                <a class="nav-link" href="#"><i class="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Contact Us</a>
                            </li>
                            <li class="nav-item pl-1">
                                {localStorage.getItem("user") ?
                                    <div class="dropdown">
                                        <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: 'transparent', border: "none" }}>
                                            <PersonIcon sx={{ color: "white" }} fontSize="large" />
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href={'/viewPatient/' + user._id}>Profile</a>
                                            <button type="button" class="dropdown-item" onClick={() => logOut()}>LogOut</button>
                                        </div>
                                    </div>
                                    : <a className="btn btn-primary ml-5" href='/login'>login</a>}

                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>





    )
}

export default HeaderNew;