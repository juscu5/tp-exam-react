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
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                <div className="card"><br />
                    <div className="card-body">
                        <h2 style={{marginBottom:"16px"}}>Notes Author CRUD</h2>
                        <br />
                        <Link to="/list" className="btn btn-outline-primary">Proceed to List</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default ListPageComponent;