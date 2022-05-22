import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewLeaveEmployees() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllLeaveEmployees, setAllLeaveEmployees] = useState([]);





    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/leaveEmployee/")).data.data
                setAllLeaveEmployees(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    })


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        setfiltered(
            AllLeaveEmployees.filter(items => {
                return items.eName.toLowerCase().includes(search.toLowerCase())
            })
        )

    }, [search, AllLeaveEmployees])


   


    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem", marginTop: "100px" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>VIEW-LEAVE-EMPLOYEES</h3>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Reason Type</th>
                                <th scope="col">Leave Start Date</th>
                                <th scope="col">Leave End Date</th>
                                <th scope="col">Tele-phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((LeaveEmployee) => {
                                return <tr>
                                    <td>{LeaveEmployee.empID}</td>
                                    <td>{LeaveEmployee.eName}</td>                                 
                                    <td>{LeaveEmployee.position}</td>
                                    <td>{LeaveEmployee.reson} </td>
                                    <td> {LeaveEmployee.leaveStart} </td>
                                    <td>{LeaveEmployee.leaveEnd}</td>
                                    <td>{LeaveEmployee.telePhone}</td>
                                    <td><Link to={"/employeeManager/leave/view/" + LeaveEmployee._id} className="Update"> <i className="far fa-edit"></i> </Link></td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
