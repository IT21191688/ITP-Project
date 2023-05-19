import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";





export default function ReadBuy() {

    //class component waladi componentdidmount
    //session json with tocken
    const [readPrescription, setreadPrescription] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    useEffect(function () {

        function getreadPrescriptions() {
            axios.get("http://localhost:8050/pha/").then(function (res) {

                console.log(res.data);

                setreadPrescription(res.data);
                //alert(res.data[0].title)


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getreadPrescriptions();




    }, [])

    const [src, setSrc] = useState([]);

    const imageSrc = (e) => {
        console.log(e.target.src);
        setSrc(e.target.src)
    }

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = `http://localhost:8050/Prescriptions/${readPrescription.prescription}`;
        link.href = src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filterName = readPrescription.filter((rep) => {
        return rep.status.toLowerCase().includes(filter.toLowerCase());

    })






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


            }}>

                <div style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <br />
                    <div style={{ padding: "20px 50px", display: 'flex', justifyContent: 'end' }}>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                        <h6>Search by Status</h6>
                        <input type="text" className="search form-control" placeholder="Search by Status" onChange={handleFilterChange} style={{ margin: "0", width: '300px', margin: "auto" }} />
                    </div>
                    <br />
                    <br />


                    <div className="">

                        <table className="table table-striped table-hover" id="myTable" style={{ color: "white" }}>
                            <thead style={{ color: "white" }}>
                                <tr>

                                    <th scope="col">order ID</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">E mail</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Town</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Prescription</th>
                                    <th scope="col" className="pr-3">Update</th>
                                    <th scope="col" className="pr-3">Recipt</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }}>
                                {filterName.map((readPrescription) => (



                                    <tr>
                                        <td style={{ color: "white" }}>{readPrescription.orderID}</td>
                                        <td style={{ color: "white" }}>{readPrescription.title + " " + readPrescription.name}</td>
                                        <td style={{ color: "white" }}>{readPrescription.age}</td>
                                        <td style={{ color: "white" }}>{readPrescription.email}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.telephone}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.town}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.address}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.status}</td>

                                        <td><button type="button" data-toggle="modal" data-target="#exampleModalCenter">

                                            <img
                                                id="myImg"
                                                height={"50px"}
                                                alt="Snow"
                                                width={"50px"}
                                                src={`http://localhost:8050/Prescriptions/${readPrescription.prescription}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={imageSrc}

                                            />
                                        </button>

                                        </td>

                                        <td className="tableTd"><a href={'/updateBuyAdmin/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                        <td><a href={'/printPrescription/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Print</button></a></td>

                                    </tr>

                                ))}

                            </tbody>


                        </table >
                    </div>



                </div >
            </section >


        </div>
    )


}