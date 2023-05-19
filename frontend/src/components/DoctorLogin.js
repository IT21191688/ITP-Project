import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink, props } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import loginedited from "../patientImages/loginedited.jpeg";

export default function DoctorLogin() {
    const navigate = useNavigate();


    const [doctors, setDoctors] = useState([]);


    useEffect(function () {


        function getDoctorName() {
            axios.get("http://localhost:8050/doctor/readDoctor").then(function (res) {

                console.log(res.data);

                setDoctors(res.data);



            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getDoctorName();

    }, [])


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [id, setDoctorId] = useState("");
    const [success, setSuccess] = useState(false);

    function btnClick(e) {

        for (const doctor of doctors) {

            //alert(doctor.mobile)
            //alert(userName + " " + doctor.email + "  " + password + "  " + doctor.mobile)
            if (userName === doctor.email) {

                //alert("Email Validate")

                if (password == doctor.mobile) {

                    //alert("password correct" + doctor._id)
                    setDoctorId(doctor._id)
                    navigate("/doctorProfileUser/" + doctor._id)
                    window.location.reload()
                    setSuccess(true)
                }



            }



        }

        if (success === false) {
            //alert("Please enter the valid Credentials")
            navigate("/login")
        }


        /*
        if (success == false) {
            alert("Profile Redirecting")
            alert(id)
            navigate("/doctorProfileUser/" + id)
        }
        else {
            alert("Please enter the valid Credentials")
            navigate("/login")


        }
        */



    }





    return (
        <div className="bg-info" style={{
            minHeight: "100vh", backgroundImage: `url(${loginedited})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '100%'
        }}>
            <br></br><br></br><br></br><br></br>
            <form name="Addform" method="post" className="container was-validated" style={{ background: "white", borderRadius: '10px', opacity: '0.7', paddingTop: "30px" }}>


                <h3 className="text-dark"><b>Doctor Login</b></h3>


                <center>

                    <div className="form-group form-group col-md-4 mt-3 mt-md-0">
                        <label for="name"><b>User Name</b></label>
                        <input name="userName" type="text" className="form-control" id="userName" onChange={function (e) { setUserName(e.target.value); }} required />
                    </div><br />

                    <div className="form-group col-md-4 mt-3 mt-md-0">
                        <label for="name"><b>Password</b></label>
                        <input name="password" type="number" className="form-control" id="password" onChange={function (e) { setPassword(e.target.value); }} required />
                    </div>

                </center>


                <div class="row d-flex justify-content-center">

                    <button type="submit" className="btn col-md-3 mt-0 mt-md-0 " style={{ background: "#4A75D3" }} onClick={btnClick}>Submit</button>

                </div><br />
            </form ><br /><br />
        </div >
    );
}