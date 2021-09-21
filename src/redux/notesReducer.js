const initialState = {
	notes: [],
}

export const ActionTypes = {
	SET_NOTES: 'SET_NOTES',
	DELETE_NOTE: 'DELETE_NOTE',
	NEW_NOTE: 'NEW_NOTE',
	EDIT_NOTE: 'EDIT_NOTE',
}

export const ActionCreators = {
	setNotes: payload => ({
		type: ActionTypes.SET_NOTES, payload
	}),
	DeleteNote: payload => ({
		type: ActionTypes.DELETE_NOTE, payload
	}),
	NewNote: payload => ({
		type: ActionTypes.NEW_NOTE, payload
	}),
	EditNote: payload => ({
		type: ActionTypes.EDIT_NOTE, payload
	}),
}

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_NOTES:
			return {
				...state, notes: [...action.payload]
			};
		case ActionTypes.DELETE_NOTE:
			for (let i = 0; i < state.notes.length; i++){
				if (state.notes[i].id === action.payload){
					state.notes.splice(i, 1);
					break;
				}
			}
			return { 
				...state, notes: [...state.notes]
			}
		case ActionTypes.NEW_NOTE:
			return{
				...state, notes: [...state.notes, action.payload]
			}
		case ActionTypes.EDIT_NOTE:
			for (let i = 0; i < state.notes.length; i++){
				if (state.notes[i].id === action.payload.id){
					state.notes[i].fullname = action.payload.fullname;
					state.notes[i].age = action.payload.age;
					state.notes[i].address = action.payload.address;
				}
			}
			return{
				...state, notes: [...state.notes]
			}
		default:
			return state;
	}
}