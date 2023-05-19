import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import docAppImg from "../siteImages/docAppoinment.png"
import labAppImg from "../siteImages/labAppoinment.png"

export default function Appoinements() {
    const navigate = useNavigate();

    const [nic, setNic] = useState("");


    return (

        <div>
            <section id="hero" class="d-flex align-items-center" style={{ background: "#26CCD1" }}>

                <div class="container">
                    <div class="row">

                        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">

                            <h2 className="text-white pr-5">Channel a doctor quick and easy with <br />Direct Appoinments at<br /> Medixo E-Health</h2>
                            <div class="d-flex ml-5">
                                <button class="btn-get-started scrollto ml-5" onClick={() => navigate("/AddAppoinment")} style={{ cursor: "pointer" }}>Make Doctor Appoinment</button>
                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img">
                            <div className="row ml-5 mb-5 float-right float-top">
                                <div class="input-group">
                                    <div class="form-outline pr-3">
                                        <input type="search" id="form1" class="form-control" placeholder="Enter Your NIC" onChange={e => setNic(e.target.value)} />
                                    </div>
                                    <button type="button" class="btn btn-primary" onClick={() => navigate("/SearchAppoinment/" + nic)}>Search</button>
                                </div>
                            </div>
                            <img src={docAppImg} class="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>

            </section >

            <section id="hero" class="d-flex align-items-center" style={{ background: "#a9edef" }}>

                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-2 d-flex flex-column justify-content-center">
                            <h2 className="text-white pr-5">Make A Lab Test Appoinments quick and<br /> easy Direct Appoinments at<br /> Medixo E-Health</h2>
                            <div class="d-flex ml-5">
                                <button class="btn-get-started scrollto ml-5" onClick={() => navigate("/AddLabAppoinment")} style={{ cursor: "pointer" }}>Make LabTest appoinment</button>
                            </div>
                        </div>
                        <div class="col-lg-6 order-2 order-lg-1 hero-img">
                            <img src={labAppImg} class="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>

            </section>

        </div >


    )

}
