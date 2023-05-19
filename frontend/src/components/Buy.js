import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg"
import moment from "moment";


export default function AddLabAppoinment() {


    const navigate = useNavigate();

    const [orderID, setOrderID] = "DefaultOrder";
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [town, setTown] = useState("")
    const [address, setAddress] = useState("");
    const [file_path, setImage] = useState("");
    const status = "Pending";




    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])

    }





    //should pass event
    function btnClick(e) {

        e.preventDefault();

        const validate = validateForm()
        if (validate == true) {

            const formData = new FormData();

            formData.append('orderID', orderID);
            formData.append('title', title);
            formData.append('name', name);
            formData.append('age', age);
            formData.append('email', email);
            formData.append('telephone', telephone);
            formData.append('town', town);
            formData.append('address', address);
            formData.append('file_path', file_path);
            formData.append('status', status);


            axios.post("http://localhost:8050/pha/add", formData).then(function () {

                alert("Success!!");
                navigate("/addpriscription"); // navigate to medicine page after successful addition of medicine
                window.location.reload()



            }).catch(function (err) {

                alert(err);

            })

        }




    }


    function cancel(e) {
        e.preventDefault();
        navigate("/addpriscription"); // navigate to medicine page after successful addition of medicine
        window.location.reload()

    }


    //Validations--------------------------


    //validation fields

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePhoneNumber(telephone) {
        var regex = /^(?:\+94|0)[78]\d{8}$/;
        return regex.test(telephone);
    }





    const [nameError, setNameError] = useState("")
    const [ageError, setAgeError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const [townError, setTownError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [fileError, setFileError] = useState("");

    function validateForm() {


        let name = document.forms["Addform"]["name"].value;
        if (name === "") {
            // alert("first Name must be filled out");
            setNameError("Name must be filled out");
            return false;
        } else {
            setNameError("");
        }

        let age = document.forms["Addform"]["age"].value;
        if (age === "") {
            //alert("Last Name must be filled out");
            setAgeError("Age must be filled out");
            return false;
        }
        else if (age <= 0) {
            setAgeError("Age must be above 0");
            return false;
        }

        else {
            setAgeError("");
        }


        let email = document.forms["Addform"]["email"].value;
        if (!isEmailValid(email)) {

            if (email === "") {
                isEmailValid(email)
                //alert("email must be filled out");
                setEmailError("Email must be filled out");

                return false;
            }
            //alert("Please Enter Email the valid format");
            setEmailError("Please Enter Email the valid format");
            return false;

        } else {
            setEmailError("");
        }

        let telephone = document.forms["Addform"]["telephone"].value;
        if (!validatePhoneNumber(telephone)) {

            //alert("Please enter a valid Sri Lankan mobile number");
            setTelephoneError("Please enter a valid mobile number");
            return false;
        } else {

            setTelephoneError("");

        }


        let town = document.forms["Addform"]["town"].value;
        if (town === "") {
            //alert("Appoinment No must be filled out");
            setTownError("Town must be filled out");
            return false;
        } else {
            setTownError("");
        }

        let address = document.forms["Addform"]["address"].value;
        if (address === "") {
            //alert("Appoinment No must be filled out");
            setAddressError("Address must be filled out");
            return false;
        } else {
            setAddressError("");
        }



        return true;



    }


    //-------------------------------------



    return (

        <div>

            <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '10px' }}>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3>
                    </div>
                </div>


            </div>

            <section id="hero" class="d-flex align-items-center " style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%'

            }}>






                <form name="Addform" method="post" encType="multipart/form-data" className="container was-validated" style={{ backgroundColor: "#26CCD1", borderRadius: '10px', opacity: '0.85' }}><br />

                    <h3 className="text-primary" style={{ color: 'red' }}><b>Make Your Order</b></h3>


                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="title"><b>Title</b></label>
                            <select class="form-control" onChange={function (e) { setTitle(e.target.value); }} placeholder="Title">

                                <option key={"Mr. "} value={"Mr. "}>Mr.</option>
                                <option key={"Ms. "} value={"Ms. "}>Ms.</option>
                                <option key={"Rev. "} value={"Rev. "}>Rev.</option>
                            </select>
                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b>Name</b></label>
                            <input name="name" type="text" className="form-control" id="name" placeholder="Enter Full Name" onChange={function (e) { setName(e.target.value); }} required />
                            {nameError && <span className="error" style={{ color: "red" }}>{nameError}</span>}
                        </div><br />

                    </div>
                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="age"><b>Age</b></label>
                            <input name="age" type="number" className="form-control" id="age" placeholder="Age" onChange={function (e) { setAge(e.target.value); }} required />
                            {ageError && <span className="error" style={{ color: "red" }}>{ageError}</span>}

                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="email"><b>E-mail</b></label>
                            <input name="email" type="email" className="form-control" id="email" placeholder="E-mail" onChange={function (e) { setEmail(e.target.value); }} required />
                            {emailError && <span className="error" style={{ color: "red" }}>{emailError}</span>}
                        </div><br />

                    </div>
                    <div class="row">



                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="telephone"><b>Telephone</b></label>
                            <input name="telephone" type="text" className="form-control" id="telephone" placeholder="07XXXXXXXXX" onChange={function (e) { setTelephone(e.target.value); }} required />
                            {telephoneError && <span className="error" style={{ color: "red" }}>{telephoneError}</span>}

                        </div><br />

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="town"><b>Town</b></label>
                            <input name="town" type="text" className="form-control" id="town" placeholder="Town" onChange={function (e) { setTown(e.target.value); }} required />
                            {townError && <span className="error" style={{ color: "red" }}>{townError}</span>}

                        </div><br />

                    </div>
                    <div class="row">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="address"><b>Address</b></label>
                            <input name="address" type="text" className="form-control" id="address" placeholder="Address" onChange={function (e) { setAddress(e.target.value); }} required />
                            {addressError && <span className="error" style={{ color: "red" }}>{addressError}</span>}

                        </div><br />



                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="formFileMultiple" class="form-label"><b>Priscription</b></label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple name="file_path" onChange={handleImage} required />
                        </div><br />

                    </div>

                    <br />



                    <div class="row d-flex justify-content-center">


                        <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Submit</button><br />

                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={cancel} style={{ marginLeft: "48px" }}>Cancel</button>


                    </div><br />
                </form><br /><br />



            </section >
        </div >

    );
}