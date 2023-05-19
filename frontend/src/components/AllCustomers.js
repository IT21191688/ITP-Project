import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllCustomers() {
    const [Customers, setCustomers] = useState([]);

    useEffect(() => {
        function getCustomers() {
            axios.get("http://localhost:8050/Customer/").then((res) => {
                setCustomers(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getCustomers();
    }, [])


    return (
        <div className="container">
            <h1>Get In Touch </h1>
        </div>
    )
} 