import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import back3 from "../reportImages/back3.jpg";
import logo from "../reportImages/logo.jpeg";
import ReactPrint from "react-to-print";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

export default function ReportDetails() {
    const { ID } = useParams();
    const [reports, setReports] = useState([]);
    const [bloodreports, setBloodReports] = useState([]);
    const [filter, setFilter] = useState("");
    const ref = useRef();
    const down = useRef();

    const options = {
        Plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 2,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: (value) => value
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    };


    useEffect(function () {

        function getBloodReports() {
            axios.get("http://localhost:8050/bloodreport/blood").then((res) => {
                console.log(res.data);
                setBloodReports(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getBloodReports();
        handleFilterChange();
    }, [])

    function handleFilterChange(e) {
        setFilter(ID);
    }
    const filteredBloodReports = bloodreports.filter((rep) => {
        return rep.ID.toLowerCase().includes(filter.toLowerCase());

    })

    useEffect(function () {

        function getReports() {
            axios.get("http://localhost:8050/report/").then((res) => {
                console.log(res.data);
                setReports(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getReports();
        handleFilterChange();
    }, [])

    function handleFilterChange(e) {
        setFilter(ID);
    }
    const filteredReports = reports.filter((rep) => {
        return rep.ID.toLowerCase().includes(filter.toLowerCase());

    })

    return (
        <div

            style={{

                backgroundImage: `url(${back3})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'


            }}>

            <table>
                <thead>
                </thead>
                <tbody>
                    {filteredBloodReports.map((rep, index) => {
                        return (
                            <>

                                <div className="out" ref={ref}><br></br><br></br>

                                    <div className="card1" id="num">

                                        <div className="card-body">
                                            <table>
                                                <div>
                                                    <tr>
                                                        <td className="col-md-6 "><img className="logo1" src={logo} style={{ width: '200px', height: 'auto' }}></img></td>
                                                        <td className="col-md-6">
                                                            <h5><b className="title">MEDIXO E- HEALTH CARE CENTER (PVT) LTD</b></h5>
                                                            <h6><b className="subtitle">No. 149, Galle Road, Colombo 3, Sri Lanka</b></h6>
                                                            <h6><b className="subtitle">Tel.0347 99 99 99</b></h6>
                                                            <div><ul><b className="subtitle1"><h6>CONFIDENTIAL LABORATORY REPORT</h6></b></ul></div></td>

                                                    </tr>
                                                </div>



                                                <div>
                                                    <tr >

                                                        <td className="col-md-6"><b className="text">Patient ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.ID}</b></td>
                                                        <td className="col-md-6">
                                                            <b className="text1">Report ID:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> rep/</b><b className="text2">{index + 1}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Patient Name :</b> &nbsp;<b className="text2">{rep.name}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">Sample Type:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.sampleType}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Sex:</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.gender}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text">Age: </b><b>{rep.age}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">processed Date:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.processedDate}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Doctor:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.doctor}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">Technologist Name:</b> &nbsp;&nbsp;&nbsp;<b className="text2">{rep.TechnologistName}</b></td><br></br>

                                                    </tr><br></br></div>
                                                <div>
                                                    <tr>
                                                        <th className="parameter col-md-4"><b><h6>Parameter</h6></b></th>
                                                        <th className="pRange col-md-4"><b><h6>Patient Range</h6></b></th>
                                                        <th className="nRange col-md-4"><b><h6>Normal Range</h6></b></th>
                                                        <th className="result col-md-4"><b><h6>Result</h6></b></th>

                                                    </tr>


                                                    <tr>
                                                        <td><hr className="hr1" color={"purple"} /></td>
                                                        <td><hr className="hr1" color={"purple"} /></td>
                                                        <td><hr className="hr1" color={"purple"} /></td>
                                                        <td><hr className="hr1" color={"purple"} /></td>

                                                    </tr>


                                                    <tr>
                                                        <td className="col-md-3"><b>WBC</b></td>
                                                        <td className="pRange col-md-3">
                                                            {rep.WBC}
                                                        </td>
                                                        <td className="col-md-3">(4.0 - 11.0)</td>
                                                        <td className="col-md-3">{rep.WBC && (
                                                            <>

                                                                {rep.WBC >= 4.0 && rep.WBC <= 11 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>NEUT%</b></td><td className="pRange col-md-3">  {rep.NEUT}</td>

                                                        <td className="col-md-3">(40 - 75)</td>
                                                        <td className="col-md-3">{rep.NEUT && (
                                                            <>

                                                                {rep.NEUT >= 40 && rep.NEUT <= 75 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>LYMPH%</b></td><td className="pRange col-md-3"> {rep.LYMPH}</td>

                                                        <td className="col-md-3">(20 - 42)</td>
                                                        <td className="col-md-3">{rep.LYMPH && (
                                                            <>

                                                                {rep.LYMPH >= 20 && rep.LYMPH <= 42 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>MONO%</b></td><td className="pRange col-md-3"> {rep.MONO}</td>

                                                        <td className="col-md-3">(2 - 8)</td>
                                                        <td className="col-md-3">{rep.MONO && (
                                                            <>

                                                                {rep.MONO >= 2 && rep.MONO <= 8 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>EO%</b> </td><td className="pRange col-md-3">{rep.EO}</td>

                                                        <td className="col-md-3">(1 - 6)</td>
                                                        <td className="col-md-3">{rep.EO && (
                                                            <>

                                                                {rep.EO >= 1 && rep.EO <= 6 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>BASO%</b></td><td className="pRange col-md-3">{rep.BASO}</td>

                                                        <td className="col-md-3">(0 - 1)</td>
                                                        <td className="col-md-3">{rep.BASO && (
                                                            <>

                                                                {rep.BASO >= 0 && rep.BASO <= 1 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>RBC</b></td><td className="pRange col-md-3">{rep.RBC}</td>

                                                        <td className="col-md-3">(3.90 - 5.30)</td>
                                                        <td className="col-md-3">{rep.RBC && (
                                                            <>

                                                                {rep.RBC >= 3.90 && rep.RBC <= 5.30 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>HGB</b> </td><td className="pRange col-md-3">{rep.HGB}</td>

                                                        <td className="col-md-3">(11.0 - 17.5)</td>
                                                        <td className="col-md-3">{rep.HGB && (
                                                            <>

                                                                {rep.HGB >= 11.0 && rep.HGB <= 17.5 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>HCT</b> </td><td className="pRange col-md-3">{rep.HCT}</td>

                                                        <td className="col-md-3">(34 - 45)</td>
                                                        <td className="col-md-3">{rep.HCT && (
                                                            <>

                                                                {rep.HCT >= 34 && rep.HCT <= 45 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="col-md-3"><b>MCV</b></td><td className="pRange col-md-3"> {rep.MCV}</td>

                                                        <td className="col-md-3">(75 - 95)</td>
                                                        <td className="col-md-3">{rep.MCV && (
                                                            <>

                                                                {rep.MCV >= 75 && rep.MCV <= 95 ? (
                                                                    <b>Normal</b>
                                                                ) : (
                                                                    <b className="text4">Abnormal</b>
                                                                )}
                                                            </>
                                                        )}</td>
                                                    </tr>

                                                </div>

                                            </table><br></br>


                                            <b>Comment :</b> {rep.status}<br></br><br></br>
                                            <div style={{ width: '350px', height: '350px', marginLeft: '200px' }}>
                                                <Line data={{
                                                    labels: ["WBC", "RBC", "HGB", "HCT"],
                                                    datasets: [{
                                                        data: [6.0, 4.0, 15, 40], // static data
                                                        backgroundColor: 'transparent',
                                                        borderColor: '#66a3ff',
                                                        pointBorderColor: 'transparent',
                                                        printBorderWidth: 4,
                                                        tension: 0.3
                                                    }, {
                                                        data: [rep.WBC, rep.RBC, rep.HGB, rep.HCT], // dynamic data
                                                        backgroundColor: 'transparent',
                                                        borderColor: '#f26c6d',
                                                        pointBorderColor: 'transparent',
                                                        printBorderWidth: 4,
                                                        tension: 0.3
                                                    }]
                                                }}
                                                    options={options}></Line>


                                            </div>

                                            <hr className="hr1" color={"purple"} />
                                            <tr>
                                                <td className="text3">Dr.Kamishka Hewapathirana<br />MBBS(Col),D.Path,MD(Histopath)<br />Consultant Histopathologist</td>
                                                <td className="text5">Dr.Supipi Bandara<br />MBBS(Col),D.Path,MD(Chempath)<br />Consultant Chemical Pathologist</td>
                                                <td className="text5">Dr.Rashini Warunika<br />MBBS(Col),D.Path,MD(Haematology)<br />Consultant Haemotologist</td>
                                            </tr>
                                        </div>
                                    </div>
                                </div><br></br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ReactPrint trigger={() => <button className="update" style={{ background: "#2F4FAA", width: "150px", height: "40px", fontSize: "20px" }}>Print</button>} content={() => ref.current} />

                            </>

                        );

                    })}
                </tbody>
            </table>

            {/*Strting From X-Ray */}<br></br><br></br><br></br>




            <table>
                <thead>
                </thead>
                <tbody>
                    {filteredReports.map((rep, index) => {
                        return (
                            <>
                                <div className="out" ref={down}>

                                    <div className="card1" id="num">

                                        <div className="card-body">
                                            <table>
                                                <div>
                                                    <tr>
                                                        <td className="col-md-6"><img className="logo1" src={logo} style={{ width: '200px', height: 'auto' }}></img></td>
                                                        <td className="col-md-6">
                                                            <h5><b className="title">MEDIXO E- HEALTH CARE CENTER (PVT) LTD</b></h5>
                                                            <h6><b className="subtitle">No. 149, Galle Road, Colombo 3, Sri Lanka</b></h6>
                                                            <h6><b className="subtitle">Tel.0347 99 99 99</b></h6>
                                                            <div><ul><b className="subtitle1"><h6>CONFIDENTIAL LABORATORY REPORT</h6></b></ul></div></td>

                                                    </tr>
                                                </div>

                                                <div>
                                                    <tr >

                                                        <td className="col-md-6"><b className="text">Patient ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.ID}</b></td>
                                                        <td className="col-md-6">
                                                            <b className="text1">Report ID:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> rep/</b><b className="text2">{index + 1}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Patient Name :</b> &nbsp;<b className="text2">{rep.name}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">Sample Type:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.sampleType}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Sex:</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.gender}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text">Age: </b><b>{rep.age}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">processed Date:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.processedDate}</b></td><br></br>

                                                    </tr>
                                                    <tr>

                                                        <td><b className="col-md-6 text">Doctor:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.doctor}</b></td>
                                                        <td>
                                                            <b className="col-md-6 text1">Technologist Name:</b> &nbsp;&nbsp;&nbsp;<b className="text2">{rep.TechnologistName}</b></td><br></br>

                                                    </tr><br></br></div>
                                            </table>

                                            <b>Report Details :</b> <br></br>
                                            <center><img height={"300px"} width={"500px"} src={`http://localhost:8050/images/${rep.filepath}`} /></center><br></br><br></br>
                                            {/*Re8port Details : <img src={`iamges/${dns.filepath}`} /><br></br>*/}
                                            <b>Comment :</b> {rep.status}<br></br><br></br>

                                            <hr className="hr1" color={"purple"} />
                                            <tr>
                                                <td className="text3 ">Dr.Kamishka Hewapathirana<br />MBBS(Col),D.Path,MD(Histopath)<br />Consultant Histopathologist</td>
                                                <td className="text5">Dr.Supipi Bandara<br />MBBS(Col),D.Path,MD(Chempath)<br />Consultant Chemical Pathologist</td>
                                                <td className="text5">Dr.Rashini Warunika<br />MBBS(Col),D.Path,MD(Haematology)<br />Consultant Haemotologist</td>
                                            </tr>

                                        </div>

                                    </div>
                                </div><br></br><br></br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ReactPrint trigger={() => <button className="update" style={{ background: "#2F4FAA", width: "150px", height: "40px", fontSize: "20px" }}>Print</button>} content={() => down.current} />

                            </>
                        );
                    })}
                </tbody>
            </table>
            <br></br>

        </div>

    )


}