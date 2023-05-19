import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../siteImages/medlogo.png";
import successimg from "../siteImages/modal-success.png";
import unsuccessimg from "../siteImages/model-unsuccess.png";
import appoinmentAdminpgBack from "../siteImages/appoinmentAdminPageBack.jpg";


export default function UpdateAppoinment() {

    const navigate = useNavigate();

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
    const [status, setStatus] = useState("");
    const [appNo, setAppoinmentNo] = useState("")
    const [appTime, setTime] = useState("");


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
                setStatus(res.data.status);
                setAppoinmentNo(res.data.appNo);
                setTime(res.data.appTime);


            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getAppoinment();
        setStatus("pending");

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

        const updateAppoinment = {
            specialization,
            doctor_name,
            first_name,
            last_name,
            age,
            nic,
            email,
            telephone,
            status,
            date,
            appNo,
            appTime
        }
        console.log(updateAppoinment);

        axios.put("http://localhost:8050/appoinment/updateAppoinment/" + id, updateAppoinment).then(function () {

            alert("Status Updated");
            successModel();
            //navigate("/readAppoinment");
            //window.location.reload();


        }).catch(function () {

            alert(e.err)
            alert("Student Not Updated");
            unsuccessModel();

        })

    }

    return (



        <div className="d-up-page" style={{
            background: "#26CDD1",
            backgroundImage: `url( ${appoinmentAdminpgBack})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            position: 'center',
            maxWidth: '100%',
            opacity: "0.9"
        }}>

            <div >
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
                                    <h5 className="text-primary">Appoinment Details Updated.</h5>
                                    <img src={successimg} style={{ width: "50px" }} />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/readAppoinment")} data-dismiss="modal">OK</button>
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
                                <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Appoinment Update UnSuccess.</b></h5>

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
                                <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/readAppoinment")} data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <button type="button" id="model-btn" data-toggle="modal" data-target="#exampleModalCenter"></button>
            <button type="button" id="model-btn-unsuccess" data-toggle="modal" data-target="#exampleModalCenter-un"></button>
            <div>
                <div className="">
                    <h1>Update Appoinment Details</h1>
                    <h4 className="text-success">Patient Name:&nbsp;{first_name + " " + last_name}</h4>
                </div>
                <form className="container create-form border border-info rounded p-3 d-up-form" style={{ background: "#F7F7F7", opacity: "0.9" }}>

                    <div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Doctor Category</label>
                            <input placeholder='First Name' className="form-control" value={specialization} onChange={(e) => setDoctorCategory(e.target.value)} readOnly />
                        </div>


                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Doctor name</label>
                            <input placeholder='Last Name' className="form-control" value={doctor_name} onChange={(e) => setDoctorName(e.target.value)} readOnly />
                        </div>

                    </div>

                    <div class="row">

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">First Name</label>
                            <input placeholder='Age' className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Last name</label>
                            <input placeholder='E-mail' className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                    </div>


                    <div class="row">

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Age</label>
                            <input placeholder='NIC' className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Nic</label>
                            <input placeholder='Telephone' className="form-control" value={nic} onChange={(e) => setNic(e.target.value)} />
                        </div>

                    </div>

                    <div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Email</label>
                            <input placeholder='Position' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Telephone</label>
                            <input placeholder='CV Data' className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                    </div>

                    <div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Date</label>
                            <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} readOnly />
                        </div>

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Appoinment Number</label>
                            <input type="text" className="form-control" value={appNo} onChange={(e) => setStatus(e.target.value)} readOnly />
                        </div>
                    </div>

                    <div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold">Time</label>
                            <input type="text" className="form-control" value={appTime} onChange={(e) => setStatus(e.target.value)} readOnly />
                        </div>
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Status</b></label>
                            <select className="form-control" onChange={(e) => setStatus(e.target.value)} value={status} required>
                                <option key={"pending"} value={"pending"}>pending</option>
                                <option key={"unsuccess"} value={"unsuccess"}>unsuccess</option>
                                <option key={"success"} value={"success"}>success</option>
                                <option key={"cancel"} value={"cancel"}>Cancel</option>
                            </select>
                        </div>

                    </div>

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={() => navigate("/readAppoinment")}>Cancel</button>
                        <button type="submit" className="btn col-md-4 mt-0 mt-md-0 d-up-btn-update" onClick={btnClick}>Update</button>

                    </div><br />

                </form>
                <br />
            </div>
        </div >
    );
} 