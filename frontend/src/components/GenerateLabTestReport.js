import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import moment from "moment";
import reportGenerate from "../siteImages/reportGeneratePage.jpg";
import appoinmentAdminpgBack from "../siteImages/appoinmentAdminPageBack.jpg";

export default function PrintDoAppoinmentResipt() {

    const { labTestType } = useParams();


    const [success, setSuccess] = useState("");
    const [cancel, setCancel] = useState("");
    const [pending, setFuther] = useState("");
    const [unsuccess, setUnsuccess] = useState("");

    const [reportType, setReportType] = useState("");


    const [reportDate, setDate] = useState("");

    const [labAppoinments, setLabAppoinment] = useState([]);


    useEffect(function () {

        function getLabAppoinment() {
            axios.get("http://localhost:8050/labappoinment/readlabAppoinment").then(function (res) {

                console.log(res.data);
                setLabAppoinment(res.data);

            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getLabAppoinment();
        setReportType("Daily");



    }, []);


    // Sample data
    const data = [
        { name: 'Success', students: success },
        { name: 'Unsuccess', students: unsuccess },
        { name: 'Pending', students: pending },
        { name: 'Cancel', students: cancel }
    ];




    function AssignTime(e) {
        e.preventDefault();
        calculateAppoinmentStatus();

    }

    const repModDate = reportDate + "T00:00:00.000Z";

    function calculateAppoinmentStatus() {


        let success = 0;
        let unsuccess = 0;
        let pending = 0;
        let cancel = 0;


        for (var j = 0; j <= labAppoinments.length; j++) {

            const Montlydate = moment(labAppoinments[j].date).utc().format('YYYY-MM')
            const Yearlydate = moment(labAppoinments[j].date).utc().format('YYYY')

            if (labAppoinments[j].labTest === labTestType) {


                if (reportType === "Daily") {

                    if (labAppoinments[j].date === repModDate) {


                        if (labAppoinments[j].status === "success") {
                            success++;
                        }
                        else if (labAppoinments[j].status === "unsuccess") {
                            unsuccess++;
                        }
                        else if (labAppoinments[j].status === "pending") {
                            pending++;
                        }
                        else {

                            cancel++;
                        }

                    }

                }
                else if (reportType === "Monthly") {
                    const reportMonth = moment(repModDate).utc().format('YYYY-MM')

                    if (Montlydate === reportMonth) {


                        if (labAppoinments[j].status === "success") {
                            success++;
                        }
                        else if (labAppoinments[j].status === "unsuccess") {
                            unsuccess++;
                        }
                        else if (labAppoinments[j].status === "pending") {
                            pending++;
                        }
                        else {

                            cancel++;
                        }

                    }
                }
                else if (reportType === "Yearly") {


                    const reportYear = moment(repModDate).utc().format('YYYY')


                    if (Yearlydate === reportYear) {


                        if (labAppoinments[j].status === "success") {
                            success++;
                        }
                        else if (labAppoinments[j].status === "unsuccess") {
                            unsuccess++;
                        }
                        else if (labAppoinments[j].status === "pending") {
                            pending++;
                        }
                        else {

                            cancel++;
                        }

                    }
                }


            }
            setCancel(cancel)
            setSuccess(success)
            setFuther(pending)
            setUnsuccess(unsuccess)

        }


    }

    const colors = ['#FFC107', '#2196F3', '#4CAF50', '#E91E63'];

    return (
        <div style={{
            backgroundImage: `url( ${appoinmentAdminpgBack})`,
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundSize: 'cover',
            position: 'center',
            maxWidth: '100%',
            opacity: '1',
            overflow: "hidden"
        }}>

            <div><br></br>
                <div className="row justify-content-center pt-5" style={{}} >
                    <div class="col col-md-5 ml-5 rounded" style={{ background: "#cce6ff", opacity: "0.85" }}>
                        <div className="ml-5 mt-4" >
                            <br></br>
                            <h3>Test Name: {labTestType}</h3><br></br>
                            <div className="ml-5">
                                <div className="ml-5">
                                    <div className="ml-5">
                                        <div className="form-group col-md-6 ml-5">
                                            <label for="name"><b>Date</b></label>
                                            <input name="date" type="date" className="form-control" id="date" onChange={function (e) { setDate(e.target.value); }} required />
                                        </div><br />

                                        <div className="form-group col-md-6 mt-3 ml-5">
                                            <label for="name"><b>Report Type</b></label>
                                            <select className="form-control" onChange={e => setReportType(e.target.value)} required>
                                                <option key={"Daily"} value={"Daily"}>Daily</option>
                                                <option key={"Monthly"} value={"Monthly"}>Monthly</option>
                                                <option key={"Yearly"} value={"Yearly"}>Yearly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3>Appoinment Count</h3><br>
                                </br>
                                <h5>Success&nbsp;:{success}</h5>
                                <h5>Unsucces:{unsuccess}</h5>
                                <h5>Pending&nbsp;:{pending}</h5>
                                <h5>cancel&nbsp;:{cancel}</h5>
                            </div>

                        </div>
                    </div>
                    <div class="col rounded mr-5 col-md-5" style={{ background: "#cce6ff", opacity: "0.85" }}>
                        <div class="mt-5">
                            <h2>Lab Appoinment Details Chart</h2><br />
                            <BarChart width={600} height={400} data={data}>
                                <Bar dataKey="students" fill={colors[0]} />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </BarChart><br />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" class="btn btn-success" onClick={AssignTime}>Generate Chart</button>
                        </div>
                        <br></br><br></br>
                    </div>
                </div>
            </div >
        </div>
    );
}