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
import doc1 from "../DoctorImage/doc1.jpg"



export default function SalaryRead() {

    //class component waladi componentdidmountss
    //session json with tocken
    const [salary, setSalary] = useState([]);

    const navigate = useNavigate();
    //const [filter, setFilter] = useState("");


    useEffect(function SalaryRead() {

        function getsalary() {
            axios.get("http://localhost:8050/salary/salary").then(function (res) {

                console.log(res.data);

                setSalary(res.data);



            }).catch(function (err) {
                alert("data not fech " + err);
            })
        }
        getsalary();




    }, [])







    return (

        <div>

            <div className="" >

                <div>

                    <div className="bg-1" style={{ padding: "30px 0" }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200"></img>
                                <h1 style={{ color: "white" }}>Salary Details</h1>

                            </div>



                            <div class="row mt-4 justify-content-center">

                                <div className="form-group col-md-2 mt-3 mt-md-0">
                                    <br />
                                    <button type="button" class="btn text-white mt-2" style={{ background: "#2F4FAA", }} onClick={function () { navigate("/addsalary") }} ><b>Add Salary</b></button>
                                </div>





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
                                <th scope="col">Doctor</th>
                                <th scope="col">basic Salary</th>
                                <th scope="col">completed Hours</th>
                                <th scope="col">Total Salary</th>


                            </tr>

                        </thead>
                        <tbody>
                            {salary.map((salary) => (


                                <tr>
                                    <td>{salary.name}</td>
                                    <td>{salary.basicsalary}</td>
                                    <td>{salary.completedhours}</td>
                                    <td>{salary.basicsalary + salary.completedhours * salary.OTsalary}</td>

                                    {/*<td><img src={`http://localhost:8050/DoctorImage/${doctors.file_path}`} style={{ width: "50px", height: "50px" }} /></td>
                                    <td><a href={'/updateDoctors/' + salary._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                    <td><a href={'/deleteDoctors/' + salary._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>
                                    <td><a href={'/NewView/' + doctors._id}><button class="btn btn-sm text-white" style={{ background: "#2F4FAA", width: "100px" }}>View</button></a></td>

                            */}

                                </tr>

                            ))}



                        </tbody>



                    </table>

                    <center>
                        <button type="button" class="btn btn-danger btn-lg mt-3" style={{ background: "#E53D3D", width: "100px" }} onClick={() => navigate("/readDoctors")}>Cancel</button>
                    </center>

                </main>





            </div >

        </div>

    )


}