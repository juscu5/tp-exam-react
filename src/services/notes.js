import { ActionCreators } from "../redux/notesReducer";
import axios from "axios";

const axiosInstance = axios.create({
        baseURL: 'https://localhost:5001/api/Notes', 
})


export const GetNotes = async (dispatch) => {
    try {
        //api call
        await axiosInstance.get().then(result => {
            console.log(result.data);
            dispatch(ActionCreators.setNotes(result.data));
        }).catch( e=> {
            console.log(e)
        })

    }
    catch {
        console.log('Error!');
    }
}

export const DeleteNote = async (dispatch, note) => {
    try {
        //api call
        await axiosInstance.delete(`/${note.id}`);
        dispatch(ActionCreators.DeleteNote(note));
    }
    catch {
        console.log('Error!');
    }
}

export const NewNote = async (dispatch, note) => {
    try {
        //api call
        const { data } = await axiosInstance.post('', note);
        dispatch(ActionCreators.NewNote(data));
    }
    catch {
        console.log('Error!');
    }
}

export const EditNote = async (dispatch, note) => {
    try {
        //api call
        await axiosInstance.put('', note);
        dispatch(ActionCreators.EditNote(note));
    }
    catch {
        console.log('Error!');
    }
}