import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import logo from "../siteImages/medlogo.png";




export default function PrintDoAppoinmentResipt() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [surgery, setSurgery] = useState("");
    const [allergy, setAllergy] = useState("");
    const [blood, setBlood] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");


    //const [appdata, setAppoinemtData] = useState("");

    const ref = useRef();

    const navigate = useNavigate();


    useEffect(function () {

        function getPatients() {
            axios.get("http://localhost:8050/patient/get/" + id).then((res) => {

                setName(res.data.name)
                setNic(res.data.nic)
                setAddress(res.data.address)
                setBirthdate(res.data.birthdate)
                setGender(res.data.gender)
                setPhone(res.data.phone)
                setEmail(res.data.email)
                setSurgery(res.data.surgery)
                setAllergy(res.data.allergy)
                setBlood(res.data.blood)
                setHeight(res.data.height)
                setWeight(res.data.weight)

                alert(res.data.birthdate)



            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getPatients();

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
                            <h1 className="text-dark">Doctor Appoinment Recipt</h1>
                        </center>
                    </div>
                </header>

                <section ref={ref} className="container border border-success rounded" style={{ background: "#FEFDFE" }} >
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
                            <h2>Doctor Appoinment Resipt</h2>
                            <h1 class="border border-warning rounded-circle ml-5 bg-info" style={{ width: "50px" }}>{appNo}</h1>
                        </div>
                        <h6>(for Hospital Usess)</h6>


                    </div>

                    <div class="row ml-4">
                        <div class="row">
                            <h4>Doctor Category:</h4>&nbsp;
                            <h4>{name}</h4>
                        </div>
                        <div class="row ml-5">
                            <h4>Doctor Name:</h4>&nbsp;
                            <h4>{nic}</h4>
                        </div>
                        <div class="row ml-5">
                            <h4>Date:</h4>&nbsp;
                            <h4>{modDate}</h4>
                        </div>
                        <div class="row ml-5">
                            <h4>Time:</h4>&nbsp;
                            <h4>{time}</h4>
                        </div>

                    </div>

                    <hr></hr>

                    <div >

                        <div class="row ml-4">
                            <div class="row mr-5">
                                <h4>Patient Name:</h4>&nbsp;
                                <h4>{first_name + " " + last_name}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient Age:</h4>&nbsp;
                                <h4>{age}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient NIC:</h4>&nbsp;
                                <h4>{nic}</h4>
                            </div>

                        </div><br></br>

                        <div class="row ml-4">
                            <div class="row mr-5">
                                <h4>Patient Email:</h4>&nbsp;
                                <h4>{email}</h4>
                            </div>
                            <div class="row mr-5">
                                <h4>Patient Telephone:</h4>&nbsp;
                                <h4>{telephone}</h4>
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