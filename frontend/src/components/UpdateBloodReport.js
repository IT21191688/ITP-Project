import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import back3 from "../reportImages/back3.jpg";


export default function UpdateBloodReport() {


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
    const [WBC, setWBC] = useState("");
    const [NEUT, setNEUT] = useState("");
    const [LYMPH, setLYMPH] = useState("");
    const [MONO, setMONO] = useState("");
    const [EO, setEO] = useState("");
    const [BASO, setBASO] = useState("");
    const [RBC, setRBC] = useState("");
    const [HGB, setHGB] = useState("");
    const [HCT, setHCT] = useState("");
    const [MCV, setMCV] = useState("");
    const [status, setStatus] = useState("");


    useEffect(() => {
        function getBloodReports() {
            axios.get("http://localhost:8050/bloodreport/getBlood/" + id).then((res) => {
                console.log(res.data);
                setId(res.data.ID)
                setName(res.data.name)
                setAge(res.data.age)
                setGender(res.data.gender)
                setDoctor(res.data.doctor)
                setProcessedDate(res.data.processedDate)
                setSampleType(res.data.sampleType)
                setTechnologistName(res.data.TechnologistName)
                setWBC(res.data.WBC)
                setNEUT(res.data.NEUT)
                setLYMPH(res.data.LYMPH)
                setMONO(res.data.MONO)
                setEO(res.data.EO)
                setBASO(res.data.BASO)
                setRBC(res.data.RBC)
                setHGB(res.data.HGB)
                setHCT(res.data.HCT)
                setMCV(res.data.MCV)
                setStatus(res.data.status)
                //alert(res.data.gender)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getBloodReports();
    }, [])

    function handle(e) {

        e.preventDefault();//prevent normal behaviour sending data
        //alert("Insert");

        const UpdateBloodReport = {
            ID,
            name,
            age,
            gender,
            doctor,
            processedDate,
            sampleType,
            TechnologistName,
            WBC,
            NEUT,
            LYMPH,
            MONO,
            EO,
            BASO,
            RBC,
            HGB,
            HCT,
            MCV,
            status
        }
        console.log(UpdateBloodReport)


        axios.put("http://localhost:8050/bloodreport/updateBlood/" + id, UpdateBloodReport).then(function () {
            alert("Blood Report details Updated")
            window.location = "/blood";
        }).catch((err) => {
            alert(err)
        })
    }

    return (


        <div className="pt-1"

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
                <div className="container">
                    <form className="form row g-3" onSubmit={handle}>
                        <div class="col-md-5"><br></br>
                            <label for="ID" className="form-label">Patient ID</label>
                            <input type="text" className="form-control" id="id" placeholder="Patient ID" value={ID}
                                onChange={(e) => {
                                    setId(e.target.value);
                                }} />
                        </div>

                        <div class="col-md-5"><br></br>
                            <label for="name" className="form-label">Patient Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your name" value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                        </div>

                        <div class="col-md-5"><br></br>&nbsp;&nbsp;&nbsp;
                            <label for="age" className="form-label" >Patient Age </label>
                            <input type="text" className="form-control" id="age" placeholder="Your age" value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }} />
                        </div>

                        <div className="col-md-5"> <br></br>
                            <label class="form-check-label" >&nbsp;&nbsp;&nbsp;
                                Gender
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
                                }} /><br></br><br></br>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ flex: 1, backgroundColor: "purple", height: "3px" }} />

                                <p style={{ margin: "0 10px" }}>Update values</p>

                                <div style={{ flex: 1, backgroundColor: "purple", height: "3px" }} />
                            </div><br></br><br></br>
                        </div>

                        <div className="row">
                            <div class="col-md-4"><br></br>
                                <label for="ID" className="form-label">WBC</label>
                                <input type="text" className="form-control" id="id" placeholder="" value={WBC}
                                    onChange={(e) => {
                                        setWBC(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">NEUT</label>
                                <input type="text" className="form-control" id="name" placeholder="" value={NEUT}
                                    onChange={(e) => {
                                        setNEUT(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-4"> <br></br>

                                <label for="ID" className="form-label">LYMPH</label>
                                <input type="text" className="form-control" id="id" placeholder="" value={LYMPH}
                                    onChange={(e) => {
                                        setLYMPH(e.target.value);
                                    }} />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">MONO</label>
                                <input type="text" className="form-control" id="name" placeholder="" value={MONO}
                                    onChange={(e) => {
                                        setMONO(e.target.value);
                                    }} />
                            </div>



                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">EO</label>
                                <input type="text" className="form-control" id="id" placeholder="" value={EO}
                                    onChange={(e) => {
                                        setEO(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">BASO</label>
                                <input type="text" className="form-control" id="name" placeholder="" value={BASO}
                                    onChange={(e) => {
                                        setBASO(e.target.value);
                                    }} />
                            </div>

                        </div>
                        <div className="row">
                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">RBC</label>
                                <input type="text" className="form-control" id="id" placeholder="" value={RBC}
                                    onChange={(e) => {
                                        setRBC(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">HGB</label>
                                <input type="text" className="form-control" id="name" placeholder="" value={HGB}
                                    onChange={(e) => {
                                        setHGB(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">HCT</label>
                                <input type="text" className="form-control" id="id" placeholder="" value={HCT}
                                    onChange={(e) => {
                                        setHCT(e.target.value);
                                    }} />

                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-5"> <br></br>
                                <label for="name" className="form-label">MCV</label>
                                <input type="text" className="form-control" id="name" placeholder="" value={MCV}
                                    onChange={(e) => {
                                        setMCV(e.target.value);
                                    }} />
                            </div>

                            <div class="col-md-5"> <br></br>
                                <label for="status" className="form-label">Comment</label>
                                <input type="text" className="form-control" id="name" placeholder="status"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }} />
                            </div>
                        </div><br></br>
                        <button type="submit" className="btn submit" style={{ background: "#26CDD1", color: "white", width: "100px" }}>Submit</button>
                    </form>

                </div >
            </div >
            <br></br>
        </div>
    )
}


