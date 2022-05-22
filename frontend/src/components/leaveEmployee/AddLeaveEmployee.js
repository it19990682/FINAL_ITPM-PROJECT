import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'


export default function AddLeaveEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [eName, seteName] = useState("");
    const [empID, setempID] = useState("");
    const [position, setPosition] = useState("");
    const [reson, setReson] = useState("");
    const [leaveStart, setLeaveStart] = useState("");
    const [leaveEnd, setLeaveEnd] = useState("");
    const [telePhone, setTelePhone] = useState("");

    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!eName || !position || !reson || !leaveStart || !leaveEnd || !telePhone  || !empID) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                const newLeaveDetails = {
                    eName, empID, position, reson, leaveStart, leaveEnd,telePhone
                }
                const data = await (await axios.post("http://localhost:5000/leaveEmployee/", newLeaveDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Data added successfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },
                    });
                }else{
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Data added Unsuccessfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="content">
            <h3>ADD-LEAVE-EMPLOYEE-DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">Employee Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { seteName(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">Employee Id</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setempID(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip01" class="form-label">Position</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setPosition(e.target.value) }} />
                </div>

                <br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Reason</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setReson(e.target.value) }} />
                </div>

                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">Leave Started Day</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setLeaveStart(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">Leave Ended Day</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setLeaveEnd(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">TelePhone</label>
                    <input type="number" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setTelePhone(e.target.value) }} />
                </div>
                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i>Reset</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Add'}</button>
                </div>
                
            </form>

        </div>
    )
}



