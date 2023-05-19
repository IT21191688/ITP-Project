import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";



export default function ReadTotal() {

    //class component waladi componentdidmount
    //session json with tocken
    const [readTotal, setreadTotal] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");
    const [filter, setFilter] = useState("");

    function pay(e) {
        e.preventDefault();
        navigate("/paymentportal");
    }


    const navigate = useNavigate();

    useEffect(function () {

        function getreadTotal() {
            axios.get("http://localhost:8050/upd/").then(function (res) {

                console.log(res.data);

                setreadTotal(res.data);
                //alert(res.data[0].oderID);


            }).catch(function (err) {
                alert("data not fech" + err);
            })


        }
        getreadTotal();



    }, [])

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filterOrder = readTotal.filter((rep) => {
        return rep.oderID.toLowerCase().includes(filter.toLowerCase());

    })





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

                    <br />
                    <div style={{ padding: "20px 50px", display: 'flex', justifyContent: 'end' }}>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                        <h6>Search by Order Number</h6>
                        <input type="text" className="search form-control" placeholder="Search by Order Number" onChange={handleFilterChange} style={{ margin: "0", width: '300px', margin: "auto" }} />
                    </div>
                    <br />
                    <br />


                    <table className="table table-striped table-hover" id="myTable" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">OrderID</th>
                                <th scope="col">Total</th>
                                <th scope="col">Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterOrder.map((readTotal) => (



                                <tr>
                                    <td style={{ color: "white" }}>{readTotal.oderID}</td>
                                    <td style={{ color: "white" }}>{new Intl.NumberFormat("en-LK", {
                                        style: "currency",
                                        currency: "LKR"
                                    }).format(readTotal.totalFee)}</td>





                                    <td><a href={'/paymentportal/pay/'}><button class="btn btn-sm text-white" onClick={{ pay }} style={{ background: "#2F4FAA", width: "100px" }}>Pay</button></a></td>

                                </tr>

                            ))}

                        </tbody>


                    </table>



                </div >


            </section>
        </div>
    )



}