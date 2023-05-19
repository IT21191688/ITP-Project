import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import back3 from "../reportImages/back3.jpg";

export default function UpdateReport() {


    const { id } = useParams();
    //const [donations, setDonations] = useState([]);
    const [ID, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [doctor, setDoctor] = useState("");
    const [processedDate, setProcessedDate] = useState("");
    const [sampleType, setSampleType] = useState("");
    const [TechnologistName, setTechnologistName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    let [dateValid, setDatevalid] = useState(false);

    useEffect(() => {
        function getReports() {
            axios.get("http://localhost:8050/report/get/" + id).then((res) => {
                console.log(res.data);
                setId(res.data.ID)
                setName(res.data.name)
                setAge(res.data.age)
                setGender(res.data.gender)
                setDoctor(res.data.doctor)
                setProcessedDate(res.data.processedDate)
                setSampleType(res.data.sampleType)
                setTechnologistName(res.data.TechnologistName)
                setFilepath(res.data.filepath)
                setStatus(res.data.status)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getReports();
    }, [])

    function handle(e) {

        e.preventDefault();//prevent normal behaviour sending data
        //alert("Insert");

        const UpdateReport = {
            ID,
            name,
            age,
            gender,
            doctor,
            processedDate,
            sampleType,
            TechnologistName,
            filepath,
            status
        }
        console.log(UpdateReport)


        axios.put("http://localhost:8050/report/update/" + id, UpdateReport).then(function () {
            alert("Report data Updated")
            window.location = "/labAllReports";
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div className="pt-1"

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

            <div>
                <div className="container">

                    <form className="form row g-3" onSubmit={handle}>
                        <div class="col-md-5"><br></br><br></br>
                            <label for="ID" className="form-label">Patient ID</label>
                            <input type="text" className="form-control" id="id" placeholder="Patient ID" value={ID}
                                onChange={(e) => {

                                    setId(e.target.value);

                                }} />
                        </div>



                        <div class="col-md-5"><br></br><br></br>

                            <label for="name" className="form-label">Patient Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your name" value={name}
                                onChange={(e) => {

                                    setName(e.target.value);

                                }} />
                        </div>


                        <div class="col-md-5"><br></br>&nbsp;&nbsp;&nbsp;

                            <label for="age" className="form-label" > Patient Age </label>
                            <input type="text" className="form-control" id="age" placeholder="Your age" value={age}
                                onChange={(e) => {

                                    setAge(e.target.value);

                                }} />
                        </div>


                        <div className="col-md-5"> <br></br>
                            <label class="form-check-label" >&nbsp;&nbsp;&nbsp;
                                Sex
                            </label>
                            <div class="col">&nbsp;&nbsp;&nbsp;
                                <table>
                                    <tr>
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={gender === "male"}

                                                    onChange={(e) => {

                                                        setGender(e.target.value);

                                                    }} />
                                                <label class="form-check-label" for="inlineRadio1">
                                                    male
                                                </label>
                                            </div>
                                        </td>
                                        <div class="form-check">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" checked={gender === "female"}
                                                onChange={(e) => {

                                                    setGender(e.target.value);

                                                }} />
                                            <label class="form-check-label" for="inlineRadio2">
                                                female
                                            </label>
                                        </div>
                                    </tr>
                                </table>
                            </div>
                        </div>




                        <div class="col-9"> <br></br>

                            <label for="doctor" className="form-label">Doctor Name</label>
                            <input type="text" className="form-control" id="doctor" placeholder="Doctor name" value={doctor}
                                onChange={(e) => {

                                    setDoctor(e.target.value);

                                }} />
                        </div>

                        <hr color={"yellow"} />
                        <div class="col-md-5"> <br></br>
                            <label for="sampleType" className="form-label">sample Type</label>
                            <input type="text" className="form-control" id="sampleType" placeholder="Sample Type" value={sampleType}
                                onChange={(e) => {

                                    setSampleType(e.target.value);

                                }} />
                        </div>



                        <div class="col-md-5"> <br></br>
                            <label for="processedDate" className="form-label">processed Date</label>
                            <input type="date" className="form-control" id="name" placeholder="processed Date" value={processedDate}
                                onChange={(e) => {

                                    setProcessedDate(e.target.value);

                                }} />

                        </div>
                        <div class="col-9"> <br></br>
                            <label for="TechnologistName" className="form-label">Technologist Name</label>
                            <input type="text" className="form-control" id="TechnologistName" placeholder="Technologist Name" value={TechnologistName}
                                onChange={(e) => {

                                    setTechnologistName(e.target.value);

                                }} />



                            <div class="col-9"> <br></br>
                                <label for="name" className="form-label">Report</label>
                                <input type="text" className="form-control" placeholder="Your age" value={filepath} onChange={(e) => {
                                    setFilepath(e.target.value);
                                }} />
                            </div>
                        </div>
                        <div class="col-9"><br></br>
                            <label for="status" className="form-label">Comment</label>
                            <input type="text" className="form-control" id="name" placeholder="status" value={status}
                                onChange={(e) => {

                                    setStatus(e.target.value);

                                }} />{error && status.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>



                        <br></br><br></br>
                        <button type="submit" className="btn submit" style={{ background: "#26CDD1", color: "white" }}>Submit</button>
                    </form>

                </div >

            </div >
            <br></br>
        </div >


    )
}