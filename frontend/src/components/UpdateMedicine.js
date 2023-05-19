import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";




export default function UpdateBuy() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [mName, setmName] = useState("");
    const [uPrice, setuPrice] = useState("");
    const [qty, setqty] = useState("");



    useEffect(function () {


        function getMedicine() {
            axios.get("http://localhost:8050/med/getNewMedicine/" + id).then((res) => {

                setmName(res.data.mName);
                setuPrice(res.data.uPrice);
                setqty(res.data.qty);



            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getMedicine();

    }, []);



    function btnClick(e) {

        e.preventDefault();

        const updateMedicine = {
            mName,
            uPrice,
            qty

        }
        console.log(updateMedicine);

        axios.put("http://localhost:8050/med/update/" + id, updateMedicine).then(function () {

            alert("Updated");


        }).catch(function () {

            alert("Not Updated");

        })

    }

    function direct(e) {
        e.preventDefault();
        navigate("/readMedicine");
    }

    return (
        <div>
            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px', marginBottom: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>
            <form

                style={{

                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    position: 'center',
                    maxWidth: '100%',


                }}
            >
                <br />

                <h3 className="text-primary">
                    <b>Update Medicine</b>
                </h3>
                <br />

                <div class="row d-flex justify-content-center">
                    <div className="form-group col-md-6 mt-3 mt-md-0">
                        <label for="mName">
                            <b>Medicine Name</b>
                        </label>
                        <input
                            name="mName"
                            type="text"
                            className="form-control"
                            id="mName"
                            placeholder="Medicine Name"
                            value={mName}
                            onChange={function (e) { setmName(e.target.value); }}
                            required
                        />
                    </div>
                    <br />
                </div>

                <div class="row d-flex justify-content-center">
                    <div className="form-group col-md-6 mt-3 mt-md-0">
                        <label for="uPrice">
                            <b>Unit Price</b>
                        </label>
                        <input
                            name="uPrice"
                            type="number"
                            className="form-control"
                            id="uPrice"
                            placeholder="Unit Price"
                            value={uPrice}
                            onChange={function (e) { setuPrice(e.target.value); }}
                            required
                        />
                    </div>
                    <br />
                </div>

                <div class="row d-flex justify-content-center">
                    <div className="form-group col-md-6 mt-3 mt-md-0">
                        <label for="qty">
                            <b>Quantity</b>
                        </label>
                        <input
                            name="telepqtyhone"
                            type="number"
                            className="form-control"
                            id="qty"
                            placeholder="Quantity"
                            value={qty}
                            onChange={function (e) { setqty(e.target.value); }}
                            required
                        />
                    </div>
                    <br />
                </div>

                <br />

                <div class="row d-flex justify-content-center">

                    <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Submit</button><br />

                </div><br />

                <div class="row d-flex justify-content-center">

                    <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" style={{ background: "#24b9c7", border: "none", marginLeft:"48px"}} onClick={direct}>Inventory</button>

                </div><br />


            </form><br /><br />



        </div>


    );
}