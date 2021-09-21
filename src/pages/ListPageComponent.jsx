import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { ActionCreators } from "../redux/notesReducer";


const ListPageComponent = () => {


    const notesList = useSelector(x => x.notesReducer)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => { 
        await axios.get("https://localhost:5001/api/Notes").then(result => { 
            dispatch(ActionCreators.setNotes(result.data));
        }).catch( e=> {
            console.log(e)
        }); 
    }, [])

    return( 
        <div className="row mt-5" >
            <div className="col-12">
                <Link className="btn btn-primary" to="/Add" style={{float: 'right', marginBottom: "12px"}}>Add User</Link> 
            </div>
            <div className="col-12">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notesList?.notes?.map((x) => <tr>
                                    <td>{x.id}</td>
                                    <td>{x.fullname}</td>
                                    <td>{x.age}</td>
                                    <td>{x.address}</td>
                                    <td>
                                        <Link className="btn btn-info btn-sm" style={{marginRight: "6px"}} to={`/Edit/${x.id}`}>Edit</Link> 
                                        <button className="btn btn-danger btn-sm" onClick={() => delete_onclick(x.id)}>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
    function delete_onclick(id){
        console.log(id)
        if(!window.confirm("Do you really want to delete?")){
            return;
        }

        axios.delete("https://localhost:5001/api/Notes/" + id).then(result => {
            alert("Success");
            dispatch(ActionCreators.DeleteNote(id)); 
        }).catch(e => {
            console.log(e)
        })
    }
}




export default ListPageComponent;