import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import appoinmentAdminpgBack from "../siteImages/appoinmentAdminPageBack.jpg";
import chartImage from "../siteImages/chartImage.jpg";
import logo from "../siteImages/medlogo.png";



export default function GenerateReports() {


    //class component waladi componentdidmount
    //session json with tocken
    const [channeling, setChanneling] = useState([]);
    const [labTestType, setLabTestType] = useState("");
    const [dname, setDoctorName] = useState("");

    useEffect(function () {


        function getDoctorName() {
            axios.get("http://localhost:8050/doctor/readDoctor").then(function (res) {

                console.log(res.data);

                setChanneling(res.data);


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getDoctorName();
        setDoctorName("sadeepa lakshan");
        setLabTestType("Creatinine");

    }, [])

    return (





        <section class="container" style={{

            backgroundImage: `url(${appoinmentAdminpgBack})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            position: 'center',
            maxWidth: '100%'
        }}>



            <div className="container-lg" style={{ height: "300px", background: "#26CDD1" }}>
                <div className="container text-center text-light">
                    <h3>MEDIXO E-HEALTH</h3>
                    <img src={logo} className="rounded-circle bg-light" alt="Bird" width="200" height="200" />
                    <h3>Generate Chart</h3><br></br>
                </div>
            </div>



            <div class="row" >
                <div class="col-md-5 justify-content-center mt-3 container ml-5 border border-success rounded" style={{ opacity: "0.8", background: "#718FD2" }} >
                    <br></br>
                    <h2 className="text-light">Doctor Appoinment Reports</h2>
                    <div className="form-group mt-5" >
                        <label for="name" className="mt-4"><b ><h3>Select Doctor</h3></b></label>
                        <select className="form-control" onChange={e => setDoctorName(e.target.value)}>
                            {channeling.map(item => (
                                <option key={item.firstname + " " + item.lastname} value={item.firstname + " " + item.lastname}>{item.firstname + " " + item.lastname}</option>
                            ))}
                        </select>
                    </div><br />

                    <a href={'/generateDoctorReport/' + dname}><button class="btn btn-lg text-light" style={{ background: "#26CDD1" }}>Generate Chart</button></a>
                    <br></br><br></br><br></br>
                </div>
                <div class="col-md-5 justify-content-center mt-3  mr-5 border border-success rounded" style={{ opacity: "0.8", background: "#718FD2" }}>
                    <br></br>
                    <h2 className="text-light">Lab Appoinment Reports</h2>
                    <div className="form-group mt-5">
                        <label for="name" className="mt-4"><b><h3>Lab Test Category</h3></b></label>
                        <select className="form-control" onChange={e => setLabTestType(e.target.value)} required>
                            <option key={"Creatinine"} value={"Creatinine"}>Creatinine</option>
                            <option key={"CRP"} value={"CRP"}>CRP</option>
                            <option key={"Electrolytes"} value={"Electrolytes"}>Electrolytes</option>
                            <option key={"ESR"} value={"ESR"}>ESR</option>
                            <option key={"FastingBloodSugar"} value={"FastingBloodSugar"}>Fasting Blood Sugar</option>
                            <option key={"FullBloodCount"} value={"FullBloodCount"}>Full Blood Count</option>
                            <option key={"UrineFR"} value={"UrineFR"}>Urine FR</option>
                        </select>
                    </div>
                    <br />

                    <a href={'/generateLabTestReport/' + labTestType}><button class="btn btn-lg text-light" style={{ background: "#26CDD1" }}>Generate Chart</button></a>
                    <br></br><br></br><br></br>
                </div>

            </div>
        </section >




    );
}
