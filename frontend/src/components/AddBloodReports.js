import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import back4 from "../reportImages/back4.jpg";
import logo from "../reportImages/logo.jpeg"

export default function AddBloodReport() {

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


    //validations
    const [error, setError] = useState(false);
    let [dateValid, setDatevalid] = useState(true);
    let [ageValid, setAgevalid] = useState(false);
    let [nicValid, setNICValid] = useState();
    let [wbcValid, setWBCValid] = useState(false);
    let [neutValid, setNEUTValid] = useState(false);
    let [lymphValid, setLYMPHValid] = useState(false);
    let [monoValid, setMONOValid] = useState(false);
    let [eoValid, setEOValid] = useState(false);
    let [basoValid, setBASOValid] = useState(false);
    let [rbcValid, setRBCalid] = useState(false);
    let [hgbValid, setHGBValid] = useState(false);
    let [hctValid, setHCTValid] = useState(false);
    let [mcvValid, setMCVValid] = useState(false);
    //let [dataValid, setDatavalid] = useState(true)

    function sendData(e) {
        e.preventDefault();
        validateDate(processedDate)
        validateAge(age)
        nicValidation(ID)
        //validateValues(WBC)
        //validateNEUT(NEUT)
        //validateLYMPH(LYMPH)
        //validateMONO(MONO)
        //validateEO(EO)
        //validateBASO(BASO)
        //validateRBC(RBC)
        //validateHGB(HGB)
        //validateHCT(HCT)
        //validateMCV(MCV)

        function nicValidation(nic) {
            var regex = /^([0-9]{9}[V|v|X|x]|[0-9]{12})$/;

            if (regex.test(nic)) {
                setNICValid(true)
            } else {
                setNICValid(false)
            }
        }

        function validateAge(Age) {
            if (Age < 0) {
                setAgevalid(true)

            } else {
                setAgevalid(false)
            }
        }

        function validateDate(date) {

            let todayYear = new Date().getFullYear()
            let todayMonth = new Date().getMonth() + 1
            let todayDay = new Date().getDate()

            let selectdateYear = Number(moment(date).utc().format('YYYY'))
            let selectdateMonth = Number(moment(date).utc().format('MM'))
            let selectdateDay = Number(moment(date).utc().format('DD'))
            let selectedNewDate = Number(selectdateDay) + 1

            if (todayYear === selectdateYear) {
                if (todayMonth === selectdateMonth) {
                    if (todayDay == selectedNewDate) {
                        setDatevalid(true)
                        return true;

                    }
                    setDatevalid(false)
                    return false;

                }
                setDatevalid(false)
                return false;
            }
            setDatevalid(false);
            return false;
        }

        {/*function validateValues(wbc) {
            if (wbc <= 0 || wbc >= 15) {
                setWBCValid(true)
            }else
            setWBCValid(false)
        }

        function validateNEUT(neut) {
            if (neut <= 30 || neut >= 85) {
                setNEUTValid(true)
            }else
            setNEUTValid(false)
        }

        function validateLYMPH(lymph){
            if (lymph <= 10 || lymph >= 50) {
                setLYMPHValid(true)
            }else
            setLYMPHValid(false)

        }

        function validateMONO(mono) {
            if (mono <= -10 || mono >= 15) {
                setMONOValid(true)
            }else
            setMONOValid(false)
        }

        function validateEO(eo) {
            if (eo <= -5 || eo >= 15) {
                setEOValid(true)
            }else
            setEOValid(false)
        }

        function validateBASO(baso){
            if (baso <= 10 || baso >= 50) {
                setBASOValid(true)
            }else
            setBASOValid(false)
        }

        function validateRBC(rbc){
            if (rbc <= -5 || rbc >= 15) {
                setRBCalid(true)
            }else
            setRBCalid(false)

        }

        function validateHGB(hgb) {
            if (hgb <= 0 || hgb >= 25) {
                setHGBValid(true)
            }else
            setHGBValid(false)
        }

        function validateHCT(hct) {
            if (hct <= 25 || hct >= 55) {
                setHCTValid(true)
            }else
            setHCTValid(false)
        }

        function validateMCV(mcv){
            if (mcv <= 65 || mcv >= 105) {
                setMCVValid(true)
            }else
            setMCVValid(false)
        }*/}



        if (ID.length == 0) {
            setError(true)
        }
        if (name.length == 0 || age.length == 0 || gender.length == 0 || doctor.length == 0) {
            setError(true)
        }
        if (processedDate.length == 0 || sampleType.length == 0 || TechnologistName.length == 0 || status.length == 0) {
            setError(true)
        }
        if (WBC.length == 0 || NEUT.length == 0 || LYMPH.length == 0 || MONO.length == 0 || EO.length == 0 || BASO.length == 0) {
            setError(true)
        }
        if (RBC.length == 0 || HGB.length == 0 || HCT.length == 0 || MCV.length == 0 || status.length == 0) {
            setError(true)
        }

        const newBloodReport = {
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

        axios.post("http://localhost:8050/bloodreport/addBlood", newBloodReport).then(function () {
            alert("data Inserted")
            window.location = "/blood";
        }).catch((err) => {
            alert(err)
        })

    }

    return (
        <div
            style={{

                backgroundImage: `url(${back4})`,
                //backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                //opacity: '0.8'


            }}>

            <div className="bg-1" style={{ height: "250px" }}>
                <div className="container text-left">

                    <table class="table">
                        <thead>
                            <tr>

                                <th scope="col"><img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" /></th>
                                <th scope="col"><h1 style={{ color: "white" }}>Create Blood Reports</h1><br></br></th>

                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div>
                <div className="container">
                    <form className="form row g-3" onSubmit={sendData}>
                        <div class="col-md-5"><br></br><br></br>
                            <label for="ID" className="form-label">Patient ID</label>
                            <input type="text" className="form-control" id="id" placeholder="Patient ID"
                                onChange={(e) => {
                                    setId(e.target.value);
                                }} />{error && ID.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                            {nicValid == false ?
                                <label style={{ color: "red" }}>*Not in srilankan format</label> : ""}


                        </div>

                        <div class="col-md-5"><br></br><br></br>
                            <label for="name" className="form-label">Patient Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />{error && name.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>

                        <div class="col-md-5"><br></br>&nbsp;&nbsp;&nbsp;
                            <label for="age" className="form-label" >Patient Age </label>
                            <input type="text" className="form-control" id="age" placeholder="Your age"
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }} />{error && age.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                            {ageValid == true ?
                                <label style={{ color: "red" }}>*Age must be positive value</label> : ""}


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
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male"
                                                    onChange={(e) => {
                                                        setGender(e.target.value);
                                                    }} />
                                                <label class="form-check-label" for="inlineRadio1">
                                                    male
                                                </label>
                                            </div>
                                        </td>
                                        <div class="form-check">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female"
                                                onChange={(e) => {
                                                    setGender(e.target.value);
                                                }} />
                                            <label class="form-check-label" for="inlineRadio2">
                                                female
                                            </label>
                                        </div>
                                    </tr>{error && gender.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}

                                </table>
                            </div>
                        </div>

                        <div class="col-9"> <br></br>
                            <label for="doctor" className="form-label">Doctor Name</label>
                            <input type="text" className="form-control" id="doctor" placeholder="Doctor name"
                                onChange={(e) => {
                                    setDoctor(e.target.value);
                                }} />{error && doctor.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>


                        <hr color={"yellow"} />
                        <div class="col-md-5"> <br></br>
                            <label for="sampleType" className="form-label">sample Type</label>
                            <input type="text" className="form-control" id="sampleType" placeholder="Sample Type"
                                onChange={(e) => {
                                    setSampleType(e.target.value);
                                }} />{error && sampleType.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>

                        <div class="col-md-5"> <br></br>
                            <label for="processedDate" className="form-label">processed Date</label>
                            <input type="date" className="form-control" id="name" placeholder="processed Date"
                                onChange={(e) => {
                                    setProcessedDate(e.target.value);
                                }} />{error && processedDate.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                            {dateValid == false ?
                                <label style={{ color: "red" }}>*Not matched todayDate</label> : ""}

                        </div>

                        <div class="col-9"> <br></br>

                            <label for="TechnologistName" className="form-label">Technologist Name</label>
                            <input type="text" className="form-control" id="TechnologistName" placeholder="Technologist Name"
                                onChange={(e) => {
                                    setTechnologistName(e.target.value);
                                }} />{error && TechnologistName.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                            <br></br><br></br>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ flex: 1, backgroundColor: "purple", height: "3px" }} />

                                <p style={{ margin: "0 10px" }}>Add values</p>

                                <div style={{ flex: 1, backgroundColor: "purple", height: "3px" }} />
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-4"><br></br>
                                <label for="ID" className="form-label">WBC</label>
                                <input type="text" className="form-control" id="id" placeholder=""
                                    onChange={(e) => {
                                        setWBC(e.target.value);
                                    }} />{error && WBC.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*
                                        {wbcValid == true ?
                                        <label style={{ color: "red" }}>*(Not in correct range 0.0 - 15.0)</label> : ""}}*/}


                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">NEUT</label>
                                <input type="text" className="form-control" id="name" placeholder=""
                                    onChange={(e) => {
                                        setNEUT(e.target.value);
                                    }} />{error && NEUT.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{neutValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 30.0 - 85.0)</label> : ""}*/}

                            </div>

                            <div class="col-md-4"> <br></br>

                                <label for="ID" className="form-label">LYMPH</label>
                                <input type="text" className="form-control" id="id" placeholder=""
                                    onChange={(e) => {
                                        setLYMPH(e.target.value);
                                    }} />
                                {error && LYMPH.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{lymphValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 10.0 - 50.0)</label> : ""}*/}
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">MONO</label>
                                <input type="text" className="form-control" id="name" placeholder=""
                                    onChange={(e) => {
                                        setMONO(e.target.value);
                                    }} />{error && MONO.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{monoValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range -10.0 - 15.0)</label> : ""}*/}

                            </div>



                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">EO</label>
                                <input type="text" className="form-control" id="id" placeholder=""
                                    onChange={(e) => {
                                        setEO(e.target.value);
                                    }} />{error && EO.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{eoValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range -5.0 - 15.0)</label> : ""}*/}

                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">BASO</label>
                                <input type="text" className="form-control" id="name" placeholder=""
                                    onChange={(e) => {
                                        setBASO(e.target.value);
                                    }} />{error && BASO.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{basoValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 10.0 - 50.0)</label> : ""}*/}

                            </div>

                        </div>
                        <div className="row">
                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">RBC</label>
                                <input type="text" className="form-control" id="id" placeholder=""
                                    onChange={(e) => {
                                        setRBC(e.target.value);
                                    }} />{error && RBC.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{rbcValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range -5.0 - 15.0)</label> : ""}*/}

                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="name" className="form-label">HGB</label>
                                <input type="text" className="form-control" id="name" placeholder=""
                                    onChange={(e) => {
                                        setHGB(e.target.value);
                                    }} />{error && HGB.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{hgbValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 0.0 - 25.0)</label> : ""}*/}

                            </div>

                            <div class="col-md-4"> <br></br>
                                <label for="ID" className="form-label">HCT</label>
                                <input type="text" className="form-control" id="id" placeholder=""
                                    onChange={(e) => {
                                        setHCT(e.target.value);
                                    }} />{error && HCT.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{hctValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 25.0 - 55.0)</label> : ""}*/}


                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-5"> <br></br>
                                <label for="name" className="form-label">MCV</label>
                                <input type="text" className="form-control" id="name" placeholder=""
                                    onChange={(e) => {
                                        setMCV(e.target.value);
                                    }} />{error && MCV.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}
                                {/*{mcvValid == true ?
                                <label style={{ color: "red" }}>*(Not in correct range 65.0 - 105.0)</label> : ""}*/}

                            </div>

                            <div class="col-md-5"> <br></br>
                                <label for="status" className="form-label">Comment</label>
                                <input type="text" className="form-control" id="name" placeholder="status"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }} />{error && status.length <= 0 ?
                                        <label style={{ color: "red" }}>*required</label> : ""}

                            </div>
                        </div><br></br><br></br>
                        <button type="submit" className="btn btn-primary submit btn-lg" style={{ background: "#26CDD1", color: "white" }}>Submit</button>
                        <button class="btn btn-outline-dark reset btn-lg" type="reset" value="Reset" >Reset</button>
                    </form>
                </div >
            </div>
            <br></br>

        </div >
    )
}

