import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import jsPdf from 'jspdf';
import 'jspdf-autotable';


export default function ReadLabAppoinment() {

    //class component waladi componentdidmount
    //session json with tocken
    const [labAppoinments, setLabAppoinment] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");

    const navigate = useNavigate();

    useEffect(function () {

        function getLabAppoinment() {
            axios.get("http://localhost:8050/labappoinment/readlabAppoinment").then(function (res) {

                console.log(res.data);

                setLabAppoinmentDate(res.data.date);
                setLabAppoinment(res.data);



            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getLabAppoinment();




    }, [])


    const today = new Date();
    const dateString = today.toLocaleDateString(); // format as "MM/DD/YYYY"

    const [filter, setFilter] = useState("");

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }



    const [src, setSrc] = useState([]);


    const imageSrc = (e) => {
        console.log(e.target.src);
        setSrc(e.target.src)
    }


    function filterDate(e) {
        setTestDate(e.target.value);
    }

    //filtering doctor
    function filterType(e) {
        setTestType(e.target.value);
    }

    const filteredReports = labAppoinments.filter((rep) => {
        return rep.labTest.toLowerCase().includes(testType.toLowerCase()) & rep.nic.toLowerCase().includes(filter.toLowerCase()) & rep.date.toLowerCase().includes(testDate.toLowerCase());
    })


    function generatePdf() {

        const unit = "pt"
        const size = "A3"
        const orientation = "portrait"

        const marginLeft = 40;
        const doc = new jsPdf(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Lab Appoinment Table"

        const headers = [
            ["Patient Name", "Nic", "Contact Details", "Date & Time", "Number", "Status"]
        ];

        const data = filteredReports.map((rep) => [
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

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("AppoinmentReport.pdf");
        //toast("Item Report Download");

    };



    return (

        <div >


            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Doctor Priscription</h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img id="modelImg" src={src} width="350px" height="300px" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="text-white justify-content-center w-100" style={{ background: "#26CDD1", height: "180px", overflow: "hidden" }}>

                <h6 class="">{dateString}</h6>
                <h1 class="text-light">All LabAppoinments</h1>
                <div class="row mt-4 justify-content-center">
                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <label for="name"><b>Test Type</b></label><br />

                        <select className="form-control" onChange={e => setTestType(e.target.value)} required>
                            <option key={"Creatinine"} value={"Creatinine"}>Creatinine</option>
                            <option key={"CRP"} value={"CRP"}>CRP</option>
                            <option key={"Electrolytes"} value={"Electrolytes"}>Electrolytes</option>
                            <option key={"ESR"} value={"ESR"}>ESR</option>
                            <option key={"FastingBloodSugar"} value={"FastingBloodSugar"}>Fasting Blood Sugar</option>
                            <option key={"FullBloodCount"} value={"FullBloodCount"}>Full Blood Count</option>
                            <option key={"UrineFR"} value={"UrineFR"}>Urine FR</option>
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
                        <button type="button" class="btn text-black mt-2" style={{ background: "#2F4FAA", color: "white" }} onClick={function () { navigate("/generateReports") }} ><b>Generate charts</b></button>

                    </div>

                    <div className="form-group col-md-2 mt-3 mt-md-0">
                        <br />
                        <button type="button" class="btn text-black mt-2 text-light" style={{ background: "#2F4FAA" }} onClick={function () { generatePdf() }} ><b>Download All details</b></button>
                    </div>


                </div>

            </div>





            <table className="table table-striped table-hover" id="myTable">
                <thead>
                    <tr>
                        <th scope="col">Patient Name</th>
                        <th scope="col">NiC</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Img</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col">Lab Test</th>
                        <th scope="col">Number</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="pr-3">Update</th>
                        <th scope="col" className="pr-3">Delete</th>
                        <th scope="col" className="pr-3">Recipt</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((labAppoinment) => (



                        <tr>
                            <td>{labAppoinment.first_name + " " + labAppoinment.last_name}</td>
                            <td>{labAppoinment.nic}</td>
                            <td>{labAppoinment.email + " " + labAppoinment.telephone}</td>
                            <td><button type="button" data-toggle="modal" data-target="#exampleModalCenter">

                                <img
                                    id="myImg"
                                    height={"50px"}
                                    alt="Snow"
                                    width={"40px"}
                                    src={`http://localhost:8050/Appoinment_slip/${labAppoinment.file_path}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={imageSrc}

                                />
                            </button>

                            </td>
                            <td className="tableTd">{moment(labAppoinment.date).utc().format('YYYY-MM-DD') + " " + labAppoinment.appTime}</td>
                            <td className="tableTd">{labAppoinment.labTest}</td>
                            <td className="tableTd">{labAppoinment.appNo}</td>
                            <td className="tableTd">{labAppoinment.status}</td>
                            <td className="tableTd"><a href={'/updateLabAppoinment/' + labAppoinment._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                            <td className="tableTd"><a href={'/deleteLabAppoinment/' + labAppoinment._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                            <td><a href={'/printLabAppoinment/' + labAppoinment._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>Print</button></a></td>

                        </tr>

                    ))}

                </tbody>


            </table>



        </div >



    )


}
