import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import back4 from "../reportImages/back4.jpg";
import logo from "../reportImages/logo.jpeg"

export default function AddReport() {

    const [ID, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [doctor, setDoctor] = useState("");
    const [processedDate, setProcessedDate] = useState("");
    const [sampleType, setSampleType] = useState("");
    const [TechnologistName, setTechnologistName] = useState("");
    const [status, setStatus] = useState("");
    const [filepath, setFilepath] = useState("");

    //validation
    const [error, setError] = useState(false);
    let [dateValid, setDatevalid] = useState(true);
    let [ageValid, setAgevalid] = useState(false);
    let [nicValid, setNICValid] = useState();


    function handleImage(e) {
        console.log(e.target.files);
        setFilepath(e.target.files[0])

    }

    var showdate = new Date();
    var displaytodaysdate = (showdate.getMonth() + 1) + '/' + showdate.getDate() + '/' + showdate.getFullYear()


    function sendData(e) {

        validateDate(processedDate)
        validateAge(age)
        nicValidation(ID)
        //alert(processedDate+dateValid)
        if (ID.length == 0) {
            setError(true)
        } else if (ID.length >= 13) {
            setError(true)
        }

        if (name.length == 0 || age.length == 0 || gender.length == 0 || doctor.length == 0) {
            setError(true)
        }
        if (processedDate.length == 0 || sampleType.length == 0 || TechnologistName.length == 0 || status.length == 0) {
            setError(true)
        }
        var allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png)$/i;
        if (filepath.length == 0) {
            setError(true)
        } else if (filepath != allowedExtensionsRegx) {
            setError(true)
        }
        {/*processedDate = moment(processedDate).utc().format('YYYY') &&  moment(processedDate).utc().format('MM')&&moment(processedDate).utc().format('DD')
    displaytodaysdate = moment(displaytodaysdate).utc().format('YYYY') &&  moment(displaytodaysdate).utc().format('MM')&&moment(displaytodaysdate).utc().format('DD')

   if(processedDate != displaytodaysdate){
      setError(true)
    }*/}

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
        /*const formValidation  = validateForm()
        if(formValidation === true){*/
        e.preventDefault();//prevent normal behaviour sending data
        //alert("Insert");
        const formData = new FormData();


        formData.append('ID', ID);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('doctor', doctor);
        formData.append('processedDate', processedDate);
        formData.append('sampleType', sampleType);
        formData.append('TechnologistName', TechnologistName);
        formData.append('status', status);
        formData.append('filepath', filepath);

        axios.post("http://localhost:8050/report/add", formData).then(function () {
            alert("data Inserted")
            window.location = "/labAllReports";
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
            <div>

                <div className="bg-1" style={{ height: "250px" }}>
                    <div className="container text-left">

                        <table class="table">
                            <thead>
                                <tr>

                                    <th scope="col"><img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" /></th>
                                    <th scope="col"><h1 style={{ color: "white" }}>Create X-Ray Reports</h1><br></br></th>

                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>


            </div>
            <div>
                {/*<center><img className="" src="reportImages/labImage.jpg"></img></center>*/}
            </div>

            <div>
                <div className="container">
                    {/*after click on submit button, called sendData function*/}
                    <form className="form row g-3" name="Addform" onSubmit={sendData} encType="multipart/form-data" method="post" >
                        <div class="col-md-6"><br></br><br></br>
                            <label for="ID" className="form-label">Patient ID</label>
                            <input type="text" className="form-control" id="id" name="id" placeholder="Patient ID"
                                onChange={(e) => {
                                    setId(e.target.value);//input eke value eka change karana warayak pasa, onchange eken value eka wenas karala setId ekata denawa, eka etapasse Id ekata ssighn kara gannawa
                                }} />

                            {error && ID.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}
                            {nicValid == false ?
                                <label style={{ color: "red" }}>*Not in srilankan format</label> : ""}

                        </div>

                        <div class="col-md-6"><br></br><br></br>
                            <label for="name" className="form-label" name="name">Patient Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />{error && name.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>

                        <div class="col-md-6"><br></br>&nbsp;&nbsp;&nbsp;
                            <label for="age" className="form-label" >Patient Age </label>
                            <input type="text" className="form-control" id="age" placeholder="Your age"
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }} />{error && age.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                            {ageValid == true ?
                                <label style={{ color: "red" }}>*Age must be positive value</label> : ""}

                        </div>

                        <div className="col-md-6"> <br></br>
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

                        <div class="col-6"> <br></br>
                            <label for="doctor" className="form-label">Doctor Name</label>
                            <input type="text" className="form-control" id="doctor" placeholder="Doctor name"
                                onChange={(e) => {
                                    setDoctor(e.target.value);
                                }} />{error && doctor.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                        </div>


                        <hr color={"yellow"} />
                        <div class="col-md-6"> <br></br>
                            <label for="sampleType" className="form-label">sample Type</label>
                            <input type="text" className="form-control" id="sampleType" placeholder="Sample Type"
                                onChange={(e) => {
                                    setSampleType(e.target.value);
                                }} />{error && sampleType.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                        </div>

                        <div class="col-md-6"> <br></br>
                            <label for="processedDate" className="form-label">processed Date</label>
                            <input type="date" className="form-control" id="date" placeholder="processed Date"
                                onChange={(e) => {
                                    setProcessedDate(e.target.value);
                                }} />
                            {error && processedDate.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}
                            {dateValid == false ?
                                <label style={{ color: "red" }}>*Not in correct format</label> : ""}


                            {/*{error&&processedDate != displaytodaysdate?
                <label style={{color:"red"}}>*Not matched Today date</label>:""}*/}

                        </div>

                        <div class="col-6"> <br></br>

                            <label for="TechnologistName" className="form-label">Technologist Name</label>
                            <input type="text" className="form-control" id="TechnologistName" placeholder="Technologist Name"
                                onChange={(e) => {
                                    setTechnologistName(e.target.value);
                                }} />{error && TechnologistName.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                        </div>
                        <div class="col-12"> <br></br>
                            <label for="status" className="form-label">Comment</label>
                            <input type="text" className="form-control" id="name" placeholder="status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }} />{error && status.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}
                        </div>



                        <div class="col-12"><br></br>
                            <label for="file" className="form-label">Your report</label>
                            <input type="file" name="filepath" accept=".png, .jpg, .jpeg" className="form-control" id="filepath" placeholder="Your report"
                                onChange={
                                    handleImage

                                } />{error && filepath.length <= 0 ?
                                    <label style={{ color: "red" }}>*required</label> : ""}

                        </div>
                        <center>
                            <button type="submit" className="btn  submit btn-lg" style={{ background: "#26CDD1", color: "white" }}>Submit</button></center>
                        {/*<button class="btn btn-outline-dark reset btn-lg" type="reset" value="Reset" >Reset</button>*/}
                    </form>
                </div >
            </div >
            <br></br>
        </div >
    )
}