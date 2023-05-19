import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back3 from "../reportImages/back3.jpg";
import logo from "../reportImages/logo.jpeg"

export default function AllReports() {

    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();


    //useEffect is helpful for get data from database
    useEffect(() => {
        function getReports() {
            axios.get("http://localhost:8050/report/").then((res) => {
                console.log(res.data);
                setReports(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getReports();
    }, [])

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filteredReports = reports.filter((rep) => {
        return rep.ID.toLowerCase().includes(filter.toLowerCase());

    })

    return (
        <div
            style={{

                backgroundImage: `url(${back3})`,
                //backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'


            }}>

            <div>
                <tr><br></br>


                    <td><input type="text" className="search" placeholder="Search by ID" onChange={handleFilterChange} /></td>
                    {/*<div><td><button
                            className="button1"
                            type="button"
                            onClick={() => navigate("/genarateReport" )}
                        >
                            Genarate Reports
    </button></td></div>*/}
                </tr>

                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {filteredReports.map((rep, index) => {
                            return (
                                <>
                                    <div className="out1">

                                        <div className="card" id="num">

                                            <div className="card-body">
                                                <table>
                                                    <div>
                                                        <tr>
                                                            <td className="col-md-6"><img className="logo" src={logo}></img></td>
                                                            <td className="col-md-6">
                                                                <h5><b className="title">MEDIXO E- HEALTH CARE CENTER (PVT) LTD</b></h5>
                                                                <h6><b className="subtitle">No. 149, Galle Road, Colombo 3, Sri Lanka</b></h6>
                                                                <h6><b className="subtitle">Tel.0347 99 99 99</b></h6>
                                                                <div><ul><b className="subtitle1"><h6>CONFIDENTIAL LABORATORY REPORT</h6></b></ul></div></td>

                                                        </tr>
                                                    </div>



                                                    <div>
                                                        <div className="row">
                                                            <b className="col-md-6">
                                                                <b className="text pr-4">Patient ID:</b><b className="text2">{rep.ID}</b>
                                                            </b>
                                                            <b className="col-md-6 pr-9" style={{ paddingRight: "30%" }}>
                                                                <b className="text1">Report ID:</b> <b> rep/</b><b className="text2">{index + 1}</b>
                                                            </b>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="row">
                                                            <b className="col-md-6">
                                                                <b className="text pl-5">Patient Name :</b> <b className="text2">{rep.name}</b></b>
                                                            <b className="col-md-6" style={{ paddingRight: "27%" }}>
                                                                <b className="text1">Sample Type:</b><b className="text2">{rep.sampleType}</b>
                                                            </b>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="row">
                                                            <b className="pr-5 col-md-5" style={{ paddingLeft: "13%" }}>
                                                                <b className="text pr-5">Gender:</b> <b className="text2">{rep.gender}</b> <b className="text">Age: </b><b>{rep.age}</b></b>
                                                            <b className="col-md-6 " style={{ paddingRight: "4%" }}>
                                                                <b className=" text1" >processed Date:</b>  <b className="text2">{rep.processedDate}</b>
                                                            </b>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="row">
                                                            <b className="pr-5 col-md-5 " style={{ paddingLeft: "10%" }}>
                                                                <b className="text pr-5">Doctor:</b> <b className="text2">{rep.doctor}</b></b>
                                                            <b className="col-md-5" style={{ paddingRight: "0%" }}>
                                                                <b className=" text1" >Technologist Name:</b> <b className="text2">{rep.TechnologistName}</b>
                                                            </b>
                                                        </div>
                                                    </div>

                                                </table>

                                                <b>Report Details :</b> <br></br>
                                                <center><img height={"300px"} width={"500px"} src={`http://localhost:8050/images/${rep.filepath}`} /></center><br></br><br></br>
                                                {/*Re8port Details : <img src={`iamges/${dns.filepath}`} /><br></br>*/}
                                                <b>Comment :</b> {rep.status}<br></br><br></br>



                                                <td><a href={"/update/" + rep._id}><button className="update btn-lg">Update</button></a></td>
                                                <td ><a href={"/delete/" + rep._id}><button className="delete btn-lg">Delete</button></a></td>



                                                <hr className="hr1" color={"purple"} />
                                                <tr>
                                                    <td className="text3 " >Dr.Kamishka Hewapathirana<br />MBBS(Col),D.Path,MD(Histopath)<br />Consultant Histopathologist</td>
                                                    <td className="text5">Dr.Supipi Bandara<br />MBBS(Col),D.Path,MD(Chempath)<br />Consultant Chemical Pathologist</td>
                                                    <td className="text5">Dr.Rashini Warunika<br />MBBS(Col),D.Path,MD(Haematology)<br />Consultant Haemotologist</td>
                                                </tr>

                                            </div>

                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}