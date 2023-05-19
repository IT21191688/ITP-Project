import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import back3 from "../reportImages/back3.jpg";
import logo from "../reportImages/logo.jpeg"

export default function AddBloodReport() {

    const [itemID, setitemID] = useState("");
    const [itemname, setitemname] = useState("");
    const [expiryDate, setexpiryDate] = useState("");
    const [quantity, setquantity] = useState("");
    const [labManager, setlabManager] = useState("");
    const [noOfitem, setnoOfitem] = useState(0);
    const [error, setError] = useState(false);
    let [dateValid, setDatevalid] = useState(true);
    //const [num, setNum] = useState(0);


    let [itmIdValid, setItmIdvalid] = useState();

    const incNum = () => {
        setnoOfitem(noOfitem + 1);
    };

    const decNum = () => {
        if (noOfitem > 0) {
            setnoOfitem(noOfitem - 1);
        } else {
            alert('Sorry,Zero limit Reach')
            setnoOfitem(0);
        };
    }




    function sendData(e) {

        itmNoValidation(itemID)

        function itmNoValidation(itemID) {
            var itmVal = /^([I][T][M][0-9]{3})$/;
            if (!itmVal.test(itemID)) {
                setItmIdvalid(true)

            } else {
                setItmIdvalid(false)
            }

        }

        if (itemID.length == 0) {
            setError(true)
        } else if (itemID.length >= 5) {
            setError(true)
        }
        if (itemname.length == 0 || expiryDate.length == 0 || quantity.length == 0 || labManager.length == 0 || noOfitem.length == 0) {
            setError(true)
        }
        e.preventDefault();

        const newBloodReport = {
            itemID,
            itemname,
            expiryDate,
            quantity,
            labManager,
            noOfitem

        }

        if (itemID.length == 0 || itemname.length == 0 || expiryDate.length == 0 || labManager.length == 0 || noOfitem.length == 0) {
            setError(true)
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
            return false;
        }

        axios.post("http://localhost:8050/labitemsinventory/addItem ", newBloodReport).then(function () {
            alert("data Inserted")
            window.location = "/item";
        }).catch((err) => {
            alert(err)
            //window.location = "/item";
        })

    }

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
                //opacity: '0.8'
            }}>
            <div className="bg-1" style={{ height: "250px" }}>
                <div className="container text-left">

                    <table class="table">
                        <thead>
                            <tr>

                                <th scope="col"><img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" /></th>
                                <th scope="col"><h1 style={{ color: "white" }}>Sub Inventory part of Laboratory Items</h1><br></br></th>

                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

            {/*<center><h2 style={{color:'#4A75D3'}}>Sub Inventory part of Laboratory Items</h2></center>*/}

            <div className="container">
                <form className="form1 row g-3" style={{
                    backgroundColor: '#f7f7f7',
                    color: '#0f0f0f',
                    fontWeight: '600%',
                    borderRadius: '10%',
                    maxWidth: '80%',
                    opacity: 0.8
                }} onSubmit={sendData} >
                    <div class="col-md-6">
                        <label for="ID" className="form-label">Item ID</label>
                        <input type="text" className="form-control" id="id" placeholder="ITMxxx"
                            onChange={(e) => {
                                setitemID(e.target.value);
                            }} />{error && itemID.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}
                        {itmIdValid == true ?
                            <label style={{ color: "red" }}>*Not in correct format</label> : ""}
                    </div>

                    <div class="col-md-6">
                        <label for="name" className="form-label">Item Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Item Name"
                            onChange={(e) => {
                                setitemname(e.target.value);
                            }} />{error && itemname.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}

                    </div>

                    <div class="col-md-6"> <br></br>
                        <label for="Expiry Date" className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" id="sampleType" placeholder=""
                            onChange={(e) => {
                                setexpiryDate(e.target.value);
                            }} />{dateValid == false ?
                                <label style={{ color: "red" }}>*Not matched Today date</label> : ""}
                        {error && expiryDate.length <= 0 ?
                            <label style={{ color: "red" }}>*required</label> : ""}


                    </div>

                    <div class="col-md-6"> <br></br>
                        <label for="processedDate" className="form-label">Price</label>
                        <input type="text" className="form-control" id="name" placeholder="price"
                            onChange={(e) => {
                                setquantity(e.target.value);
                            }} />{error && quantity.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}

                    </div>

                    <div class="col-md-6"> <br></br>
                        <label for="LabManagerName" className="form-label">Lab Manager Name</label>
                        <input type="text" className="form-control" id="sampleType" placeholder="Lab Manager Name"
                            onChange={(e) => {
                                setlabManager(e.target.value);
                            }} />{error && labManager.length <= 0 ?
                                <label style={{ color: "red" }}>*required</label> : ""}

                    </div>

                    <div class="col-md-6"> <br></br>
                        <label for="processedDate" className="form-label">No Of Items</label>
                        <div className="btn_div" onChange={(e) => {
                            setnoOfitem(e.target.value);
                        }}>
                            <td><h4>{noOfitem}&nbsp;&nbsp;</h4></td>
                            <td><img src="reportImages/plus.png" onClick={incNum} style={{ width: '30px', height: 'auto' }} /></td>
                            <td><img src="reportImages/minus.png" onClick={decNum} style={{ width: '30px', height: 'auto' }} /></td>
                        </div>{error && noOfitem.length <= 0 ?
                            <label style={{ color: "red" }}>*required</label> : ""}
                    </div>
                    <button type="submit" className="btn btn-primary submit btn-lg" style={{ background: "#26CDD1", color: "white" }}>Submit</button>
                </form>
            </div ><br></br>

        </div >
    )
}
