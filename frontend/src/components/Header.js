import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import medlogo from "../siteImages/medlogo.png";

import Styles from "../Styles/AdminDashboardStyle.module.css"

export default function Header() {
    const navigate = useNavigate();
    return (
        <>
            <div className={Styles.navigatorHeader}>

                <img src={medlogo} className={Styles.dashlogo} />
                <span id={Styles.clogo} className={Styles.logoText}>Medixo-E-Health</span>

                <a className="btn ml-5" href='/'>Home</a>
                <a className="btn ml-5" href='/admin'>DashBoard</a>

            </div>

            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        <li class="nav-item">
                            <Link to="/appoinment" className="nav-link">appoinment</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/appoinmentAdmin" className="nav-link">Appoinment Admin</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/adminDashboard" className="nav-link">Admin</Link>
                        </li>

                    </ul>
                </div>
            </nav> */}
        </>
    )
}