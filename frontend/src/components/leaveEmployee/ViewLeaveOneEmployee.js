import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewLeaveOneEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [materialStatus, setmaterialStatus] = useState("");
    const [eName, seteName] = useState("");
    const [empID, setempID] = useState("");
    const [position, setPosition] = useState("");
    const [reson, setReson] = useState("");
    const [leaveStart, setLeaveStart] = useState("");
    const [leaveEnd, setLeaveEnd] = useState("");
    const [telePhone, setTelePhone] = useState("");


    const { id } = useParams();
    

    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/leaveEmployee/${id}`)).data.data
                seteName(result[0].eName);
                setempID(result[0].empID)
                setLeaveStart(result[0].leaveStart);
                setPosition(result[0].position)
                setReson(result[0].reson);
                setLeaveEnd(result[0].leaveEnd)
                setTelePhone(result[0].telePhone);
                
                setLoaderStatus(true)
                setTableStatus(false)
                
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newDetails = {
                eName, empID, position, reson, leaveStart, leaveEnd,telePhone
            }
            console.log(newDetails);
            const data = await (await axios.put(`http://localhost:5000/leaveEmployee/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details Updated successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Something went wrong.. plz try again later",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }
        } catch (err) {

        }

    }

    function edit(e) {
        e.preventDefault();
        setTextState(false)
        setBtnGroupstate1(false)
        setBtnGroupstate2(true)
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true)
        setBtnGroupstate1(true)
        setBtnGroupstate2(false)
    }


    //This function is used to delete specific user
    function deleteUser(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/leaveEmployee/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/employeeManager/leave/view"
                            },

                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Oops!",
                        body: "Something went wrong",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },

                    });
                }
            },
            onCancel: function () {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "You canceled delete request",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },

                });
            },

        })
    }
    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3>UPDATE-LEAVE-EMPLOYEE-DETAILS</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip01" class="form-label">Employee Name</label>
                        <input type="text" class="form-control" id="validationTooltip01" required defaultValue={eName}
                            onChange={(e) => { seteName(e.target.value) }} />
                    </div>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip02" class="form-label">Employee Id</label>
                        <input type="text" class="form-control" id="validationTooltip02" required defaultValue={empID}
                            onChange={(e) => { setempID(e.target.value) }} />
                    </div>
                    <div class="col-md-3 position-relative">
                        <label for="validationTooltip01" class="form-label">Position</label>
                        <input type="text" class="form-control" id="validationTooltip01" required defaultValue={position}
                            onChange={(e) => { setPosition(e.target.value) }} />
                    </div>

                    <br />
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip03" class="form-label">Reason</label>
                        <input type="text" class="form-control" id="validationTooltip03" required defaultValue={reson}
                            onChange={(e) => { setReson(e.target.value) }} />
                    </div>

                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip03" class="form-label">Leave Started Day</label>
                        <input type="date" class="form-control" id="validationTooltip03" required defaultValue={leaveStart}
                            onChange={(e) => { setLeaveStart(e.target.value) }} />
                    </div>
                    <div class="col-md-3 position-relative">
                        <label for="validationTooltip03" class="form-label">Leave Ended Day</label>
                        <input type="date" class="form-control" id="validationTooltip03" required defaultValue={leaveEnd}
                            onChange={(e) => { setLeaveEnd(e.target.value) }} />
                    </div>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip02" class="form-label">TelePhone</label>
                        <input type="number" class="form-control" id="validationTooltip02" required defaultValue={telePhone}
                            onChange={(e) => { setTelePhone(e.target.value) }} />
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                        <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteUser(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
                
            </form>
            </div>

        </div>
    )
}
