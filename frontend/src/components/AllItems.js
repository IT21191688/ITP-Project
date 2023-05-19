import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import inventoryBack from "../reportImages/backg.jpg"
import plus from "../reportImages/plus.png";
import minus from "../reportImages/minus.png";
import logo from "../reportImages/logo.jpeg"

export default function AllItems() {

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");
    const [itm, setItm] = useState({ noOfitem: 0 });
    const [totalPrice, setCalTotPrice] = useState("")
    const [noOfitem, setnoOfitem] = useState("")
    const [selectedItems, setSelectedItems] = useState([]); // State variable for selected items
    const [clickCounts, setClickCounts] = useState({});
    const [clickCount, setClickCount] = useState(0);
    const [readMedicine, setreadItem] = useState([]);


    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8050/labitemsinventory/item").then((res) => {
                console.log(res.data);
                setItems(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])

    function handleAddItems(item) {



        const updatedQty = item.noOfitem + 1;
        const updateItem = {
            ...item,
            noOfitem: updatedQty,
        };

        axios
            .put("http://localhost:8050/labitemsinventory/updateItem/" + item._id, updateItem)
            .then(() => {
                setreadItem((prevMedicine) =>
                    prevMedicine.map((item) => {
                        if (item._id === item._id) {
                            return { ...item, noOfitem: updatedQty };
                        }
                        return item;
                    })
                );

                setClickCounts((prevClickCounts) => ({
                    ...prevClickCounts,
                    [item._id]: (prevClickCounts[item._id] || 0) + 1,
                }));

                //alert("Updated");
            })
            .catch(() => {
                //alert("Not Updated");
            });

        setClickCount((prevCount) => prevCount + 1);
        setSelectedItems((prevItems) => [...prevItems, item]); // Add the selected item to the list

    }

    function handleRemoveItems(item) {
        if (item.noOfitem <= 1) {
            alert("Sorry,Zero limit Reach")
        }


        const updatedQty = item.noOfitem - 1;
        const updateItem = {
            ...item,
            noOfitem: updatedQty,
        };

        axios
            .put("http://localhost:8050/labitemsinventory/updateItem/" + item._id, updateItem)
            .then(() => {
                setreadItem((prevMedicine) =>
                    prevMedicine.map((item) => {
                        if (item._id === item._id) {
                            return { ...item, noOfitem: updatedQty };
                        }
                        return item;
                    })
                );

                setClickCounts((prevClickCounts) => ({
                    ...prevClickCounts,
                    [item._id]: (prevClickCounts[item._id] || 0) + 1,
                }));

                //alert("Updated");
            })
            .catch(() => {
                //alert("Not Updated");
            });

        setClickCount((prevCount) => prevCount + 1);
        setSelectedItems((prevItems) => [...prevItems, item]); // Add the selected item to the list

    }

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    /*const filteredItems = items.filter((rep) => {
        return rep.itemname.toLowerCase().includes(filter.toLowerCase());

    })*/

    function checkDate(todayDate, expDate) {
        var result;
        var ytd = moment(todayDate).utc().format('YYYY')
        var mtd = moment(todayDate).utc().format('MM')
        var dtd = moment(todayDate).utc().format('DD')

        var yed = moment(expDate).utc().format('YYYY')
        var med = moment(expDate).utc().format('MM')
        var ded = moment(expDate).utc().format('DD')


        if (ytd >= yed & mtd >= med & dtd >= ded) {
            result = "Expired"
            return result
        }
        else {
            result = "Not Expired"
            return result
        }
    }



    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    var dt = showdate.toDateString();

    function checkNoOfItems(noOfitem) {
        var noOfitem;
        var message;
        if (noOfitem == 0) {
            message = "Out of stock"
            return message
        }
        else if (noOfitem <= 5) {
            message = "Running low"
            return message
        }
        else {
            message = "Enough Items"
            return message
        }
    }

    //Generate PDF
    function generatePDF() {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Item Details";
        const headers = [
            ["Item ID", "Item Name", "Expiry Date", "Quantity", "lab Manager", "No Of Item"],
        ];

        const data = items.map((rep) => [
            rep.itemID,
            rep.itemname,
            rep.expiryDate,
            rep.quantity,
            rep.labManager,
            rep.noOfitem,
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("ItemReport.pdf");
        toast("Item Report Downloaded");
    };




    return (

        <div
        >
            <div className="bg-1" style={{ height: "250px" }}>
                <div className="container text-left">

                    <table class="table">
                        <thead>
                            <tr>

                                <th scope="col"><img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" /></th>
                                <th scope="col"><h1 style={{ color: "white" }}>All details of Laboratory Items</h1><br></br></th>

                            </tr>
                        </thead>
                    </table>
                </div>
            </div>


            <div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Total Price</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <b>{totalPrice}</b>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/*<div>
                
                <input type="text" className="search" placeholder="Search by Item name" onChange={handleFilterChange} />
        </div>*/}
            <button type="submit" class="btn-update btn btn-primary" style={{ background: 'linear-gradient(#F7971E,#FFD200)', width: '180px' }}
                onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
            <ToastContainer></ToastContainer> <br></br>

            <div>
                <table className="table-in">
                    <thead>
                        <tr>
                            <th className="th-in">Item ID</th>
                            <th className="th-in">Item Name</th>
                            <th className="th-in">Today Date - Expiry Date</th>
                            <th className="th-in">Lab Manager Name</th>
                            <th className="th-in">Price</th>
                            <th className="th-in">No Of Item</th>
                            <th className="th-in">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((itm) => (

                            <tr className="tr-in" key={itm._id}>

                                <td className="td-in">{itm.itemID}</td>
                                <td className="td-in">{itm.itemname}</td>
                                <td className="td-in">
                                    <span>{displaytodaysdate} - </span>
                                    <span>{itm.expiryDate} </span><br></br>
                                    <>
                                        {checkDate(displaytodaysdate, itm.expiryDate) == "Expired" ? (
                                            <b className="text-danger">{checkDate(displaytodaysdate, itm.expiryDate)}</b>
                                        ) : (
                                            <b>{checkDate(displaytodaysdate, itm.expiryDate)}</b>
                                        )}

                                    </>
                                </td>
                                <td className="td-in">{itm.labManager}</td>
                                <td className="td-in">{itm.quantity}</td>

                                <td className="td-in">

                                    <img onClick={() => {
                                        handleAddItems(itm);
                                        window.location.reload();
                                    }} src={plus} style={{ width: '25px', height: 'auto' }}></img>
                                    {itm.noOfitem}
                                    <img onClick={() => {
                                        handleRemoveItems(itm);
                                        window.location.reload(false);
                                    }} src={minus} style={{ width: '25px', height: 'auto' }}></img>&nbsp;&nbsp; {/*<span>{itm.noOfitem}</span><br></br>*/}
                                    <span><>
                                        {checkNoOfItems(itm.noOfitem) == "Out of stock" ? (
                                            <b className="text-danger">{checkNoOfItems(itm.noOfitem)}</b>

                                        ) : checkNoOfItems(itm.noOfitem) == "Running low" ? (
                                            <b className="" style={{ color: "#2F4FAA" }}>{checkNoOfItems(itm.noOfitem)}</b>
                                        ) :
                                            (
                                                <b>{checkNoOfItems(itm.noOfitem)}</b>
                                            )

                                        }
                                    </></span>

                                </td>
                                <td>{itm.quantity * itm.noOfitem}</td>

                                <td className="td-in"><a href={"/updateItem/" + itm._id}><button className="update1 btn-sm">Update</button></a></td>
                                <td className="td-in"><a href={"/deleteItem/" + itm._id}><button className="delete1 btn-sm">Delete</button></a></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div><br></br>

        </div>

    )

}