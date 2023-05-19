import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";



export default function ReadMedicine() {

    //class component waladi componentdidmount
    //session json with tocken
    const { id } = useParams();
    const [readMedicine, setreadMedicine] = useState([]);

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");

    const navigate = useNavigate();

    const [mName, setmName] = useState("");
    const [uPrice, setuPrice] = useState("");
    const [qty, setqty] = useState("");
    const [clickCount, setClickCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]); // State variable for selected items
    const [clickCounts, setClickCounts] = useState({});


    useEffect(function () {

        function getreadMedicine() {
            axios.get("http://localhost:8050/med/").then(function (res) {

                console.log(res.data);

                setreadMedicine(res.data);


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getreadMedicine();


    }, [])


    const [Error, setError] = useState("")

    function handleAddToOrder(med) {
        if (med.qty <= 0) {
            return;
        }

        else if (med.qty <= 5 && med.qty >= 1) {
            //setError("Stock Running Low!!!")
            alert("Stock Running Low!!!")
        }


        const updatedQty = med.qty - 1;
        const updateMedicine = {
            ...med,
            qty: updatedQty,
        };

        axios
            .put("http://localhost:8050/med/update/" + med._id, updateMedicine)
            .then(() => {
                setreadMedicine((prevMedicine) =>
                    prevMedicine.map((item) => {
                        if (item._id === med._id) {
                            return { ...item, qty: updatedQty };
                        }
                        return item;
                    })
                );

                setClickCounts((prevClickCounts) => ({
                    ...prevClickCounts,
                    [med._id]: (prevClickCounts[med._id] || 0) + 1,
                }));

                //alert("Updated");
            })
            .catch(() => {
                //alert("Not Updated");
            });

        setClickCount((prevCount) => prevCount + 1);
        setSelectedItems((prevItems) => [...prevItems, med]); // Add the selected item to the list

    }

    function handleIncrementQty(med) {
        if (med.qty <= 0) {
            return;
        }

        const updatedQty = ++med.qty; // Increment the existing value by 1

        axios
            .put("http://localhost:8050/med/update/" + med._id, { qty: updatedQty })
            .then(() => {
                setreadMedicine((prevMedicine) =>
                    prevMedicine.map((item) => {
                        if (item._id === med._id) {
                            return { ...item, qty: updatedQty };
                        }
                        return item;
                    })
                );

                setClickCounts((prevClickCounts) => ({
                    ...prevClickCounts,
                    [med._id]: (prevClickCounts[med._id] || 0) - 1,
                }));

            })
    }

    const totalValue = readMedicine.reduce((total, med) => total + med.uPrice * (clickCounts[med._id] || 0), 0)

    return (
        <div>

            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>

            <section style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',


            }}>

                <div style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>



                    <table className="table table-striped table-hover" id="myTable" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "200px" }}>Medicine Name</th>
                                <th scope="col" style={{ width: "200px" }}>Unit Price</th>
                                <th scope="col" style={{ width: "200px" }}>Quantity</th>
                                <th scope="col" style={{ width: "200px" }}>Add to Order</th>
                                <th scope="col" style={{ width: "200px" }}>Selected Items to Order</th>
                                <th scope="col" style={{ width: "200px" }}>Cost</th>


                                <th scope="col" className="pr-3">Update</th>
                                <th scope="col" className="pr-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readMedicine.map((med) => (
                                <tr key={med._id}>
                                    <td style={{ color: "white" }}>{med.mName}</td>

                                    <td style={{ color: "white" }}>
                                        {new Intl.NumberFormat("en-LK", {
                                            style: "currency",
                                            currency: "LKR"
                                        }).format(med.uPrice)}
                                    </td>

                                    <td style={{ color: "white" }}>{med.qty} <br />
                                    </td>

                                    <td style={{ color: "white" }}>
                                        <button
                                            className="btn btn-sm text-white"
                                            style={{ background: "#26CDD1", width: "100px" }}
                                            disabled={med.qty <= 0}
                                            onClick={() => handleAddToOrder(med)}
                                        >
                                            {med.qty <= 0 ? "Out of stock" : "Add to Order"}
                                        </button>
                                    </td>

                                    <td style={{ color: "white" }}>{clickCounts[med._id] || 0}
                                        <button
                                            className="btn btn-sm text-white"
                                            style={{ background: "#fa5072", width: "70px", marginLeft: "7px" }}
                                            disabled={(clickCounts[med._id] || 0) <= 0}
                                            onClick={() => handleIncrementQty(med)}

                                        >Remove</button>

                                    </td>

                                    <td style={{ color: "white" }}>{med.uPrice * clickCounts[med._id] || 0} </td>



                                    <td className="tableTd"><a href={'/updateMedicine/' + med._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                    <td className="tableTd"><a href={'/deleteMedicine/' + med._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>

                                </tr>

                            ))}

                        </tbody>


                    </table>






                </div >

                <div style={{
                    backgroundColor: "White",
                    textAlign: "center",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    width: "300px",
                    marginRight: "auto",
                    marginLeft: "auto",
                    marginTop: "20px",
                    border: "2px",
                    borderColor: "black"
                }}>

                    <h5>Total</h5>
                    <br />
                    <h4 style={{ color: "#04cc39" }}>{totalValue.toLocaleString("en-LK", {
                        style: "currency",
                        currency: "LKR",
                    })}</h4>

                    <Link
                        to={{
                            pathname: "/addTotalFee",
                            search: `?totalValue=${totalValue}`,
                        }}
                    >
                        <button className="btn btn-danger   mr-5" style={{ backgroundColor: "#0297BF", border: "none", marginTop: "10px", textAlign: "center", paddingRight: "20px", marginLeft: "50px" }}>Send Total</button>
                    </Link>

                </div>


                <br />


                <div class="row d-flex justify-content-center">
                    <button type="submit" class="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={() => window.location.href = "/addNewMedicine"} style={{ marginLeft: "50px" }}>Add New Medicine</button>
                </div>




            </section>

        </div>

    )


}