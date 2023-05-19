import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import logo from "../siteImages/medlogo.png";
//import successimg from "../siteImages/modal-success.png";
//import unsuccessimg from "../siteImages/model-unsuccess.png";
import moment from "moment";
import medlogo from "../patientImages/medlogo.jpeg";
import back from "../patientImages/back.jpg";
import register from "../patientImages/register.jpg";

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

                //alert(res.data.birthdate)


            }).catch(function (err) {
                alert("data not fetch");
                alert(err);
            });
        }
        getPatients();

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

        const updatePatient = {
            name,
            nic,
            address,
            birthdate,
            gender,
            phone,
            email,
            blood,
            height,
            weight,
            surgery,
            allergy
        }
        console.log(updatePatient);

        axios.put("http://localhost:8050/patient/update/" + id, updatePatient).then(function () {


            alert("Status Updated");
            navigate(-1)

            // successModel();
            //navigate("/readAppoinment");
            //window.location.reload();


        }).catch(function () {

            alert(e.err)
            alert("Student Not Updated");
            navigate("/readPatients")
            // unsuccessModel();

        })

    }



    return (



        <div className="d-up-page">

            {/*<div>

                <div className="bg-1" style={{ height: "300px", backgroundColor: "#26CCD1" }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={medlogo} className="rounded-circle" alt="Logo" width="200" height="200" />

                    </div>
                </div>

            </div>*/}
            <div
                style={{

                    backgroundImage: `url(${register})`,
                    //backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    //background-size: cover;
                    backgroundPosition: 'center',
                    maxWidth: '100%',
                    opacity: '1.0'
                }}>

                <div>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <img className="row" alt="logo" style={{ width: "100px" }} />
                                    <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Patient Update Success</b></h5>

                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="rounded border border-success pb-2 pt-2">
                                        <h5 className="text-primary">Patient Details Updated.</h5>
                                        <img style={{ width: "50px" }} />
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
                                    <img className="row" alt="logo" style={{ width: "100px" }} />
                                    <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Patient Update UnSuccess.</b></h5>

                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="rounded border border-success pb-2 pt-2">
                                        <h5 className="text-primary">Patient Details Not Updated.</h5>
                                        <img style={{ width: "50px" }} />
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/readAppoinment")} data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*<button type="button" id="model-btn" data-toggle="modal" data-target="#exampleModalCenter"></button>
            <button type="button" id="model-btn-unsuccess" data-toggle="modal" data-target="#exampleModalCenter-un"></button>*/}

                <br /><form className="container create-form border border-info rounded p-3 d-up-form" style={{ borderRadius: "50px" }}>

                    <br /><div className="d-up-header">
                        <h2>Update Profile Details</h2>
                    </div><br /><br /><br />

                    <div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Name</b></label>
                            <input placeholder='Name' className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>


                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>NIC</b></label>
                            <input placeholder='NIC' className="form-control" value={nic} onChange={(e) => setNic(e.target.value)} />
                        </div>

                    </div>

                    <br /><div class="row">

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Address</b></label>
                            <input placeholder='Address' className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Birthdate</b></label>
                            <input placeholder='Birthdate' type="date" className="form-control" value={moment(birthdate).utc().format("YYYY-MM-DD")} onChange={(e) => setBirthdate(e.target.value)} />
                        </div>

                    </div>


                    <br /><div class="row">



                        <div className="form-group form-group col-md-6 mt-3 mt-md-0">
                            <label className="font-weight-bold" for="name"><b>Gender</b></label>
                            <select class="form-control" aria-label=".form-select-lg example" value={gender} onChange={function (e) { setGender(e.target.value) }} required>

                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>



                        {/*<div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name" className="font-weight-bold">Gender</label>
                        <input placeholder='Gender' className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>*/}

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Phone Number</b></label>
                            <input placeholder='Phone Number' className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                    </div>

                    <br /><div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Email</b></label>
                            <input placeholder='Email' type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Previous Surgeries</b></label>
                            <input placeholder='Previous Surgeries' className="form-control" value={surgery} onChange={(e) => setSurgery(e.target.value)} />
                        </div>
                    </div>

                    <br /><div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Allergies</b></label>
                            <input placeholder='Allergies' type="text" className="form-control" value={allergy} onChange={(e) => setAllergy(e.target.value)} />
                        </div>

                        <div className="form-group form-group col-md-6 mt-3 mt-md-0">
                            <label className="font-weight-bold" for="name"><b>Blood Group</b></label>
                            <select class="form-control" aria-label=".form-select-lg example" value={blood} onChange={function (e) { setBlood(e.target.value) }} required>
                                <option value="A Positive">A Positive</option>
                                <option value="A Negative">A Negative</option>
                                <option value="B Positive">B Positive</option>
                                <option value="B Negative">B Negative</option>
                                <option value="O Positive">O Positive</option>
                                <option value="O Negative">O Negative</option>
                                <option value="AB Positive">AB Positive</option>
                                <option value="AB Negative">AB Negative</option>
                            </select>
                        </div>

                        {/*<div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                        <label for="name" className="font-weight-bold">Blood Group</label>
                        <input placeholder='Blood Group' type="text" className="form-control" value={blood} onChange={(e) => setBlood(e.target.value)} />
                    </div>*/}
                    </div>

                    <br /><div class="row">
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Height(cm)</b></label>
                            <input placeholder='Height(cm)' type="text" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </div>
                        <div className="form-group form-group col-md-6 mt-3 mt-md-0" >
                            <label for="name" className="font-weight-bold"><b>Weight(kg)</b></label>
                            <input placeholder='Weight(kg)' className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>

                    </div>

                    <br /><div class="row d-flex justify-content-center">

                        <button type="submit" class="btn text-white mt-2 mr-5" style={{ background: "#0297BF", width: "100px" }} onClick={btnClick}>Update</button>
                        <button type="button" class="btn text-white mt-2" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate(-1)}>Cancel</button>

                    </div><br />
                </form>
                <br />
            </div>
        </div>
    );
}