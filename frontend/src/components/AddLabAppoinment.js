import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../siteImages/medlogo.png";
import successimg from "../siteImages/modal-success.png";
import unsuccessimg from "../siteImages/model-unsuccess.png";
import labAppoinmentpgBack from "../siteImages/labtestpgBack.jpg";
import moment from "moment";

export default function AddLabAppoinment() {


    const navigate = useNavigate();



    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [date, setDate] = useState("");
    const [file_path, setImage] = useState("");
    const [appNo, setAppoinmentNo] = useState("")
    const [appTime, setTime] = useState("");
    const [labTest, setLabTestType] = useState("");
    const status = "pending";


    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])

    }


    function successModel() {

        const modelBtn = document.getElementById("model-btn")
        modelBtn.click();

    }
    function unsuccessModel() {

        const modelBtn = document.getElementById("model-btn-unsuccess")
        modelBtn.click();

    }


    //should pass event
    function btnClick(e) {

        e.preventDefault();

        const validate = validateForm();

        if (validate === true) {

            const formData = new FormData();

            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('age', age);
            formData.append('nic', nic);
            formData.append('email', email);
            formData.append('telephone', telephone);
            formData.append('file_path', file_path);
            formData.append('status', status);
            formData.append('date', date);
            formData.append('labTest', labTest);
            formData.append('appNo', appNo);
            formData.append('appTime', appTime);

            axios.post("http://localhost:8050/labappoinment/addLabAppoinment", formData).then(function () {

                //alert("LabAppoinment Add");
                successModel();

            }).catch(function (err) {

                unsuccessModel();
                alert(err);

            })

        }


    }

    function AssignTime(e) {

        e.preventDefault();
        assignAppoinmentNo(date, labTest);

    }

    const [appoinmentDetails, setAppoinmentDetails] = useState([]);

    useEffect(function () {

        function getLabAppoinmentDetails() {
            axios.get("http://localhost:8050/labappoinment/readlabAppoinment").then(function (res) {

                console.log(res.data);
                setAppoinmentDetails(res.data);


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getLabAppoinmentDetails();
        setLabTestType('Creatinine');

    }, [])



    function assignAppoinmentNo(date, labTest) {

        var i = 1;
        date = date + "T00:00:00.000Z"

        if (appoinmentDetails.length == 0) {

            var t;
            i = 1;
            t = "09: 00AM"
            setTime(t);
            setAppoinmentNo(i);

        }

        for (var j = 0; j <= appoinmentDetails.length; j++) {

            var labTname = appoinmentDetails[j].labTest;
            var appdate = appoinmentDetails[j].date;

            if (labTest === labTname) {

                if (appdate === date) {

                    i = i + 1;

                }

            }
            if (i > 20) {
                alert("Can not Create Appoinment Today Please Try another Day")
            }

            var t;
            if (i === 1) {
                t = "09: 00AM"
                setTime(t);

            }
            else if (i === 2) {
                t = "09: 30AM"
                setTime(t);
            }
            else if (i === 3) {
                t = "10: 00AM"
                setTime(t);
            }
            else if (i === 4) {
                t = "10: 30AM"
                setTime(t);
            }
            else if (i === 5) {
                t = "11:00AM"
                setTime(t);
            }
            else if (i === 6) {
                t = "11:30AM"
                setTime(t);
            }
            else if (i === 7) {
                t = "12:00PM"
                setTime(t);
            }
            else if (i === 8) {
                t = "12:30PM"
                setTime(t);
            }
            else if (i === 9) {
                t = "13:00PM"
                setTime(t);
            }
            else if (i === 10) {
                t = "13:30PM"
                setTime(t);
            }
            else if (i === 10) {
                t = "14:00PM"
                setTime(t);
            }
            else if (i === 11) {
                t = "14:30PM"
                setTime(t);
            }
            else if (i === 12) {
                t = "15:00PM"
                setTime(t);
            }
            else if (i === 13) {
                t = "15:30PM"
                setTime(t);
            }
            else if (i === 14) {
                t = "15:00PM"
                setTime(t);
            }
            else if (i === 15) {
                t = "15:30PM"
                setTime(t);
            }
            else if (i === 16) {
                t = "16:00PM"
                setTime(t);
            }
            else if (i === 17) {
                t = "16:30PM"
                setTime(t);
            }
            else if (i === 18) {
                t = "17:00PM"
                setTime(t);
            }
            else if (i === 19) {
                t = "17:30PM"
                setTime(t);
            }
            else {
                alert("No Appoinments today")
            }

            setAppoinmentNo(i);


        }


    }


    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    const validateNumber = (input) => {
        var re = /[0][0-9]{9}$/;

        return re.test(input)
    }

    function validatePhoneNumber(phoneNumber) {
        var regex = /^(?:\+94|0)[78]\d{8}$/;
        return regex.test(phoneNumber);
    }

    function nicValidation(nic) {
        var regex = /^([0-9]{9}[V|v|X|x]|[0-9]{12})$/;
        return regex.test(nic);
    }

    function ageValidation(age) {
        if (age > 0) {
            return false
        } else {
            return true
        }
    }

    function validateDate(date) {

        let todayYear = new Date().getFullYear()
        let todayMonth = new Date().getMonth() + 1
        let todayDay = new Date().getDate()

        let selectdateYear = Number(moment(date).utc().format('YYYY'))
        let selectdateMonth = Number(moment(date).utc().format('MM'))
        let selectdateDay = Number(moment(date).utc().format('DD'))
        let selectedNewDate = Number(selectdateDay) + 1

        if (todayYear === selectdateYear) {
            if (todayMonth === selectdateMonth) {
                if (todayDay <= selectedNewDate) {

                    return true;

                }
                return false;
            }
            return false;
        }
        return false;
    }


    const [fnameError, setFnameError] = useState("")
    const [lnameError, setLnameError] = useState("");
    const [ageError, setageError] = useState("");
    const [nicError, setnicError] = useState("");
    const [emailError, setemailError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [dateError, setdateError] = useState("");
    const [appNoError, setappNoError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [fileError, setfileError] = useState("");

    function validateForm() {

        let fname = document.forms["Addform"]["fname"].value;
        if (fname === "") {
            alert("first Name must be filled out");
            setFnameError("first Name must be filled out");
            return false;
        } else {
            setFnameError("");
        }

        let lname = document.forms["Addform"]["lname"].value;
        if (lname === "") {
            alert("Last Name must be filled out");
            setLnameError("Last Name must be filled out")
            return false;
        } else {
            setLnameError("")
        }

        let Lage = document.forms["Addform"]["age"].value;
        if (ageValidation(Lage)) {
            alert("Age must be Positive Value");
            setageError("Age must be Positive Value")
            return false;
        } else {
            setageError("")

        }

        let Lnic = document.forms["Addform"]["nic"].value;
        if (!nicValidation(Lnic)) {
            setnicError("Please Enter a valid NIC number in Sri Lanka format.");
            return false;
        } else {
            setnicError("");
        }

        let Lemail = document.forms["Addform"]["email"].value;
        if (!isEmailValid(Lemail)) {
            if (Lemail === "") {
                isEmailValid(email)
                alert("email must be filled out");
                setemailError("email must be filled out");
                return false;
            }
            alert("Please Enter the valid format");
            setemailError("email must be filled out");
            return false;

        } else {
            setemailError("");
        }


        /*
        let Ltelephone = document.forms["Addform"]["telephone"].value;
        if (!validateNumber(Ltelephone)) {
            if (Ltelephone === "") {
                //isEmailValid(email)
                alert("telephone must be filled out");
                setphoneError("telephone must be filled out")
                return false;
            }
            alert("Please Enter the valid format");
            setphoneError("Please Enter the valid format")
            return false;

        } else {
            setphoneError("")
        }

        */

        let phoneNumber = document.forms["Addform"]["telephone"].value;
        if (!validatePhoneNumber(phoneNumber)) {

            setphoneError("Please enter a valid Sri Lankan mobile number");
        } else {
            setphoneError("");
        }

        let Ldate = document.forms["Addform"]["date"].value;
        if (!validateDate(Ldate)) {
            alert("You can Only Select Today Or today Onwards");
            setdateError("You can Only Select Today Or today Onwards");
            return false;
        } else {
            setdateError("");
        }


        let LFile = document.forms["Addform"]["formFileMultiple"];
        if (LFile.files.length == 0) {
            alert("File must be filled out");
            setfileError("File must be filled out");
            return false;
        } else {
            setfileError("");
        }

        let LTCategory = document.forms["Addform"]["labTestCategory"].value;
        if (LTCategory == "") {
            alert("Please select the Lab test Category");
            setCategoryError("Please select the Lab test Category")
            return false;
        } else {
            setCategoryError("")
        }

        let LAppNo = document.forms["Addform"]["appoinmentNo"].value;
        if (LAppNo == "") {
            alert("Appoinment No must be filled out");
            setappNoError("Appoinment No must be filled out");
            return false;
        } else {
            setappNoError("");
        }

        return true;

    }

    return (

        <div>
            <section id="hero" class="d-flex align-items-center " style={{
                backgroundImage: `url(${labAppoinmentpgBack})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%'

            }}>

                <div>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">

                                    <img className="row" src={logo} alt="logo" style={{ width: "100px" }} />
                                    <h5 class="modal-title mt-4 pr-5" id="exampleModalLongTitle"><b>Appoinment Success</b></h5>

                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="rounded border border-success pb-2">
                                        <h2 className="text-primary">Comfirmation E-mail send<br />With Details</h2>
                                        <h4 className="text-success">Please Check Your Email</h4>
                                        <img src={successimg} style={{ width: "50px" }} />
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success btn-lg btn-block" onClick={() => navigate("/appoinment")} data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="exampleModalCenterUnsucces" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <img className="row" src={logo} alt="logo" style={{ width: "100px" }} />

                                    <h5 class="modal-title" id="exampleModalLongTitle">Doctor Appoinment UnSuccess</h5>

                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>

                                </div>
                                <div class="modal-body">

                                    <div class="rounded border border-success">
                                        <h2 className="text-primary">Please Try Again</h2><br />
                                        <img src={unsuccessimg} style={{ width: "50px" }} />
                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onClick={() => navigate("/appoinment")} data-dismiss="modal">OK</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <button type="button" id="model-btn" data-toggle="modal" data-target="#exampleModalCenter"></button>

                <button type="button" id="model-btn-unsuccess" data-toggle="modal" data-target="#exampleModalCenterUnsucces"></button>


                <form name="Addform" method="post" encType="multipart/form-data" className="container was-validated mb-5" style={{ backgroundColor: "#bbbdbb", borderRadius: '10px', opacity: '0.85' }}><br />

                    <h3 className="text-primary"><b>Make A Lab Test Appoinments</b></h3>

                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>First Name</b></label>
                            <input name="fname" type="text" className="form-control" id="firstName" placeholder="First Name" onChange={function (e) { setFirstName(e.target.value); }} required />
                            {fnameError && <span className="error" style={{ color: "red" }}>{fnameError}</span>}
                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Last Name</b></label>
                            <input name="lname" type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={function (e) { setLastName(e.target.value); }} required />
                            {lnameError && <span className="error" style={{ color: "red" }}>{lnameError}</span>}
                        </div><br />

                    </div>
                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Age</b></label>
                            <input name="age" type="number" className="form-control" id="age" placeholder="age" onChange={function (e) { setAge(e.target.value); }} required />
                            {ageError && <span className="error" style={{ color: "red" }}>{ageError}</span>}
                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Nic</b></label>
                            <input name="nic" type="text" className="form-control" id="nic" placeholder="NIC" onChange={function (e) { setNic(e.target.value); }} required />
                            {nicError && <span className="error" style={{ color: "red" }}>{nicError}</span>}
                        </div><br />

                    </div>
                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>E-mail</b></label>
                            <input name="email" type="email" className="form-control" id="email" placeholder="E-mail" onChange={function (e) { setEmail(e.target.value); }} required />
                            {emailError && <span className="error" style={{ color: "red" }}>{emailError}</span>}
                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Telephone</b></label>
                            <input name="telephone" type="text" className="form-control" id="telephone" placeholder="07XXXXXXXXX" onChange={function (e) { setTelephone(e.target.value); }} required />
                            {phoneError && <span className="error" style={{ color: "red" }}>{phoneError}</span>}
                        </div><br />

                    </div>
                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Date</b></label>
                            <input name="date" type="date" className="form-control" id="date" onChange={function (e) { setDate(e.target.value); }} required />
                            {dateError && <span className="error" style={{ color: "red" }}>{dateError}</span>}
                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="formFileMultiple" class="form-label"><b>Priscription</b></label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple name="file_path" onChange={handleImage} required />
                            {fileError && <span className="error" style={{ color: "red" }}>{fileError}</span>}
                        </div><br />

                    </div>

                    <div class="row">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Lab Test Category</b></label>
                            <select className="form-control" onChange={e => setLabTestType(e.target.value)} id="labTestCategory" required>
                                <option key={"Creatinine"} value={"Creatinine"}>Creatinine</option>
                                <option key={"CRP"} value={"CRP"}>CRP</option>
                                <option key={"Electrolytes"} value={"Electrolytes"}>Electrolytes</option>
                                <option key={"ESR"} value={"ESR"}>ESR</option>
                                <option key={"FastingBloodSugar"} value={"FastingBloodSugar"}>Fasting Blood Sugar</option>
                                <option key={"FullBloodCount"} value={"FullBloodCount"}>Full Blood Count</option>
                                <option key={"UrineFR"} value={"UrineFR"}>Urine FR</option>
                            </select>
                            {categoryError && <span className="error" style={{ color: "red" }}>{categoryError}</span>}
                        </div>

                        <div className="form-group form-group col-md-2 mt-3 mt-md-0">
                            <label for="name"><b>Appoinment No</b></label>
                            <input name="appoinmentNo" type="text" className="form-control" id="appoinmentNo" value={appNo} required disabled />
                            {appNoError && <span className="error" style={{ color: "red" }}>{appNoError}</span>}
                        </div><br />

                        <div className="form-group col-md-4 mt-3 mt-md-0">
                            <label for="name"><b>Generate Time And Appoinment No</b></label>
                            <button type="button" class="btn btn-outline-primary" onClick={AssignTime}>Generate Appoinment No</button>
                        </div>

                    </div>



                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={() => navigate("/appoinment")}>Cancel</button>
                        <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Submit</button><br />

                    </div><br />
                </form><br /><br />

            </section >
        </div >

    );
}
