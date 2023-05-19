import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink, props } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import moment from "moment";
import jsPdf from 'jspdf';
import 'jspdf-autotable';
//import 'react-toastify/dist/react-toastify.css';
import logo from "../siteImages/medlogo.png";



export default function ReadAppoinment() {

    //class component waladi componentdidmount
    //session json with tocken
    const [appoinments, setAppoinments] = useState([]);
    const [channeling, setChanneling] = useState([]);

    const navigate = useNavigate();


    useEffect(function () {

        function getAppoinment() {
            axios.get("http://localhost:8050/appoinment/readAppoinment").then(function (res) {

                console.log(res.data);

                setAppoinments(res.data);

                console.log(res.data.file_path)



            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getAppoinment();


        function getDoctorName() {
            axios.get("http://localhost:8050/doctor/readDoctor").then(function (res) {

                console.log(res.data);

                setChanneling(res.data);


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getDoctorName();

    }, [])

    const [filter, setFilter] = useState("");
    const [filterDoc, setDocFilter] = useState("");
    const [filterDat, setDateFilter] = useState("");

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    function filterDate(e) {
        setDateFilter(e.target.value);
    }

    //filtering doctor
    function filterDoctor(e) {
        setDocFilter(e.target.value);
    }
    const filteredReports = appoinments.filter((rep) => {
        return rep.doctor_name.toLowerCase().includes(filterDoc.toLowerCase()) & rep.nic.toLowerCase().includes(filter.toLowerCase()) & rep.date.toLowerCase().includes(filterDat.toLowerCase());
    })

    function generatePdf() {

        const unit = "pt"
        const size = "A3"
        const orientation = "portrait"

        const marginLeft = 40;
        const doc = new jsPdf(orientation, unit, size);

        const imageData = logo



        doc.setFontSize(15);

        const title = "                   Doctor Appoinments Table"

        const headers = [
            ["Doctor", "Patient Name", "Nic", "Contact Details", "Date & Time", "Number", "Status"]
        ];

        const data = filteredReports.map((rep) => [
            rep.specialization + " " + rep.doctor_name,
            rep.first_name + " " + rep.last_name,
            rep.nic,
            rep.email,
            moment(rep.date).utc().format('YYYY-MM-DD') + " " + rep.appTime,
            rep.appNo,
            rep.status
        ])

        let content = {
            startY: 50,
            head: headers,
            body: data,
        }
        doc.addImage(imageData, "JPEG", 10, 10, 50, 50);
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("AppoinmentReport.pdf");
        //toast("Item Report Download");

    };


    /*
 
     function handleFilterChange(e) {
         setFilter(e.target.value);
     }
 
     const filterName = readPrescription.filter((rep) => {
         const filterLowerCase = filter.toLowerCase();
 
         // Check if any field includes the filter value
         const isMatch =
             rep.status.toLowerCase().includes(filterLowerCase) ||
             rep.orderID.toLowerCase().includes(filterLowerCase) ||
             rep.title.toLowerCase().includes(filterLowerCase) ||
             rep.name.toLowerCase().includes(filterLowerCase) ||
             rep.age.toString().toLowerCase().includes(filterLowerCase) ||
             rep.email.toLowerCase().includes(filterLowerCase) ||
             rep.telephone.toLowerCase().includes(filterLowerCase) ||
             rep.town.toLowerCase().includes(filterLowerCase) ||
             rep.address.toLowerCase().includes(filterLowerCase) ||
             rep.prescription.toLowerCase().includes(filterLowerCase);
 
         return isMatch;
     });
 
     */



    return (

        <div className="container-md" >


            <div class="text-white  " style={{ background: "#26CDD1", height: "180px" }}>
                <br />
                <h1 className="text-light">Doctor Appoinments</h1>

                <div class="row mt-4 justify-content-center">

                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <label for="name"><b>Doctor</b></label><br />
                        <select className="form-control" onChange={filterDoctor}>
                            {channeling.map(item => (
                                <option key={item.firstname + " " + item.lastname} value={item.firstname + " " + item.lastname}>{item.firstname + " " + item.lastname}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <label for="name"><b>Date</b></label><br></br>
                        <input className="form-control" type="date" onChange={filterDate} />
                    </div>
                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <label for="name"><b>Search</b></label><br></br>
                        <input className="form-control search" type="text" placeholder="Search by NIC" onChange={handleFilterChange} style={{ margin: "0" }} />
                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <br />
                        <button type="button" class="btn text-black mt-2 text-light" style={{ background: "#2F4FAA" }} onClick={function () { navigate("/generateReports") }} ><b>Generate charts</b></button>
                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <br />
                        <button type="button" class="btn text-black mt-2 text-light" style={{ background: "#2F4FAA" }} onClick={function () { generatePdf() }} ><b>Download All details</b></button>
                    </div>

                </div>


            </div>
            <div style={{ overflowX: 'scroll' }}>
                <table className="table table-striped table-hover" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Contact Details</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                            <th scope="col" className="pr-4">Recipt</th>
                        </tr>

                    </thead>
                    <tbody>
                        {filteredReports.map((appoinment) => (


                            <tr>
                                <td>{appoinment.specialization + " " + appoinment.doctor_name}</td>
                                <td>{appoinment.first_name + " " + appoinment.last_name}</td>
                                <td>{appoinment.nic}</td>
                                <td>{appoinment.email + " " + appoinment.telephone}</td>
                                <td>{moment(appoinment.date).utc().format('YYYY-MM-DD') + " " + appoinment.appTime}</td>
                                <td>{appoinment.appNo}</td>
                                <td>{appoinment.status}</td>
                                <td><a href={'/updateAppoinment/' + appoinment._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                <td><a href={'/deleteAppoinment/' + appoinment._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                                <td><a href={'/printAppoinment/' + appoinment._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Print</button></a></td>
                            </tr>

                        ))}



                    </tbody>



                </table>

            </div>

        </div >



    )


}
