import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

export default function DeleteDoctor() {

    const { id } = useParams();
    //const log = useRef(true);
    const navigate = useNavigate();

    useEffect(function () {

        // if (log.current) {
        function getDoctor() {


            axios.delete("http://localhost:8050/doctor/delete/" + id).then(function (res) {
                //log.current = false;
                alert("Delete Successfull");
                navigate("/readDoctors")
                window.location.reload()

            }).catch(function (err) {
                alert("delete Fail");
                alert(err);
            });
            //log = false;


        }
        getDoctor();


        //  }

    }, []);



}