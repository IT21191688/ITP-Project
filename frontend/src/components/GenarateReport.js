import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchReports() {
    const [ID, setId] = useState("");
    const navigate = useNavigate();

    return (
        <div>

            <div>

                <div className="bg-1">
                    <div className="container text-center">
                        <h3>MEDIXO E-HEALTH</h3>
                        <img src="reportImages/logo.jpeg" className="rounded-circle" alt="Bird" width="300" height="300" />
                        <h3>Search your Own lab reports</h3><br></br>
                    </div>
                </div>


            </div>
            <form>
                <div className="form1 row">
                    <label htmlFor="patientID">
                        <h5>
                            <b>Patient ID</b>
                        </h5>
                    </label>
                    <input
                        type="text"
                        id="patientID"
                        className="form-control"
                        placeholder="NIC"
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button
                        className="GetLabReports"
                        type="button"
                        onClick={() => navigate("/getSearch/" + ID)}
                    >
                        Get Lab Reports
                    </button>
                </div>
            </form>

        </div>
    );
}