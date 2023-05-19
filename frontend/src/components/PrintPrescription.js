import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpg";




export default function PrintDoAppoinmentResipt() {

    const [readPrescription, setreadPrescription] = useState([]);

    const { id } = useParams();

    const [orderID, setOrderID] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [town, setTown] = useState("")
    const [address, setAddress] = useState("");
    const [file_path, setImage] = useState("");




    //const [appdata, setAppoinemtData] = useState("");

    const ref = useRef();

    const navigate = useNavigate();


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
                setImage(res.data.prescription);


                //alert(res.data.prescription)

            }).catch(function (err) {
                alert("data not fech");
                alert(err);
            });
        }
        getLabAppoinment();

    }, []);

    function cancel(e) {
        e.preventDefault();
        navigate("/readPrescriptionAdmin");
    }

    function Inventory(e) {
        e.preventDefault();
        navigate("/readMedicine");
    }

    // background: "#ced6d0"



    return (
        <div>

            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3>Print Prescription</h3><br></br>
                    </div>
                </div>


            </div>


            <>
                <main className='background' style={{
                    minHeight: "100vh",
                    background: "white",
                    overflow: "hidden",
                    paddingBottom: "100px",


                }}>
                    <header>
                        <div className="mt-3">
                            <center>
                                <h1 className="text-dark"></h1>
                            </center>
                        </div>
                    </header>

                    <section ref={ref} className="container border border-success rounded" style={{ background: "#FEFDFE" }} >
                        <div className="row d-flex justify-content-center mt-3">

                            <label className="text-info"><h1>Medixo E-Health Care Center (PVT) LTD</h1></label>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="font-st">
                                <label className="font-weight-bold">Address : </label><label>MEDIXO, No 257, Matale Road, Dambulla</label><br />
                                <label className="font-weight-bold">Email : </label><label>Medxio123@gmail.com</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <label className="font-weight-bold">Phone: </label><label>0662053122</label>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="title">
                            <div className="row d-flex justify-content-center">
                                <h2>Order Details and Prescriptipn</h2>

                            </div>
                            <h6>(For pharmacy use Only)</h6>


                        </div>

                        <div class="row ml-4">
                            <div class="row">
                                <h4>Order Number: {orderID}</h4>
                            </div>

                        </div>

                        <hr></hr>

                        <div >


                            <div class="row mr-5">
                                <h4>Patient Name: {title + " " + name}</h4>
                            </div><br />

                            <div class="row mr-5">
                                <h4>Patient Age: {age}</h4>
                            </div><br />

                            <div class="row mr-5">
                                <h4>Town: {town}</h4>
                            </div><br />

                            <div class="row mr-5">
                                <h4>Address: {address}</h4>
                            </div>
                            <br />

                            <div class="row mr-5">
                                <h4>Patient Email: {email} </h4>;
                            </div>
                            <br />

                            <div class="row mr-5">
                                <h4>Patient Telephone: {telephone}</h4>
                            </div>
                            <br />

                            <div class="row mr-5">
                                <h4>Prescription:</h4>&nbsp;
                                <h4><img
                                    id="myImg"
                                    height={"900px"}
                                    alt="Snow"
                                    width={"900px"}
                                    src={`http://localhost:8050/Prescriptions/${file_path}`}
                                    style={{ cursor: 'pointer' }}
                                /></h4>
                            </div>
                        </div><br></br>


                        <hr></hr>

                        <div className="footer">
                            <label className="font-weight-bold"> This is a computer generated document. No signature is required.</label>
                            <label className="font-weight-bold">Print on : {`${new Date().toLocaleString()}`}</label>
                        </div>
                        <br></br>



                    </section><br></br>

                    <div class="row d-flex justify-content-center">


                        <ReactPrint trigger={() => <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" style={{ backgroundColor: "#26CCD1" }}>Print</button>} content={() => ref.current} />
                        <br />

                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={cancel} style={{marginLeft:"48px"}}>Cancel</button>


                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button type="submit" className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={Inventory} style={{marginLeft:"48px", backgroundColor:"#04e0bf"}}>Inventory</button>


                    </div>


                </main>
            </>
        </div>



    );
}