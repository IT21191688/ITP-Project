import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../DoctorImage/logo.jpeg"
import Newdoctors from "../DoctorImage/Newdoctors.jpg"


export default function AddSalary() {
    const [name, setname] = useState("");
    const [basicsalary, setbasicsalary] = useState("");
    const [completedhours, setcompletedhours] = useState("");
    const [OTsalary, setOTsalary] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();






    function btnClick(e) {



        e.preventDefault();
        if (name.length === 0 ||
            basicsalary.length === 0 ||
            completedhours.length === 0 ||
            OTsalary.length === 0


        ) {
            setError(true)
        }


        const newSalary = {
            name,
            basicsalary,
            completedhours,
            OTsalary,

        }
        console.log(newSalary)

        axios.post("http://localhost:8050/salary/addsalary", newSalary).then(function () {

            alert("Success!!");

            navigate("/readSalary");

        }).catch(function (err) {

            alert(err);


        })


    }





    return (

        <div>
            <div>

                <div className="bg-1" style={{ height: "300px", background: '4A75D3', maxwidth: "100%" }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3>Add Salary</h3><br></br>
                    </div>
                </div>


            </div>

            <main className='background' style={{

                backgroundImage: `url(${Newdoctors})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '1'


            }} >
                <section className="h-100 h-custom gradient-custom-2" style={{ opacity: "1" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" styles="border-radius: 15px;" style={{ width: "100%" }}>
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-12">
                                                <div className="p-5">
                                                    <h3 className="fw-normal mb-5" styles="color: #4835d4;">Personal Infomation</h3>



                                                    <div>
                                                        <div className="col-md-12 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setname(e.target.value) }} style={{ color: "black" }} />
                                                                <label className="form-label" for="form3Examplev2">Doctor</label>
                                                            </div>

                                                            {error && name.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-12 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setbasicsalary(e.target.value) }} style={{ color: "black" }} />
                                                                <label className="form-label" for="form3Examplev2">Basic Salary</label>
                                                            </div>

                                                            {error && basicsalary.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-12 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setcompletedhours(e.target.value) }} style={{ color: "black" }} />
                                                                <label className="form-label" for="form3Examplev3">completed Hours</label>
                                                            </div>

                                                            {error && completedhours.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>

                                                        <div className="col-md-12 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setOTsalary(e.target.value) }} style={{ color: "black" }} />
                                                                <label className="form-label" for="form3Examplev2">OT salary</label>
                                                            </div>

                                                            {error && OTsalary.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>





                                                    <button type="button" className="btn btn-success btn-lg mt-3 mr-5" style={{ background: "#2F4FAA" }}
                                                        data-mdb-ripple-color="#2F4FAA" onClick={btnClick}>Add Salary</button>

                                                    <button type="button" className="btn btn-success btn-lg mt-3 mr-5" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate("/readSalary")}>Cancel</button>


                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>


    )
}

