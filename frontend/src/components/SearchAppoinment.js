import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link, Navigate, NavLink, props } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AppoinmentSearch from "../siteImages/AppoinmentSearchImg.jpg";


export default function ReadAppoinment() {

    //class component waladi componentdidmount
    //session json with tocken
    const [appoinments, setAppoinments] = useState([]);
    const [labAppoinments, setLabAppoinment] = useState([]);

    const { nic } = useParams();

    const navigate = useNavigate();

    useEffect(function () {

        function getAppoinment() {
            axios.get("http://localhost:8050/appoinment/readAppoinment").then(function (res) {

                console.log(res.data);

                setAppoinments(res.data);

                console.log(res.data.file_path)



            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getAppoinment();

        handleFilterChange();


        function getLabAppoinment() {
            axios.get("http://localhost:8050/labappoinment/readlabAppoinment").then(function (res) {

                console.log(res.data);

                //setLabAppoinmentDate(res.data.date);
                setLabAppoinment(res.data);



            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getLabAppoinment();


    }, [])

    const [filter, setFilter] = useState("");

    function handleFilterChange(e) {
        setFilter(nic);
    }

    const filteredReports = appoinments.filter((rep) => {
        return rep.nic.toLowerCase().includes(filter.toLowerCase());
    })

    const filteredReportslab = labAppoinments.filter((rep) => {
        return rep.nic.toLowerCase().includes(filter.toLowerCase());
    })




    return (
        <section className="" style={{
            overflow: "hidden",
            width: "100%",
            height: "100vh",
            backgroundSize: 'cover',
            backgroundImage: `url( ${AppoinmentSearch})`,
            opacity: "1"
        }}>

            <div className="row mt-5">
                <section className="col-md-6">
                    <h1 className="text-dark">Doctor Appoinments</h1>
                    {filteredReports.map((appoinment) => (

                        <div class="container" style={{ paddingBottom: "20px" }}>
                            <div class="card text-center">
                                <div class="row card-header pl-5">
                                    Nic:{appoinment.nic}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Patient Name:{appoinment.first_name + " " + appoinment.last_name}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Age:{appoinment.age}&nbsp;&nbsp;&nbsp;&nbsp;<br />
                                    Doctor Name:{appoinment.doctor_name}&nbsp;&nbsp;&nbsp;
                                    Doctor Category:{appoinment.doctor_category}&nbsp;&nbsp;

                                </div>
                                <div class="card-body">
                                    <h6 class="card-text">Appoinment Date:{appoinment.date}</h6>
                                    <h6 class="card-text">Appoinment Time:{appoinment.appTime}</h6>
                                    <h3 class="card-text">Appoinment Number:&nbsp;{appoinment.appNo}</h3>
                                </div>
                            </div>
                        </div>


                    ))}
                    <br />
                </section>
                <section className="col-md-6">

                    <h1 className="text-dark">Lab Appoinments</h1>
                    {filteredReportslab.map((labappoinment) => (

                        <div class="container">
                            <div class="card text-center">
                                <div class="row card-header pl-5">
                                    Nic:{labappoinment.nic}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Patient Name:{labappoinment.first_name + " " + labappoinment.last_name}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Age:{labappoinment.age}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Lab Test:{labappoinment.labTest}&nbsp;&nbsp;&nbsp;&nbsp;
                                    Lab Name:&nbsp;Medixo Lab


                                </div>
                                <div class="card-body">
                                    <h6 class="card-text">Appoinment Date:{labappoinment.date}</h6>
                                    <h6 class="card-text">Appoinment Time:{labappoinment.appTime}</h6>
                                    <h3 class="card-text">Appoinment Number:&nbsp;{labappoinment.appNo}</h3>
                                </div>
                            </div>
                        </div>


                    ))}

                    <br></br>
                </section>


            </div >
            <br></br>
            <div className="fixed-bottom">
                <button type="submit" className="btn btn-danger col-md-3 mt-0 mr-5 justify-content-center" onClick={() => navigate("/appoinment")}>Back To Appoinment</button><br>
                </br><br>
                </br>
            </div>


        </section >



    )


}