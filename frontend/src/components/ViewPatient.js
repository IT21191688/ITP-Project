import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import medlogo from "../patientImages/medlogo.jpeg";
import ReactPrint from "react-to-print";


export default function UpdatePatient() {

    const navigate = useNavigate();

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
    const [profilePic, setProfilePic] = useState("");
    const [password, setPassword] = useState("");
    const ref = useRef()

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
                setProfilePic(res.data.profilePic)
                setPassword(res.data.password)

                // alert(res.data.birthdate)


            }).catch(function (err) {
                alert("data not fetch");
                alert(err);
            });
        }
        getPatients();

    }, []);

    return (


        <div >
            <center>
                <div>

                    <table>
                        <thead>
                        </thead>
                        <tbody ref={ref}>

                            <div>

                                <div className="bg-1" style={{ background: "#0297BF", height: "300px" }}>
                                    <div className="container text-center text-white">
                                        <h3>MEDIXO E-HEALTH</h3>
                                        <img src={medlogo} className="rounded-circle" alt="Bird" width="100" height="100" />
                                        <br></br>
                                    </div><br />

                                    <div>
                                        <tr>
                                            {/*<td className="col-md-6"><img className="logo" src="reportImages/logo.jpeg"></img></td>*/}
                                            <td className="col-md-6 text-white">
                                                <h5><b className="title">MEDIXO E- HEALTH CARE CENTER (PVT) LTD</b></h5>
                                                <h6><b className="subtitle">No. 149, Galle Road, Colombo 3, Sri Lanka</b></h6>
                                                <h6><b className="subtitle">Tel.0347 99 99 99</b></h6>
                                                <center><div><ul><b className="subtitle1"><h3>Patient Profile</h3></b></ul></div></center></td>

                                        </tr>
                                    </div>

                                </div>
                            </div>

                            <>
                                <div className="center">

                                    <div className="card" id="num">

                                        <div className="card-body">
                                            <table>
                                                <div>

                                                </div>

                                                <div>

                                                    <tr >

                                                    </tr>

                                                    <center><img height={"200px"} width={"200px"} src={`http://localhost:8050/ProfilePic/${profilePic}`} style={{ borderRadius: "200px" }} /></center><br></br><br></br>
                                                    <tr >

                                                        <td className="col-md-6"><b className="text">Name:&nbsp;&nbsp;&nbsp;{name}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>

                                                        <td className="col-md-6"><b className="text" >NIC:&nbsp;&nbsp;&nbsp;{nic}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text" > Address : &nbsp;&nbsp;&nbsp;{address}</b> &nbsp;<b className="text2"></b></td>
                                                        <td>
                                                            <b className="col-md-6 text1" >Birthdate:&nbsp;&nbsp;&nbsp; {birthdate}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Gender: &nbsp;&nbsp;&nbsp;{gender}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                        <td>
                                                            <b className="col-md-6 text1" >Mobile no: &nbsp;&nbsp;&nbsp;{phone}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                    </tr>

                                                    <tr>

                                                        <td><b className="col-md-6 text">Email: &nbsp;&nbsp;&nbsp;{email}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                        <td>
                                                            <b className="col-md-6 text1" >Blood Group: &nbsp;&nbsp;&nbsp;{blood}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                    </tr>

                                                    <tr>

                                                        <td><b className="col-md-6 text">Height:&nbsp;&nbsp;&nbsp; {height}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                        <td>
                                                            <b className="col-md-6 text1" >Weight:&nbsp;&nbsp;&nbsp; {weight}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                    </tr>

                                                    <tr>

                                                        <td><b className="col-md-6 text">Previouse Surgeries: &nbsp;&nbsp;&nbsp;{surgery}</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2"></b></td>
                                                        <td>
                                                            <b className="col-md-6 text1" >Allergies:&nbsp;&nbsp;&nbsp; {allergy}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td><br></br>

                                                    </tr>


                                                    <tr>

                                                        <td><b className="col-md-6 text" >Password:&nbsp;&nbsp;&nbsp; {password}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2"></b></td>

                                                    </tr><br></br></div>
                                            </table>

                                            <div class="row d-flex justify-content-center">

                                                <button type="submit" class="btn text-white mt-2 mr-5" style={{ background: "#0297BF", width: "100px" }} onClick={() => navigate("/updateProfile/" + id)}>Update</button>
                                                <button type="button" class="btn text-white mt-2" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate("/deleteProfile/" + id)}>Delete</button>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </>

                            <br />

                        </tbody>

                    </table>
                </div>
                <td></td>
            </center>
        </div >
    );
}