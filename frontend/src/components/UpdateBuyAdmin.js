import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";





export default function UpdateBuy() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [orderID, setOrderID] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [town, setTown] = useState("")
    const [address, setAddress] = useState("");
    const [file_path, setImage] = useState("");
    const [status, setStatus] = useState("");



    useEffect(function () {


        function getLabAppoinment() {
            axios.get("http://localhost:8050/pha/getonePharmacy/" + id).then((res) => {

                setOrderID(res.data.orderID);
                setTitle(res.data.title);
                setName(res.data.name);
                setAge(res.data.age);
                setEmail(res.data.email);
                setTelephone(res.data.telephone);;
                setTown(res.data.town);
                setAddress(res.data.address);
                setImage(res.data.file_path);
                setStatus(res.data.status)


            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getLabAppoinment();

    }, []);



    function btnClick(e) {

        e.preventDefault();

        const updateLabAppoinment = {

            orderID,
            title,
            name,
            age,
            email,
            telephone,
            town,
            address,
            file_path,
            status

        }
        console.log(updateLabAppoinment);

        axios.put("http://localhost:8050/pha/update/" + id, updateLabAppoinment).then(function () {

            alert("Status Updated");


        }).catch(function () {

            alert("Student Not Updated");

        })

    }

    function cancel(e) {
        e.preventDefault();
        navigate("/updatePrescription");

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


            <section style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',
                paddingTop: '50px'


            }}>



                <div className="container">

                    <form name="Addform" method="post" encType="multipart/form-data" className="container was-validated" style={{ backgroundColor: "#bbbdbb", borderRadius: '10px', opacity: '0.85' }}><br />

                        <h3 className="text-primary"><b>Update Order</b></h3>

                        <div class="row">

                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="orderid"><b>Order ID</b></label>
                                <input name="orderid" type="text" className="form-control" id="orderid" placeholder="First Name" value={orderID} onChange={function (e) { setOrderID(e.target.value); }} required />
                            </div><br />



                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>Name</b></label>
                                <input name="lname" type="text" className="form-control" id="lastName" placeholder="Last Name" value={name} onChange={function (e) { setName(e.target.value); }} required />
                            </div><br />

                        </div>
                        <div class="row">

                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>Age</b></label>
                                <input name="age" type="number" className="form-control" id="age" placeholder="age" value={age} onChange={function (e) { setAge(e.target.value); }} required />
                            </div><br />

                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>E-mail</b></label>
                                <input name="email" type="email" className="form-control" id="email" placeholder="E-mail" value={email} onChange={function (e) { setEmail(e.target.value); }} required />
                            </div><br />

                        </div>
                        <div class="row">



                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>Telephone</b></label>
                                <input name="telephone" type="text" className="form-control" id="telephone" placeholder="07XXXXXXXXX" value={telephone} onChange={function (e) { setTelephone(e.target.value); }} required />
                            </div><br />

                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>Town</b></label>
                                <input name="text" type="text" className="form-control" id="email" placeholder="E-mail" value={town} onChange={function (e) { setTown(e.target.value); }} required />
                            </div><br />

                        </div>
                        <div class="row">

                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="name"><b>Address</b></label>
                                <input name="text" type="text" className="form-control" id="email" placeholder="E-mail" value={address} onChange={function (e) { setAddress(e.target.value); }} required />
                            </div><br />



                            <div className="form-group col-md-6 mt-3 mt-md-0">
                                <label for="status"><b>Status</b></label>
                                <input name="text" type="text" className="form-control" id="email" placeholder="" value={status} onChange={function (e) { setStatus(e.target.value); }} required />
                            </div><br />

                        </div>

                        <br />


                        <div class="row d-flex justify-content-center">

                            <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Update</button><br />


                        </div><br />

                        <div class="row d-flex justify-content-center">

                            <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={() => navigate("/readPrescriptionAdmin")} style={{backgroundColor:"#0297BF"}}>View Other Orders</button><br />


                        </div><br />



                    </form><br /><br />



                    <br />

                </div >

            </section>

        </div>
    );
}