import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../siteImages/medlogo.png";
import successimg from "../siteImages/modal-success.png";
import unsuccessimg from "../siteImages/model-unsuccess.png";
import appoinmentAdminpgBack from "../siteImages/appoinmentAdminPageBack.jpg";



export default function UpdateLabAppoinment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [file_path, setImage] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [appNo, setAppoinmentNo] = useState("")
    const [appTime, setTime] = useState("");
    const [labTest, setLabTestType] = useState("");


    useEffect(function () {

        function getLabAppoinment() {
            axios.get("http://localhost:8050/labappoinment/getonelabAppoinment/" + id).then((res) => {

                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setAge(res.data.age);
                setNic(res.data.nic);
                setEmail(res.data.email);
                setTelephone(res.data.telephone);;
                setImage(res.data.file_path);
                setStatus(res.data.status);
                setDate(res.data.date);
                setAppoinmentNo(res.data.appNo);
                setTime(res.data.appTime);
                setLabTestType(res.data.labTest);

                //alert(res.data.first_name)


            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getLabAppoinment();
        setStatus("pending")

    }, []);



    function successModel() {

        const modelBtn = document.getElementById("model-btn")
        modelBtn.click();

    }

    function unsuccessModel() {

        const modelBtn = document.getElementById("model-btn-unsuccess")
        modelBtn.click();

    }

    function btnClick(e) {

        e.preventDefault();

        const updateLabAppoinment = {
            first_name,
            last_name,
            age,
            nic,
            email,
            telephone,
            file_path,
            status,
            date,
            labTest,
            appNo,
            appTime

        }
        console.log(updateLabAppoinment);

        axios.put("http://localhost:8050/labappoinment/updatelabAppoinment/" + id, updateLabAppoinment).then(function () {

            alert("Status Updated");
            successModel();


        }).catch(function () {

            alert("Student Not Updated");
            unsuccessModel();

        })

    }


    return (



        <div className="" style={{
            minHeight: "100vh",
            backgroundImage: `url( ${appoinmentAdminpgBack})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            position: 'center',
            maxWidth: '100%',
            opacity: "0.9"
        }}>

            <div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <img className="row" src={logo} alt="logo" style={{ width: "100px" }} />
                                <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Appoinment Update Success</b></h5>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="rounded border border-success pb-2 pt-2">
                                    <h5 className="text-primary">Lab Appoinment Details Updated.</h5>
                                    <img src={successimg} style={{ width: "50px" }} />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/readLabAppoinment")} data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div>
                <div class="modal fade" id="exampleModalCenter-un" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <img className="row" src={logo} alt="logo" style={{ width: "100px" }} />
                                <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Lab Appoinment Update UnSuccess.</b></h5>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="rounded border border-success pb-2 pt-2">
                                    <h5 className="text-primary">Appoinment Details Not Updated.</h5>
                                    <img src={unsuccessimg} style={{ width: "50px" }} />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/readLabAppoinment")} data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" id="model-btn" data-toggle="modal" data-target="#exampleModalCenter"></button>
                <button type="button" id="model-btn-unsuccess" data-toggle="modal" data-target="#exampleModalCenter-un"></button>

            </div>
            <h2 className="mt-2">Update Lab Test Appoinment Details</h2>
            <h4 className="text-success">Patient Name:&nbsp;{first_name + " " + last_name}</h4>
            <form className="create-form container mt-4 create-form border border-info rounded p-3 d-up-form" style={{ background: "#F7F7F7", opacity: "0.9", borderRadius: '10px' }}>

                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">First Name</label>
                        <input placeholder='First Name' className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Last Name</label>
                        <input placeholder='Last Name' className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Age</label>
                        <input placeholder='Age' className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">E-mail</label>
                        <input placeholder='E-mail' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">NiC</label>
                        <input placeholder='NIC' className="form-control" value={nic} onChange={(e) => setNic(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Telephone</label>
                        <input placeholder='Telephone' className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                    </div>
                </div>

                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Date</label>
                        <input placeholder='Position' className="form-control" value={date} onChange={(e) => setDate(e.target.value)} readOnly />
                    </div>
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Priscription</label>
                        <input placeholder='CV Data' className="form-control" value={file_path} onChange={(e) => setImage(e.target.value)} readOnly />
                    </div>
                </div>
                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Test Category</label>
                        <input placeholder='Status' className="form-control" value={labTest} readOnly />
                    </div>
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Appoinment No</label>
                        <input placeholder='Status' className="form-control" value={appNo} readOnly />
                    </div>
                </div>
                <div class="row">
                    <div className="form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name">Appoinment Time</label>
                        <input placeholder='Status' className="form-control" value={appTime} readOnly />
                    </div>
                    <div className="form-group col-md-6 mt-3 mt-md-0">
                        <label for="name"><b>Status</b></label>
                        <select className="form-control" onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option key={"pending"} value={"pending"}>pending</option>
                            <option key={"unsuccess"} value={"unsuccess"}>unsuccess</option>
                            <option key={"success"} value={"success"}>success</option>
                            <option key={"cancel"} value={"cancel"}>Cancel</option>
                        </select>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">

                    <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={() => navigate("/readLabAppoinment")}>Cancel</button>
                    <button type="submit" className="btn col-md-4 mt-0 mt-md-0 d-up-btn-update" onClick={btnClick}>Update</button>
                </div>
            </form>
        </div >
    );
} 