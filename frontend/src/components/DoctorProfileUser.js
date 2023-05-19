import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import logo from "../DoctorImage/logo.jpeg"
import doc1 from "../DoctorImage/doc1.jpg"
import { useNavigate } from "react-router-dom";

export default function DoctorProfileUser() {

    const { id } = useParams();
    const navigate = useNavigate();

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
                setfile_path(res.data.file_path);
                setworkingdays(res.data.workingdays);




            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getDoctor();

    }, []);






    return (


        <div>



            <div>

                <div>

                    <div className="bg-1" style={{ height: "300px" }}>
                        <div className="container text-center">
                            <h3>MEDIXO E-HEALTH</h3>
                            <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                            <h3>View Profile</h3><br></br>
                        </div>
                    </div>


                </div>

                <h2>Doctor Name : {firstname + " " + lastname}</h2>


                <main className='background' style={{

                    backgroundImage: `url(${doc1})`,
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maxWidth: '100%',
                    opacity: '0.8'


                }}>
                    <center>
                        <div>


                            <table>
                                <thead>
                                </thead>
                                <tbody>


                                    <>
                                        <div className="out">

                                            <div className="card" id="num" style={{ width: "800px" }} >

                                                <div className="card-body">
                                                    <table style={{ margin: 'auto' }}>
                                                        <div>

                                                        </div>

                                                        <div>

                                                            <tr >



                                                            </tr>

                                                            <center><img height={"200px"} width={"200px"} className="rounded-circle" src={`http://localhost:8050/DoctorImage/${file_path}`} style={{ borderRadius: "200pxm k" }} /></center><br></br><br></br>
                                                            <tr >

                                                                <td className="col-md-6"><b className="text-black">firstname:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{firstname}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>

                                                                <td className="col-md-6"><b className="text-black" >lastname:&nbsp;&nbsp;&nbsp;{lastname}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>

                                                            </tr>
                                                            <tr>

                                                                <td><b className="col-md-6 text-black" > Age : &nbsp;&nbsp;&nbsp;{age}</b> &nbsp;<b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >Address:&nbsp;&nbsp;&nbsp; {address}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td><br></br>

                                                            </tr>
                                                            <tr>

                                                                <td><b className="col-md-6 text-black">Email: &nbsp;&nbsp;&nbsp;{email}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >Mobile no: &nbsp;&nbsp;&nbsp;{mobile}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                            </tr>

                                                            <tr>

                                                                <td><b className="col-md-6 text-black">Gender: &nbsp;&nbsp;&nbsp;{gender}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >Marital status: &nbsp;&nbsp;&nbsp;{maritalstatus}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                            </tr>

                                                            <tr>

                                                                <td><b className="col-md-6 text-black">Specialization:&nbsp;&nbsp;&nbsp; {specialization}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >experiance Duration:&nbsp;&nbsp;&nbsp; {experianceduration}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                            </tr>

                                                            <tr>

                                                                <td><b className="col-md-6 text-black">previouse Hospitals: &nbsp;&nbsp;&nbsp;{previousehospitals}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >Awards:&nbsp;&nbsp;&nbsp; {awards}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                            </tr>


                                                            <tr>

                                                                <td><b className="col-md-6 text-black" >Working Days:&nbsp;&nbsp;&nbsp; {workingdays}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>
                                                                <td>
                                                                    <b className="col-md-6 text1-black" >Marital Status:&nbsp;&nbsp;&nbsp; {maritalstatus}</b> &nbsp;&nbsp;&nbsp;<b className="text2"></b></td><br></br>

                                                            </tr><br></br></div>
                                                        <center>
                                                            <button type="button" className="btn btn-success btn-lg mt-3" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate(-1)}>Logout</button>
                                                        </center>
                                                    </table>


                                                    <hr className="hr1" color={"purple"} />




                                                </div>

                                            </div>
                                        </div>
                                    </>


                                </tbody>
                            </table>



                        </div>


                    </center>
                </main>
            </div >
        </div>





    );
} 