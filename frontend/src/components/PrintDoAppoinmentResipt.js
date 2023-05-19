import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import logo from "../siteImages/medlogo.png";




export default function PrintDoAppoinmentResipt() {

    const { id } = useParams();

    const [specialization, setDoctorCategory] = useState("");
    const [doctor_name, setDoctorName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appNo, setAppNo] = useState("");
    // const [status, setStatus] = useState("");

    const modDate = date.split("T00:00:00.000Z");

    //const [appdata, setAppoinemtData] = useState("");

    const ref = useRef();

    const navigate = useNavigate();


    useEffect(function () {

        function getAppoinment() {
            axios.get("http://localhost:8050/appoinment/getoneAppoinment/" + id).then((res) => {

                setDoctorCategory(res.data.specialization);
                setDoctorName(res.data.doctor_name);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setAge(res.data.age);
                setNic(res.data.nic);
                setEmail(res.data.email);
                setTelephone(res.data.telephone);
                setDate(res.data.date);
                setAppNo(res.data.appNo);
                setTime(res.data.appTime);
                //setStatus(res.data.status);



            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getAppoinment();

    }, []);

    // background: "#ced6d0"



    return (


        <>
            <main className='background' style={{
                minHeight: "100vh",
                background: "#26CDD1",
                overflow: "hidden"

            }}>
                <header>
                    <div className="mt-3">
                        <center>
                            <h1 className="text-dark">Doctor Appoinment Receipt</h1>
                        </center>
                    </div>
                </header>

                <section ref={ref} className="container border border-success rounded mt-5" style={{ background: "#FEFDFE" }} >
                    <div className="row d-flex justify-content-center mt-3">
                        <img alt="logo" src={logo} style={{ width: "100px" }} />
                        <label className="text-info"><h1>Medixo E-Health Care Center (PVT) LTD</h1></label>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="font-st">
                            <label className="font-weight-bold">Address : </label><label>MEDIXO, No 257, Matale Road, Dambulla</label><br />
                            <label className="font-weight-bold">Email : </label><label>Medxio123@gmail.com</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="font-weight-bold">Phone: </label><label>0662053122</label>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="title">
                        <div className="row d-flex justify-content-center">
                            <h2>Doctor Appoinment Receipt</h2>
                            <h1 class="border border-warning rounded-circle ml-5 bg-info" style={{ width: "50px" }}>{appNo}</h1>
                        </div>
                        <h6>(for Hospital Use)</h6>


                    </div>

                    <div class="row ml-5">
                        <div class="row">
                            <h3>&nbsp;&nbsp;&nbsp;Specialization:</h3>&nbsp;
                            <h3 className="text-secondary">{specialization}</h3>
                        </div>
                        <div class="row ml-5">
                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Doctor Name:</h3>
                            <h3 className="text-secondary">{doctor_name}</h3>
                        </div>
                        <div class="row ml-5">
                            <h3>Date:</h3>&nbsp;
                            <h3 className="text-secondary">{modDate}</h3>
                        </div>
                        <div class="row ml-5">
                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time:</h3>&nbsp;
                            <h3 className="text-secondary">{time}</h3>
                        </div>

                    </div>
                    <br></br>

                    <hr></hr>

                    <div >

                        <div class="row ml-4">
                            <div class="row mr-5">
                                <h4 >Patient Name:</h4>&nbsp;
                                <h4 className="text-secondary">{first_name + " " + last_name}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient Age:</h4>&nbsp;
                                <h4 className="text-secondary">{age}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient NIC:</h4>&nbsp;
                                <h4 className="text-secondary">{nic}</h4>
                            </div>

                        </div><br></br>

                        <div class="row ml-4">
                            <div class="row mr-5">
                                <h4>Patient Email:</h4>&nbsp;
                                <h4 className="text-secondary">{email}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient Telephone:</h4>&nbsp;
                                <h4 className="text-secondary">{telephone}</h4>
                            </div>
                        </div><br></br>

                    </div>
                    <hr></hr>

                    <div className="footer">
                        <label className="font-weight-bold"> This is a computer generated document. No signature is required.</label>
                        <label className="font-weight-bold">Print on : {`${new Date().toLocaleString()}`}</label>
                    </div>
                    <br></br>
                </section><br></br>

                <div id="printbtn" className="row d-flex justify-content-center">
                    <ReactPrint trigger={() => <button className="btn btn-primary my-2 mx-1 my-sm-0">Print</button>} content={() => ref.current} />
                    <button className="btn btn-danger" onClick={() => navigate("/backDocResipt")}>Back</button>
                </div>

            </main>
        </>




    );
} 