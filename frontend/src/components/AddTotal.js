import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";


export default function AddTotal() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const totalValue = searchParams.get('totalValue') || 0;


    const navigate = useNavigate();

    const [oderID, setOrderID] = useState("");
    const [totalFee, setTotalFee] = useState("");

    function btnClick(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("oderID", oderID);
        formData.append("totalFee", totalFee);


        axios.post("http://localhost:8050/upd/add", formData).then(function () {
            alert("Success!!");
            navigate("/readMedicine"); // navigate to medicine page after successful addition of medicine
            
        })
            .catch(function (err) {
                alert(err);
            });


    }
    function cancel(e) {
        e.preventDefault();
        navigate("/addTotalFee"); // navigate to medicine page after successful addition of medicine
        window.location.reload()

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
            <div style={{


                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',
                paddingTop: '100px'
            }}>


                <form
                    name="Addform"
                    method="post"
                    encType="multipart/form-data"
                    className="container was-validated"
                    style={{
                        backgroundColor: "#bbbdbb",
                        borderRadius: "10px",
                        opacity: "0.85",

                    }}
                >
                    <br />

                    <h3 className="text-primary">
                        <b>Update Total</b>
                    </h3>

                    <div class="row d-flex justify-content-center">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="mName">
                                <b>OrderID</b>
                            </label>
                            <input
                                name="mName"
                                type="text"
                                className="form-control"
                                id="mName"
                                placeholder="Order ID"
                                onChange={function (e) { setOrderID(e.target.value); }}
                                required
                            />
                        </div>
                        <br />
                    </div>

                    <div class="row d-flex justify-content-center">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="uPrice">
                                <b>Total Fee</b>
                            </label>
                            <input
                                name="uPrice"
                                type="number"
                                className="form-control"
                                id="uPrice"
                                placeholder="Total Price"
                                value={parseFloat(totalValue).toFixed(2)}
                                required
                                readOnly
                            />
                        </div>
                        <br />
                    </div>

                    <br /><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Submit</button><br />



                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={cancel} style={{marginLeft:"50px"}}>Cancel</button>



                    </div><br />



                </form><br /><br />




            </div>

        </div>
    );
}