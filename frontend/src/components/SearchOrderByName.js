import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg"


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
            successModel();


        }).catch(function (err) {

            alert(err);
            unsuccessModel()

        })



    }

    function successModel() {

        const modelBtn = document.getElementById("model-btn")
        modelBtn.click();

    }
    function unsuccessModel() {

        const modelBtn = document.getElementById("model-btn-unsuccess")
        modelBtn.click();

    }

    function cancel(e) {
        e.preventDefault();
        navigate("/saerchOrder");
        window.location.reload();
    }



    return (

        <div>
            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>

            <section id="hero" class="d-flex align-items-center " style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',
                paddingTop: '0px'

            }}>






                <form name="Addform" method="post" encType="multipart/form-data" className="container was-validated" style={{ backgroundColor: "#2F4FAA", borderRadius: '10px', opacity: '0.85' }}><br />

                    <h3 className="text-primary text-light" style={{ color: "white" }}><b>Search Your Order</b></h3>


                    <div class="row d-flex justify-content-center">

                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="name"><b></b></label>
                            <input name="lname" type="text" className="form-control" id="lastName" placeholder="Search By Name" onChange={function (e) { setName(e.target.value); }} required />
                        </div><br />

                    </div>

                    <br />



                    <div class="row d-flex justify-content-center">


                        <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={() => navigate("/readPrescription/" + name)}>Search</button><br />

                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={cancel} style={{marginLeft:"48px"}}>Cancel</button>


                    </div><br />
                </form><br /><br />



            </section >
        </div >

    );
}