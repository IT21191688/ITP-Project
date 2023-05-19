import React, { useState } from "react";
import axios from "axios";
import img from "../Images/green_eco_loop_leaf_check_mark.jpg"



export default function AddCustomer() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, SetGender] = useState("");
    const [mail, SetEMail] = useState("");
    const [inquiry, SetInquiry] = useState("");
    const [message, SetMessage] = useState("");

    function sendData(e) {
        e.preventDefault();

        const valid = validateForm();

        if (valid === true) {

            const newCustomer = {
                name,
                age,
                gender,
                mail,
                inquiry,
                message
            }

            axios.post("http://localhost:8050/Customer/add", newCustomer).then(() => {
                //alert("Customer added")
                successModel()


            }).catch((err) => {
                alert(err)
            })


        }



    }

    function successModel() {
        const modBtn = document.getElementById('modelBtn')
        modBtn.click()

    }



    //validation fields

    const isEmailValid = (mail) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }


    const [nameError, setnameError] = useState("")
    const [ageError, setageError] = useState("");
    const [genderError, setgenderError] = useState("");
    const [mailError, setmailError] = useState("");

    function validateForm() {


        let fname = document.forms["customer_form"]["name"].value;
        if (fname === "") {
            // alert("first Name must be filled out");
            setnameError("Name must be filled out");
            return false;
        } else {
            setnameError("");
        }


        let lname = document.forms["customer_form"]["age"].value;
        if (lname === "") {

            setageError("Age must be filled out");
            return false;
        } else {
            setageError("");
        }


        let Lage = document.forms["customer_form"]["gender"].value;
        if (Lage === "") {

            setgenderError("Gender must be filled out");
            return false;
        } else {
            setgenderError("");
        }



        let Lemail = document.forms["customer_form"]["mail"].value;
        if (!isEmailValid(Lemail)) {

            if (Lemail === "") {
                isEmailValid(mail)

                setmailError("email must be filled out");

                return false;
            }

            setmailError("Please Enter the valid Email");
            return false;

        } else {
            setmailError("");
        }

        return true;

    }


    return (
        <div className="container p-[30px] bg-gradient-to-r from-[rgb(6,190,227)] bg-#67e8f9" style={{

        }}>

            <button type="button" id="modelBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ visibility: "hidden" }}></button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Your Inquiry Has Been Received</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src={img} style={{ width: "100px" }} />Thank You For Your Response


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" style={{ background: "red", hover: "bg-red-500" }} data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            <center>
                <form onSubmit={sendData} name="customer_form">
                    <div className="form-group col-md-6 ">
                        <label for="name"><b>Customer Name</b></label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Your Name :" onChange={(e) => {

                            setName(e.target.value);

                        }} />
                        {nameError && <span className="error" style={{ color: "red" }}>{nameError}</span>}

                    </div>
                    <div className="form-group col-md-6 ">
                        <label for="age"><b>Customer Age</b></label>
                        <input type="text" className="form-control" id="age" placeholder="Enter Your Age :" onChange={(e) => {

                            setAge(e.target.value);

                        }} />
                        {ageError && <span className="error" style={{ color: "red" }}>{ageError}</span>}
                    </div>

                    <div className="form-group col-md-6 ">
                        <label for="gender"><b>Gender</b></label>
                        <input type="text" className="form-control" id="gender" placeholder="Enter Your Gender :" onChange={(e) => {

                            SetGender(e.target.value);

                        }} />
                        {genderError && <span className="error" style={{ color: "red" }}>{genderError}</span>}
                    </div>

                    <div className="form-group col-md-6 ">
                        <label for="mail"><b>E-Mail</b></label>
                        <input type="text" className="form-control" id="mail" placeholder="Enter Your E-mail Address :" onChange={(e) => {

                            SetEMail(e.target.value);

                        }} />
                        {mailError && <span className="error" style={{ color: "red" }}>{mailError}</span>}
                    </div>

                    <div className="form-group col-md-6 ">
                        <label for="inquiry"><b>Inquiry For</b> </label>
                        <input type="text" className="form-control" id="inquiry" placeholder="Enter Inquiry :" onChange={(e) => {

                            SetInquiry(e.target.value);

                        }} />
                    </div>

                    <div className="form-group col-md-6 ">
                        <label for="message"><b>Message</b> </label>
                        <input type="text" className="form-control" id="message" placeholder="Remark :" onChange={(e) => {

                            SetMessage(e.target.value);

                        }} />
                    </div>



                    <button type="submit" className="btn btn-primary  bg-amber-950">SUBMIT</button>
                </form>
            </center>
        </div>
    )
}