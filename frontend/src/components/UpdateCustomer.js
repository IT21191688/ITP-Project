import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import img from "../Images/green_eco_loop_leaf_check_mark.jpg"

export default function UpdateCustomer() {

    const { id } = useParams();
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [mail, setMail] = useState('')
    const [inquary, setInquary] = useState('')
    const [message, setMes] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8050/customer/get/${id}`).then((res) => {
            setName(res.data.name)
            setAge(res.data.age)
            setGender(res.data.gender)
            setMail(res.data.mail)
            setInquary(res.data.inquiry)
            setMes(res.data.message)
        }).catch((err) => {
            alert("Cannot get 1 data", err)
        })
    }, [id])

    function UpdateData(e) {

        e.preventDefault()
        const updateDatas = {
            name,
            age,
            gender,
            mail,
            inquiry: inquary,
            message,
        }
        axios.put(`http://localhost:8050/customer/update/${id}`, updateDatas).then(() => {
            alert("Update Succesfull")
        }).catch((err) => {
            alert(err, "cannot update data")
        })
    }




    return (

        <div className="container p-[30px] bg-gradient-to-r from-[rgb(28,114,235)] bg-#67e8f9">

            <button type="button" id="modelBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{ visibility: "hidden" }}></button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <img src={img} style={{ width: "100px" }} />Thank You For Your Response

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <center>
                <form>
                    <div className="form-group col-md-6 ">
                        <label for="name"><b>Customer Name</b></label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Your Name :" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6">
                        <label for="age"><b>Customer Age</b></label>
                        <input type="text" className="form-control" id="age" placeholder="Enter Your Age :" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6">
                        <label for="gender"><b>Gender</b></label>
                        <input type="text" className="form-control" id="gender" placeholder="Enter Your Gender :" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6">
                        <label for="mail"><b>E-Mail</b></label>
                        <input type="text" className="form-control" id="mail" placeholder="Enter Your E-mail Address :" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6">
                        <label for="inquiry"><b>Inquiry For</b> </label>
                        <input type="text" className="form-control" id="inquiry" placeholder="Enter Inquiry :" value={inquary} onChange={(e) => setInquary(e.target.value)} />
                    </div>

                    <div className="form-group col-md-6">
                        <label for="message"><b>Message</b> </label>
                        <input type="text" className="form-control" id="message" placeholder="Remark :" value={message} onChange={(e) => setMes(e.target.value)} />
                    </div>


                    <div style={{ textAlign: "center" }}>
                        <button type="submit" className="btn btn-primary bg-teal-950" onClick={UpdateData}>UPDATE</button>
                    </div>
                </form>
            </center>
        </div>
    )
}
