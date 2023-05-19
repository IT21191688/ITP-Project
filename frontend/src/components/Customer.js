import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function ReadBuy() {

    //class component waladi componentdidmount
    //session json with tocken
    const [readPrescription, setreadPrescription] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");

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



    return (

        <div >
            <table className="table table-striped table-hover" id="myTable">
                <thead>
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
                        <th scope="col" className="pr-3">Delete</th>
                        <th scope="col" className="pr-3">Recipt</th>
                    </tr>
                </thead>
                <tbody>
                    {readPrescription.map((readPrescription) => (



                        <tr>
                            <td>{readPrescription.orderID}</td>
                            <td>{readPrescription.title + " " + readPrescription.name}</td>
                            <td>{readPrescription.age}</td>
                            <td>{readPrescription.email}</td>
                            <td className="tableTd">{readPrescription.telephone}</td>
                            <td className="tableTd">{readPrescription.town}</td>
                            <td className="tableTd">{readPrescription.address}</td>
                            <td className="tableTd">{readPrescription.status}</td>

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

                            <td className="tableTd"><a href={'/updatePrescription/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                            <td className="tableTd"><a href={'/deletePrescription/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                            <td><a href={'/printLabAppoinment/'}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Print</button></a></td>

                        </tr>

                    ))}

                </tbody>


            </table>



        </div >



    )


}