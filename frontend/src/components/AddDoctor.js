import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../DoctorImage/logo.jpeg"
import Newdoctors from "../DoctorImage/kamiEdited.jpeg"


export default function AddDoctor() {
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
    const navigate = useNavigate();
    let [ageValid, setAgevalid] = useState(false);


    function handleImage(e) {
        setfile_path(e.target.files[0])
    }



    function btnClick(e) {



        e.preventDefault();
        validateAge(age)


        function validateAge(Age) {
            if (Age < 0) {
                setAgevalid(true)

            } else {
                setAgevalid(false)
            }
        }


        if (firstname.length === 0 ||
            lastname.length === 0 ||
            age.length === 0 ||
            address.length === 0 ||
            email.length === 0 ||
            mobile.length === 0 ||
            gender.length === 0 ||
            maritalstatus.length === 0 ||
            specialization.length === 0 ||
            workingdays.length === 0 ||
            file_path.length === 0

        ) {
            setError(true)
        }
        if (mobile.length >= 11) {
            setError(true)
        }
        if (age <= 0) {
            setError(true)
        }




        const formData = new FormData();

        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('age', age);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('maritalstatus', maritalstatus);
        formData.append('specialization', specialization);
        formData.append('experianceduration', experianceduration);
        formData.append('previousehospitals', previousehospitals);
        formData.append('awards', awards);
        formData.append('workingdays', workingdays);
        formData.append('file_path', file_path);

        //alert(firstname)



        axios.post("http://localhost:8050/doctor/add", formData).then(function () {

            alert("Success!!");

            navigate("/readDoctors")

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
                        <h3>Add new doctors</h3><br></br>
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
                //opacity: '1'


            }} >
                <section className="h-100 h-custom gradient-custom-2" style={{ opacity: "1" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" styles="border-radius: 15px;" style={{ width: "100%" }}>
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <h3 className="fw-normal mb-5" styles="color: #4835d4;">Personal Infomation</h3>



                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setfirstname(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev2">First name</label>
                                                            </div>

                                                            {error && firstname.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setlastname(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Last name</label>
                                                            </div>

                                                            {error && lastname.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="number" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setage(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev2">Age</label>
                                                            </div>

                                                            {error && age.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}
                                                            {ageValid == true ?
                                                                <label style={{ color: "red" }}>*Not in correct format</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setaddress(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Address</label>
                                                            </div>

                                                            {error && address.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setemail(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev2">E-mail</label>
                                                            </div>

                                                            {error && email.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <input type="text" id="form3Examplev3" pattern="[7-9]{1}[0-9]{9}" className="form-control form-control-lg" onChange={function (e) { setmobile(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplev3">Mobile</label>
                                                            </div>

                                                            {error && mobile.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}
                                                            {error && mobile.length >= 11 ?
                                                                <label style={{ color: "red" }}>*not in correct format</label> : ""}


                                                        </div>
                                                    </div>





                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">


                                                            <div className="form-outline">
                                                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={function (e) { setgender(e.target.value) }} required>
                                                                    <option selected>Select gender</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                                <label className="form-label" for="form3Examplev2">Gender</label>

                                                            </div>

                                                            {error && gender.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>


                                                        <div className="col-md-6 mb-4 pb-2">



                                                            <div className="form-outline">
                                                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={function (e) { setmaritalstatus(e.target.value) }} required>
                                                                    <option selected>Select Marital Status</option>
                                                                    <option value="Single">single</option>
                                                                    <option value="Married">Married</option>

                                                                </select>
                                                                <label className="form-label" for="form3Examplev2">marital Status</label>

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
                                                            <input type="text" id="form3Examplea2" className="form-control form-control-lg" onChange={function (e) { setspecialization(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea2">Specialization</label>
                                                        </div>

                                                        {error && specialization.length <= 0 ?
                                                            <label style={{ color: "red" }}>*required</label> : ""}
                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea3" className="form-control form-control-lg" onChange={function (e) { setexperianceduration(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea3">Experiance</label>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5 mb-4 pb-2">

                                                            <div className="form-outline form-black">
                                                                <input type="text" id="form3Examplea4" className="form-control form-control-lg" onChange={function (e) { setpreviousehospitals(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplea4">previouse Hospitals</label>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-7 mb-4 pb-2">

                                                            <div className="form-outline form-black">
                                                                <input type="text" id="form3Examplea5" className="form-control form-control-lg" onChange={function (e) { setawards(e.target.value) }} />
                                                                <label className="form-label" for="form3Examplea5">Awards</label>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="text" id="form3Examplea6" className="form-control form-control-lg" onChange={function (e) { setworkingdays(e.target.value) }} />
                                                            <label className="form-label" for="form3Examplea6">working Days</label>
                                                        </div>

                                                        {error && workingdays.length <= 0 ?
                                                            <label style={{ color: "red" }}>*required</label> : ""}
                                                    </div>




                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-black">
                                                            <input type="file" id="form3Examplea6" className="form-control form-control-lg" onChange={handleImage} required />
                                                            <label className="form-label" for="form3Examplea6">upload image</label>
                                                        </div>

                                                        {error && file_path.length <= 0 ?
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
                                        </div>


                                        <button type="button" className="btn btn-light btn-lg " style={{ background: "#00FFFF" }}
                                            data-mdb-ripple-color="#2F4FAA" onClick={btnClick}>Register</button>

                                        <button type="button" className="btn btn-light btn-lg" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate("/readDoctors")}>Cancel</button>

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

