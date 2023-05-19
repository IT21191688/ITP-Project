import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../DoctorImage/logo.jpeg"
import doc1 from "../DoctorImage/doc1.jpg"




export default function UpdateDoctor() {

    const navigate = useNavigate();

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
                setworkingdays(res.data.workingdays);




            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getDoctor();

    }, []);


    function btnClick(e) {

        e.preventDefault();
        if (firstname.length === 0 ||
            lastname.length === 0 ||
            age.length === 0 ||
            address.length === 0 ||
            email.length === 0 ||
            mobile.length === 0 ||
            gender.length === 0 ||
            maritalstatus.length === 0 ||
            specialization.length === 0 ||
            workingdays.length === 0


        ) {
            setError(true)
        }

        const updateDoctor = {
            firstname,
            lastname,
            age,
            address,
            email,
            mobile,
            gender,
            maritalstatus,
            specialization,
            experianceduration,
            previousehospitals,
            awards,
            workingdays


        }
        console.log(updateDoctor);

        axios.put("http://localhost:8050/doctor/update/" + id, updateDoctor).then(function () {

            alert("Status Updated");
            navigate("/readDoctors");
            window.location.reload();


        }).catch(function () {

            alert(e.err)
            alert("Student Not Updated");

        })

    }

    return (



        <div className="">

            <div>

                <div className="bg-1" style={{ height: "300px" }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3>Update Doctor</h3><br></br>
                    </div>
                </div>


            </div>

            <main className='background' style={{

                backgroundImage: `url(${doc1})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'


            }} >

                <section className="h-100 h-custom gradient-custom-2 " style={{ opacity: "0.8" }}>
                    <div className=" py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" styles="border-radius: 15px;">
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <h3 className="fw-normal mb-5" styles="color: #4835d4;">Personal Infomation</h3>


                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" value={firstname} onChange={function (e) { setfirstname(e.target.value); }} />
                                                                <label className="form-label" for="form3Examplev2">First name</label>
                                                            </div>

                                                            {error && firstname.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" value={lastname} onChange={function (e) { setlastname(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Last name</label>
                                                            </div>

                                                            {error && lastname.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="number" id="form3Examplev2" className="form-control form-control-lg" value={age} onChange={function (e) { setage(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev2">Age</label>
                                                            </div>

                                                            {error && age.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" value={address} onChange={function (e) { setaddress(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Address</label>
                                                            </div>

                                                            {error && address.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="email" id="form3Examplev2" className="form-control form-control-lg" value={email} onChange={function (e) { setemail(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev2">E-mail</label>
                                                            </div>

                                                            {error && email.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" value={mobile} onChange={function (e) { setmobile(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Mobile</label>
                                                            </div>

                                                            {error && mobile.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-group form-group col-md-6 mt-3 mt-md-0">
                                                                <label className="font-weight-bold" for="name">Gender</label>
                                                                <select class="form-control" aria-label=".form-select-lg example" value={gender} onChange={function (e) { setgender(e.target.value) }} required>

                                                                    <option value="Female">Female</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Other">Other</option>
                                                                </select>


                                                            </div>

                                                            {error && gender.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-group form-group col-md-6 mt-3 mt-md-0">
                                                                <label className="font-weight-bold" for="name">Marital Status</label>
                                                                <select class="form-control" aria-label=".form-select-lg example" value={maritalstatus} onChange={function (e) { setmaritalstatus(e.target.value) }} required>

                                                                    <option value="Single">Single</option>
                                                                    <option value="Married">Married</option>

                                                                </select>
                                                            </div>

                                                            {error && maritalstatus.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                            <div className="col-lg-6 bg-indigo text-black">
                                                <div className="p-5">
                                                    <h3 className="fw-normal mb-5" >Professional information</h3>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea2" className="form-control form-control-lg" value={specialization} onChange={function (e) { setspecialization(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea2">Specialization</label>
                                                        </div>

                                                        {error && specialization.length <= 0 ?
                                                            <label style={{ color: "red" }}>*required</label> : ""}

                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea3" className="form-control form-control-lg" value={experianceduration} onChange={function (e) { setexperianceduration(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea3">Experiance duration</label>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea6" className="form-control form-control-lg" value={previousehospitals} onChange={function (e) { setpreviousehospitals(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea6">Previouse hospitals</label>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea6" className="form-control form-control-lg" value={awards} onChange={function (e) { setawards(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea6">awards</label>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea6" className="form-control form-control-lg" value={workingdays} onChange={function (e) { setworkingdays(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea6">Working days</label>
                                                        </div>

                                                        {error && workingdays.length <= 0 ?
                                                            <label style={{ color: "red" }}>*required</label> : ""}

                                                    </div>




                                                    {/*<div className="form-check d-flex justify-content-start mb-4 pb-3">
                                                    <input className="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label text-black" for="form2Example3">
                                                        I do accept the <a href="#!" className="text-black"><u>Terms and Conditions</u></a> of your
                                                        site.
                                                    </label>
                                                    </div>*/}


                                                </div>

                                            </div>
                                            <center>
                                                <button type="button" className="btn btn-light btn-lg " style={{ background: "#00FFFF" }}
                                                    data-mdb-ripple-color="#2F4FAA" onClick={btnClick}>Update</button>
                                            </center>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}