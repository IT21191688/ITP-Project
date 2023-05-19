import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink, props } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import logo from "../DoctorImage/logo.jpeg"
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import Doctor from "../../../BACKEND/models/Doctor";
import doc1 from "../DoctorImage/kamishkaDoctor.jpg"



export default function AllDoctorsRead() {

    //class component waladi componentdidmountss
    //session json with tocken
    const [doctors, setDoctors] = useState([]);
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();


    useEffect(function () {

        function getdoctors() {
            axios.get("http://localhost:8050/doctor/").then(function (res) {

                console.log(res.data);

                setDoctors(res.data);



            }).catch(function (err) {
                alert("data not fech " + err);
            })
        }
        getdoctors();




    }, [])

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filtereddoctors = doctors.filter((rep) => {
        return rep.firstname?.toLowerCase().includes(filter?.toLowerCase());

    })

    function generatePDF(bills) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Doctor Details";
        const headers = [
            ["Doctor name", "Age", "Address", "Email", "Specialization", "working Days"],
        ];

        const data = doctors.map((rep) => [
            rep.firstname + "" + rep.lastname,
            rep.age,
            rep.address,
            rep.email,
            rep.specialization,
            rep.workingdays,

        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("DoctorReport.pdf");
        toast("Doctor Report Downloaded");
    };





    return (

        <div>

            <div className="" >

                <div>

                    <div className="bg-1" style={{ padding: "30px 0" }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200"></img>
                                <h1 style={{ color: "white" }}>Doctor Details</h1>

                            </div>


                            <div class="row mt-4 justify-content-center">

                                <button type="button" class="btn text-white m-1" style={{ background: "#2F4FAA", }} onClick={function () { navigate("/addDoctor") }} >Add Doctor</button>



                                <button type="submit" class="btn text-white m-1" style={{ background: "#2F4FAA" }} onClick={() => generatePDF()} >Download All Doctors</button>
                                <ToastContainer></ToastContainer>





                                <input type="text" className="form-control " placeholder="Search " style={{ margint: "0", width: '300px' }} onChange={handleFilterChange} />



                            </div>








                        </div>
                    </div>

                </div>

                <main className='background' style={{

                    backgroundImage: `url(${doc1})`,
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maxWidth: '100%',
                    opacity: '1',
                    overflowX: "scroll"


                }} >





                    <table className="table table-striped table-hover" id="myTable"  >
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">marital status</th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Experiance</th>
                                <th scope="col">previouse hospitals</th>
                                <th scope="col">Awards</th>
                                <th scope="col">Working days</th>
                                <th scope="col">Profile picture</th>
                                <th scope="col" className="pr-4">Recipt</th>
                            </tr>

                        </thead>
                        <tbody>
                            {filtereddoctors.map((doctors) => (


                                <tr>
                                    <td>{doctors.firstname + " " + doctors.lastname}</td>
                                    <td>{doctors.age}</td>
                                    <td>{doctors.address}</td>
                                    <td>{doctors.email + " " + doctors.mobile}</td>
                                    <td>{doctors.gender}</td>
                                    <td>{doctors.maritalstatus}</td>
                                    <td>{doctors.specialization}</td>
                                    <td>{doctors.experianceduration}</td>
                                    <td>{doctors.previousehospitals}</td>
                                    <td>{doctors.awards}</td>
                                    <td>{doctors.workingdays}</td>
                                    <td><img src={`http://localhost:8050/DoctorImage/${doctors.file_path}`} style={{ width: "50px", height: "50px" }} /></td>
                                    <td><a href={'/updateDoctors/' + doctors._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                    <td><a href={'/deleteDoctors/' + doctors._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                                    <td><a href={'/NewView/' + doctors._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>View</button></a></td>
                                    <td><a href={'/PrintDoctor/' + doctors._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Print</button></a></td>
                                    <td><a href={'/addsalary/'}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Salary</button></a></td>
                                </tr>

                            ))}



                        </tbody>



                    </table>

                </main>



            </div >

        </div>

    )


}