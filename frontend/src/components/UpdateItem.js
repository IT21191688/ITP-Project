import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import back3 from "../reportImages/back3.jpg";
import minus from "../reportImages/minus.png";
import plus from "../reportImages/plus.png";


export default function UpdateItem() {


    const { id } = useParams();
    //const [donations, setDonations] = useState([]);
    const [itemID, setitemID] = useState("");
    const [itemname, setitemname] = useState("");
    const [expiryDate, setexpiryDate] = useState("");
    const [quantity, setquantity] = useState("");
    const [labManager, setlabManager] = useState("");
    const [noOfitem, setnoOfitem] = useState(0);

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

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8050/labitemsinventory/getItem/" + id).then((res) => {
                console.log(res.data);
                setitemID(res.data.itemID)
                setitemname(res.data.itemname)
                setexpiryDate(res.data.expiryDate)
                setquantity(res.data.quantity)
                setlabManager(res.data.labManager)
                setnoOfitem(res.data.noOfitem)

            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])

    function handle(e) {

        e.preventDefault();//prevent normal behaviour sending data
        const UpdateItems = {
            itemID,
            itemname,
            expiryDate,
            quantity,
            labManager,
            noOfitem
        }
        console.log(UpdateItems)


        axios.put("http://localhost:8050/labitemsinventory/updateItem/" + id, UpdateItems).then(function () {
            alert("Inventory data Updated")
            window.location = "/item";
        }).catch((err) => {
            alert(err)
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
                opacity: '0.8'
            }}><br></br>
            <center><h2 style={{ color: '#4A75D3' }}>Sub Inventory part of Laboratory Items</h2></center>

            <div className="container">
                <form className="form1 row g-3" style={{
                    backgroundColor: '#f7f7f7',
                    color: '#0f0f0f',
                    fontWeight: '600%',
                    borderRadius: '10%',
                    maxWidth: '80%',
                    opacity: 0.8
                }} onSubmit={handle} >
                    <div class="col-md-5">
                        <label for="ID" className="form-label">Item ID</label>
                        <input type="text" className="form-control" id="id" placeholder="ITMxxx" value={itemID}
                            onChange={(e) => {
                                setitemID(e.target.value);
                            }} />
                    </div>

                    <div class="col-md-5">
                        <label for="name" className="form-label">Item Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Item Name" value={itemname}
                            onChange={(e) => {
                                setitemname(e.target.value);
                            }} />
                    </div>

                    <div class="col-md-5"> <br></br>
                        <label for="Expiry Date" className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" id="date" placeholder="" value={expiryDate}
                            onChange={(e) => {
                                setexpiryDate(e.target.value);
                            }} />
                    </div>

                    <div class="col-md-5"> <br></br>
                        <label for="processedDate" className="form-label">Price</label>
                        <input type="text" className="form-control" id="name" placeholder="price" value={quantity}
                            onChange={(e) => {
                                setquantity(e.target.value);
                            }} />
                    </div>

                    <div class="col-md-5"> <br></br>
                        <label for="LabManagerName" className="form-label">Lab Manager Name</label>
                        <input type="text" className="form-control" id="sampleType" placeholder="Lab Manager Name" value={labManager}
                            onChange={(e) => {
                                setlabManager(e.target.value);
                            }} />
                    </div>

                    <div class="col-md-5"> <br></br>
                        <label for="processedDate" className="form-label">No Of Items</label>

                        <div className="btn_div" value={noOfitem} onChange={(e) => {
                            setnoOfitem(e.target.value);
                        }}>
                            <td><h4>{noOfitem}&nbsp;&nbsp;</h4></td>
                            <td><img src={plus} onClick={incNum} style={{ width: '30px', height: 'auto' }} /></td>
                            <td><img src={minus} onClick={decNum} style={{ width: '30px', height: 'auto' }} /></td>
                        </div>


                    </div>
                    <br></br>


                    <button type="submit" className="btn submit" style={{ background: "#26CDD1", color: "white" }} >Submit</button>
                </form>
            </div ><br></br>

        </div >
    )
}