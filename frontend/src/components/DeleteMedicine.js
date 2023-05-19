import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteMedicine() {

    const { id } = useParams();
    const log = useRef(true);
    const navigate = useNavigate();


    useEffect(function () {

        if (log.current) {
            function DeleteMedicine() {


                axios.delete("http://localhost:8050/med/delete/" + id).then(function (res) {
                    //log.current = false;
                    alert("Delete Successfull");
                    navigate("/ReadMedicine")


                }).catch(function (err) {
                    alert("delete Fail");
                    alert(err);
                });
                //log = false;


            }
            DeleteMedicine();


        }

    }, []);



}