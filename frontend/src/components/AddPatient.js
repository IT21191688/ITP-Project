import { useEffect, useState } from "react";
import axios from "axios";
import medlogo from "../patientImages/medlogo.jpeg";
import register from "../patientImages/register.jpg";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {

    const navigate = useNavigate();

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
    const [file_path, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [nicError, setNicError] = useState("");


    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    /*function myFunction() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }*/



    function submit(e) {
        e.preventDefault();

        if (nic.length == 0) {
            setError(true)
        } else if (nic.length > 12) {
            setError(true)
        } else if (nic.length < 12) {
            setError(true)
        }

        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //setEmailError(re.test(email));

            if (re.test(email)) {
                setEmailError("")
            }
            else {
                setEmailError("Enter the Valid Format")
            }
        }

        function validatePhoneNumber(phone) {
            var regex = /^(?:\+94|0)[78]\d{8}$/;


            if (regex.test(phone)) {
                setEmailError("")
            }
            else {
                setEmailError("Enter the Valid Format")
            }
        }

        function nicValidation(nic) {
            var regex = /^([0-9]{9}[V|v|X|x]|[0-9]{12})$/;


            if (regex.test(nic)) {
                setEmailError("")
            }
            else {
                setEmailError("Enter the Valid Format")
            }
        }

        validateEmail(email)
        validatePhoneNumber(phone)
        nicValidation(nic)

        if (name.length === 0 ||
            address.length === 0 ||
            birthdate.length === 0 ||
            gender.length === 0 ||
            phone.length === 0 ||
            email.length === 0 ||
            blood.length === 0 ||
            height.length === 0 ||
            weight.length === 0 ||
            file_path.length === 0 ||
            password.length === 0
        ) {
            setError(true)
        }

        const patient = new FormData();

        patient.append("name", name);
        patient.append("nic", nic);
        patient.append("address", address);
        patient.append("birthdate", birthdate);
        patient.append("gender", gender);
        patient.append("phone", phone);
        patient.append("email", email);
        patient.append("surgery", surgery);
        patient.append("allergy", allergy);
        patient.append("blood", blood);
        patient.append("height", height);
        patient.append("weight", weight);
        patient.append("file_path", file_path);
        patient.append("password", password);

        axios.post("http://localhost:8050/patient/add", patient).then(function () {
            alert("Patient Added!");
            navigate(-1)
        })
            .catch(function (err) {
                //alert(err);
            });
    }



    return (

        <div className="">

            {/*<div>

                <div className="bg-1" style={{ height: "300px", backgroundColor: "#26CCD1" }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={medlogo} className="rounded-circle" alt="Logo" width="200" height="200" />
                        <h3>Register</h3>
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


                <section className="h-100 h-custom gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" style={{ borderRadius: "50px", width: "1200px" }}>
                                    <div className="card-body p-0" styles="border-radius: 30px;">
                                        <div className="row g-0">
                                            <div className="col-lg-12">
                                                <div className="p-5">
                                                    <h2 className="fw-normal mb-10" styles="color: #4835d4;"><b>Personal Information</b></h2><br /><br /><br />

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">
                                                            <div className="form-outline">

                                                                <div className="form-outline">
                                                                    <label className="form-label" for="form3Examplev4"><b>Name</b></label>
                                                                    <input type="text" placeholder="Your Name" id="form3Examplev4" className="form-control form-control-lg" onChange={e => { setName(e.target.value); }} />

                                                                </div>
                                                                {error && name.length <= 0 ?
                                                                    <label style={{ color: "red" }}>*required</label> : ""}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>NIC</b></label>
                                                                <input type="text" placeholder="Your NIC" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setNic(e.target.value) }} required />

                                                            </div>
                                                            {error && nic.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}
                                                            {error && nic.length >= 13 ?
                                                                <label style={{ color: "red" }}>*Not In Correct format</label> : ""}
                                                            {error && nic.length < 12 ?
                                                                <label style={{ color: "red" }}>*Not In Correct format</label> : ""}

                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Birthdate</b></label>
                                                                <input placeholder='Your Birthday' type="date" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setBirthdate(e.target.value) }} required />

                                                            </div>
                                                            {error && birthdate.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"><b>Address</b></label>
                                                                <input type="text" placeholder="Your Address" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setAddress(e.target.value) }} required />

                                                            </div>
                                                            {error && address.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Phone</b></label>
                                                                <input type="text" placeholder="Your Phone Number" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setPhone(e.target.value) }} required />

                                                            </div>
                                                            {error && phone.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Gender</b></label>
                                                                <select class="form-control form-control-lg" aria-label=".form-select-lg example" onChange={function (e) { setGender(e.target.value) }} required>
                                                                    <option selected>Select gender</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Other">Other</option>
                                                                </select>

                                                            </div>
                                                            {error && gender.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Previous Surgeries</b> </label>
                                                                <input type="text" placeholder="Surgeries You Have Got" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setSurgery(e.target.value) }} />

                                                            </div>

                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"><b>Allergies</b></label>
                                                                <input type="text" placeholder="Allergies You Have" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setAllergy(e.target.value) }} />

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Blood Group</b></label>
                                                                <select class="form-control form-control-lg" aria-label=".form-select-lg example" onChange={function (e) { setBlood(e.target.value) }} required>
                                                                    <option selected>Select Blood Group</option>
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
                                                            {error && blood.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}
                                                        </div>

                                                        <div className="col-md-4 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"><b>Height(cm)</b></label>
                                                                <input type="text" placeholder="Your Height" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setHeight(e.target.value) }} required />

                                                            </div>
                                                            {error && height.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                        </div>

                                                        <div className="col-md-4 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"><b>Weight(kg)</b></label>
                                                                <input type="text" placeholder="Your Weight" id="form3Examplev3" className="form-control form-control-lg col-md" onChange={function (e) { setWeight(e.target.value) }} required />

                                                            </div>
                                                            {error && weight.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}
                                                        </div>
                                                    </div>

                                                    <div className="row">

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"><b>E-mail</b></label>
                                                                <input type="email" placeholder="Your Email" id="form3Examplev3" className="form-control form-control-lg" onChange={function (e) { setEmail(e.target.value) }} required />

                                                            </div>
                                                            {error && email.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}


                                                        </div>

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev2"><b>Password</b></label>
                                                                <input type="password" placeholder="Your Account Password" id="form3Examplev2" className="form-control form-control-lg" onChange={function (e) { setPassword(e.target.value) }} required />

                                                            </div>
                                                            {error && phone.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}


                                                        </div>
                                                    </div>

                                                    <div className="row">

                                                        {/*<div className="col-md-6 mb-4 pb-2">


                                                            <div className="form-outline">
                                                                <label className="form-label" for="form3Examplev3"> Password</label>
                                                                <input type="password" id="form3Examplev3" className="form-control form-control-lg" placeholder="Enter Password" onChange={function (e) { setPassword(e.target.value) }} required />
                                                                {/*<input type="checkbox" onclick={myFunction} />Show Password*/}

                                                        {/*</div>
                                                            {error && password.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}

                                                            </div><br />*/}

                                                        <div className="col-md-6 mb-4 pb-2">

                                                            <div className="form-outline">
                                                                <label for="form3Examplev3" class="form-label"><b>Profile Picture</b></label>
                                                                <input class="form-control form-control-lg" type="file" id="form3Examplev3" multiple name="file_path" onChange={handleImage} required />

                                                            </div>
                                                            {error && file_path.length <= 0 ?
                                                                <label style={{ color: "red" }}>*required</label> : ""}<br />
                                                        </div>
                                                    </div>

                                                    <br /><div className="row d-flex justify-content-center">
                                                        <button type="submit" class="btn text-white mt-2 mr-5" style={{ background: "#0297BF", width: "100px" }} onClick={submit}>Register</button><br />
                                                        <button type="button" class="btn text-white mt-2" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate(-1)}>Cancel</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}