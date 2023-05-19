import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPrint from "react-to-print";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dcedited from "../patientImages/dcedited.jpeg";
import medlogo from "../patientImages/medlogo.jpeg";

export default function AllPatientsRead() {

    //class component waladi componentdidmount
    //session json with tocken
    const [patients, setPatients] = useState([]);
    const [filter, setFilter] = useState("");
    const ref = useRef()
    // const [channeling, setChanneling] = useState([]);

    const navigate = useNavigate();


    useEffect(function () {


        function getPatients() {
            axios.get("http://localhost:8050/patient/").then(function (res) {

                console.log(res.data);

                setPatients(res.data);

            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getPatients();

    }, [])

    const [src, setSrc] = useState([]);

    const imageSrc = (e) => {
        console.log(e.target.src);
        setSrc(e.target.src)
    }

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filteredDetails = patients.filter((rep) => {
        return rep.name.toLowerCase().includes(filter.toLowerCase());

    })

    //Generate PDF
    function generatePDF() {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Registered Patients Details";
        const headers = [
            ["Name", "NIC", "Address", "Birthdate", "Phone Number", "Email"],
        ];

        const data = patients.map((rep) => [
            rep.name,
            rep.nic,
            rep.address,
            rep.birthdate,
            rep.phone,
            rep.email,
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("PatientReport.pdf");
        toast("Patient Report Downloading...");
    };

    return (

        <div className="" style={{ overflow: 'hidden' }}>

            <div>

                {/*<div className="bg-1" style={{ height: "300px", backgroundColor: "#26CCD1" }}>
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src={medlogo} className="rounded-circle" alt="Logo" width="200" height="200" />
                        <h3>Patient Details</h3><br></br>
    </div>*/}



            </div>



            <div
                style={{

                    backgroundImage: `url(${dcedited})`,
                    //backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    //background-size: cover;
                    backgroundPosition: 'center',
                    maxWidth: '100%',
                    opacity: '1.0',
                    overflowX: "hidden"

                }}>

                <br></br><h2>All Registered Patient Details</h2><br></br>

                <div class="row mt-4 justify-content-center">

                    <div>
                        <input type="text" className="search form-control" placeholder="Search by Name" style={{ margin: "0", width: "300px", alignContent: "left" }} onChange={handleFilterChange} />
                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">

                        <button type="button" class="btn text-white mt-2" style={{ background: "#2F4FAA" }} onClick={function () { navigate("/addedPatient") }} ><b>Add Patient</b></button>
                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">

                        <button type="submit" class="btn text-white mt-2" style={{ background: "#2F4FAA" }} onClick={() => generatePDF()} ><b>Download All Patients</b></button>
                        <ToastContainer></ToastContainer> <br></br>

                    </div>



                </div>

                <table className="table table-striped table-hover" id="myTable" >
                    <thead>

                        <tr>
                            <th scope="col">Profile Picture</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Address</th>
                            <th scope="col">Birthdate</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            {/*<th scope="col">Blood Group</th>
                            <th scope="col">Height(cm)</th>
                            <th scope="col">Weight(kg)</th>
                            <th scope="col">Previuos Surgeries</th>
                        <th scope="col">Allergies</th>*/}
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                            {/*<th scope="col" className="pr-4">Print</th>*/}
                            <th scope="col" className="pr-4">View</th>
                        </tr>

                    </thead>
                    <tbody>
                        {filteredDetails.map((patients) => (


                            <tr>
                                <td>
                                    <img
                                        src={`http://localhost:8050/ProfilePic/${patients.profilePic}`}
                                        id="myImg"
                                        height={"50px"}
                                        alt="Profile Picture"
                                        width={"50px"}
                                    // border-style="solid"
                                    //style={{ cursor: 'pointer'}}
                                    />

                                </td>
                                <td>{patients.name}</td>
                                <td>{patients.nic}</td>
                                <td>{patients.address}</td>
                                <td>{patients.birthdate}</td>
                                <td>{patients.gender}</td>
                                <td>{patients.phone}</td>
                                <td>{patients.email}</td>
                                {/*<td>{patients.blood}</td>
                                <td>{patients.height}</td>
                                <td>{patients.weight}</td>
                                <td>{patients.surgery}</td>
                            <td>{patients.allergy}</td>*/}

                                <td><a href={'/updatePatient/' + patients._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                <td><a href={'/deletePatient/' + patients._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                                {/*<td><ReactPrint trigger={() => <button className="update" style={{background:"#2F4FAA",width:"150px",height:"40px",fontSize:"20px"}}>Print</button>} content={() => ref.current} /></td>*/}
                                <td><a href={'/viewProfile/' + patients._id}><button class="btn btn-sm text-white" style={{ background: "#0297BF", width: "100px" }}>View</button></a></td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </div >

    )
}