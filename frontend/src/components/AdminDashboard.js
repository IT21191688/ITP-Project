import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Styles from "../Styles/AdminDashboardStyle.module.css"
import medlogo from "../siteImages/medlogo.png";
import appLogo from "../siteImages/appoinmentlogo.png";

export default function AdminDashbord() {

    const navigate = useNavigate();


    return (

        <div style={{ background: "#b3b3b3" }}>


            <div className={Styles.navigatorContainer}>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/AppoinmentAdmin") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Appoinments</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/readPrescriptionAdmin") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Orders</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/readMedicine") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Pharmacy Inventory</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/readPatients") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Patients</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/readDoctors") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Doctors</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/readSalary") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Salary</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/payments") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Payments</span>
                </div>

                <div className={Styles.navigatorContent} onClick={function () { navigate("/main") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Laboratory </span>
                </div>
                <div className={Styles.navigatorContent} onClick={function () { navigate("/showAll") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Inquiry</span>
                </div>
                <div className={Styles.navigatorContent} onClick={function () { navigate("/spaceMaintenance") }}>
                    <img src={appLogo} className={Styles.Editimg} />
                    <span className={Styles.logoText}>Rooms</span>
                </div>


            </div>

        </div >




    )
}