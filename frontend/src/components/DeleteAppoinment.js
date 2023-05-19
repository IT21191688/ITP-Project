import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

export default function DeleteEmployee() {

    const { id } = useParams();
    const log = useRef(true);
    const navigate = useNavigate();

    useEffect(function () {

        if (log.current) {
            function getAppoinment() {


                axios.delete("http://localhost:8050/appoinment/deleteAppoinment/" + id).then(function (res) {
                    log.current = false;
                    alert("Delete Successfull");
                    navigate("/readAppoinment")
                    window.location.reload()

                }).catch(function (err) {
                    alert("delete Fail");
                    alert(err);
                });
                log = false;


            }
            getAppoinment();


        }

    }, []);



}