import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import logo from "../DoctorImage/logo.jpeg";




export default function PrintDoctort() {

    const [readPrescription, setreadPrescription] = useState([]);

    const { id } = useParams();

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [age, setage] = useState("");
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [gender, setgender] = useState("");
    const [maritalstatus, setmaritalstatus] = useState("");
    const [specialization, setspecialization] = useState("");
    const [experianceduration, setexperianceduration] = useState("");
    const [previousehospitals, setpreviousehospitals] = useState("");
    const [awards, setawards] = useState("");
    const [workingdays, setworkingdays] = useState("");
    const [file_path, setfile_path] = useState("");
    const [error, setError] = useState("");




    //const [appdata, setAppoinemtData] = useState("");

    const ref = useRef();

    const navigate = useNavigate();


    useEffect(function () {

        function getDoctor() {
            axios.get("http://localhost:8050/doctor/get/" + id).then((res) => {

                setfirstname(res.data.firstname);
                setlastname(res.data.lastname);
                setage(res.data.age);
                setaddress(res.data.address);
                setemail(res.data.email);
                setmobile(res.data.mobile);
                setgender(res.data.gender);
                setmaritalstatus(res.data.maritalstatus);
                setspecialization(res.data.specialization);
                setexperianceduration(res.data.experianceduration);
                setpreviousehospitals(res.data.previousehospitals);
                setawards(res.data.awards);
                setworkingdays(res.data.workingdays);
                setfile_path(res.data.file_path);


                //alert(res.data.file_path)

            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getDoctor();

    }, []);

    // background: "#ced6d0"



    return (
        <div>

            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3>Print Doctor Profile</h3><br></br>
                    </div>
                </div>


            </div>


            <>
                <main className='background' style={{
                    minHeight: "100vh",
                    background: "white",
                    overflow: "hidden",
                    paddingBottom: "100px",


                }}>
                    <header>
                        <div className="mt-3">
                            <center>
                                <h1 className="text-dark"></h1>
                            </center>
                        </div>
                    </header>

                    <section ref={ref} className="container border border-success rounded" style={{ background: "#FEFDFE" }} >
                        <div className="row d-flex justify-content-center mt-3">

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







                        <div >
                            <div class="row mr-5">
                                <h4>Doctor Profile:</h4>&nbsp;
                                <h4><img
                                    className="rounded-circle"
                                    id="myImg"
                                    height={"200px"}
                                    alt="Snow"
                                    src={`http://localhost:8050/DoctorImage/${file_path}`}
                                    style={{ cursor: 'pointer' }}
                                /></h4>
                            </div>

                            <div style={{ alignContent: "center" }}>
                                <div class="row mr-5">
                                    <h4>Patient Name: {firstname + " " + lastname}</h4>
                                </div><br />

                                <div class="row mr-5">
                                    <h4>Patient Age: {age}</h4>
                                </div><br />

                                <div class="row mr-5">
                                    <h4>Address: {address}</h4>
                                </div><br />

                                <div class="row mr-5">
                                    <h4>E-mail: {email}</h4>
                                </div>
                                <br />

                                <div class="row mr-5">
                                    <h4>Mobile No: {mobile} </h4>;
                                </div>
                                <br />

                                <div class="row mr-5">
                                    <h4>Gender: {gender} </h4>;
                                </div>
                                <br />

                                <div class="row mr-5">
                                    <h4>Specialization: {specialization}</h4>
                                </div>
                                <br />

                                <div class="row mr-5">
                                    <h4>Working Days: {workingdays} </h4>;
                                </div>
                                <br />

                            </div>

                        </div><br></br>


                        {/* <hr></hr>*/}

                        <div className="footer">
                            <label className="font-weight-bold"> This is a computer generated document.</label>
                            <label className="font-weight-bold">Print on : {`${new Date().toLocaleString()}`}</label>
                        </div>
                        <br></br>



                    </section><br></br>

                    <div class="row d-flex justify-content-center">


                        <ReactPrint trigger={() => <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" style={{ backgroundColor: "#26CCD1" }}>Print</button>} content={() => ref.current} />
                        <br />

                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0" onClick={() => navigate("/readDoctors")}>Cancel</button>


                    </div>


                </main>
            </>
        </div>



    );
}