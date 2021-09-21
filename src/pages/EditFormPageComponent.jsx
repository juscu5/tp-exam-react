import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link , useParams} from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const EditFormPageComponent = () =>{


    const [formState, setFormState] = useState({
        fullname : "",
        age: 0,
        address : ""
    });
    const history = useHistory()
    const {nid} = useParams();
    const notesFind = useSelector(x => x.notesReducer)?.notes?.find(z => z.id == nid)
    useEffect(() => { 
        setFormState({
            fullname : notesFind?.fullname,
            age: notesFind?.age,
            address : notesFind?.address
        })
    }, [])

    return(
        <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                <div className="card mt-5" style={{marginBottom : "12px"}}>
                    <div className="card-header">
                        <h3>New Form</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="">Fullname</label>
                            <input type="text"  className="form-control" value={formState.fullname} onChange={(e) => {
                                setFormState({...formState, fullname : e.target.value})
                            }}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Age</label>
                            <input type="number"  className="form-control"  value={formState.age} onChange={(e) => {
                                setFormState({...formState, age : e.target.value})
                            }}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input type="text"  className="form-control" value={formState.address} onChange={(e) => {
                                setFormState({...formState, address : e.target.value})
                            }}/> 
                        </div>
                        <button className="btn btn-primary" style={{width : "100%"}} onClick={() => save_onclick(notesFind?.id)}>Save</button>
                        <Link className="btn btn-dark-outline" to="/list" style={{width : "100%"}}>Cancel</Link>
                    </div>
                    <div className="card-footer">

                    </div>
                </div>
            </div> 
        </div>
    )

    function save_onclick(id){
        console.log(id)
        if(!window.confirm("Do you really want to save?")){
            return;
        }
        let obj = {
            id : id,
            fullname : formState.fullname,
            age : formState.age,
            address : formState.address
        }

        axios.put("https://localhost:5001/api/Notes", obj).then(result => {
            alert("Success");
            history.push("/list") 
        }).catch(e => {
            console.log(e)
        })
    }

}




export default EditFormPageComponent;