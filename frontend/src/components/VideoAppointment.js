import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import img from "../Images/5183184.jpg"
import img2 from "../Images/back.jpg"

export default function VideoAppointment() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [mail, setMail] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    function sendData(e) {
        e.preventDefault();

        const valid = validateForm();

        if (valid) {
            const newCustomer = {
                name,
                phone,
                specialist,
                mail,
                date,
            };

            axios
                .post('http://localhost:8050/vconsult/vidappointment', newCustomer)
                .then(() => {
                    alert('Customer added');
                    navigate("/");

                })
                .catch((err) => {
                    alert(err);
                });
        }
    }



    // Validation fields
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [specialistError, setSpecialistError] = useState('');
    const [mailError, setMailError] = useState('');

    function validateForm() {
        if (name.trim() === '') {
            setNameError('Name must be filled out');
            return false;
        } else {
            setNameError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Phone number must be filled out');
            return false;
        } else {
            setPhoneError('');
        }

        if (specialist.trim() === '') {
            setSpecialistError('Specialist must be filled out');
            return false;
        } else {
            setSpecialistError('');
        }

        if (mail.trim() === '') {
            setMailError('Email must be filled out');
            return false;
        } else if (!isEmailValid(mail)) {
            setMailError('Please enter a valid email');
            return false;
        } else {
            setMailError('');
        }

        return true;
    }

    return (

        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Your Inquiry Has Been Received
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" style={{ background: 'red', hover: 'bg-red-500' }} data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div > 
                
                <div className="tw-container tw-p-[30px] tw-bg-gradient-to-r tw-from-[rgb(7,88,227)] "> 
                <h1 class="custom-header">Make An Appointment</h1>

                    <button
                        type="button"
                        id="modelBtn"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        style={{ visibility: 'hidden' }}
                    ></button>



                    <center>
                        <form name="customer_form">

                            
                            
                            <div className="form-group col-md-6 ">
                                <label htmlFor="name">
                                    <b>Customer Name</b>
                                </label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Your Name :" onChange={(e) => setName(e.target.value)} />
                                {nameError && <span className="error" style={{ color: 'red' }}>{nameError}</span>}
                            </div>
                            <div className="form-group col-md-6 ">
                                <label htmlFor="phone">
                                    <b>Phone Number</b>
                                </label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter Your Phone No :" onChange={(e) => setPhone(e.target.value)} />
                                {phoneError && <span className="error" style={{ color: 'red' }}>{phoneError}</span>}
                            </div>

                            <div className="form-group col-md-6 ">
                                <label htmlFor="specialist">
                                    <b>Specialist</b>
                                </label>
                                <input type="text" className="form-control" id="specialist" placeholder="Specialist :" onChange={(e) => setSpecialist(e.target.value)} />
                                {specialistError && <span className="error" style={{ color: 'red' }}>{specialistError}</span>}
                            </div>

                            <div className="form-group col-md-6 ">
                                <label htmlFor="mail">
                                    <b>E-Mail</b>
                                </label>
                                <input type="text" className="form-control" id="mail" placeholder="Enter Your E-mail Address :" onChange={(e) => setMail(e.target.value)} />
                                {mailError && <span className="error" style={{ color: 'red' }}>{mailError}</span>}
                            </div>

                            <div className="form-group col-md-6 ">
                                <label htmlFor="date">
                                    <b>Date</b>{' '}
                                </label>
                                <input type="text" className="form-control" id="date" placeholder="Enter Date :" onChange={(e) => setDate(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary bg-amber-950" onClick={sendData}>
                                APPOINTMENT
                            </button>
                        
                        </form>
                    </center>
                </div>
            </div>
        </>
    );
}
