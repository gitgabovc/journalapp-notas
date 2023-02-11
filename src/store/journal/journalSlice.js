import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved:"",
        notes:[],
        active: null,
        // active: {
        //     id:"ABS123",
        //     title:"",
        //     body:"",
        //     date:2134,
        //     imageUrls:[],
        // }
    },
    reducers: {
        isSaving: (state  ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state,  {payload}  ) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state,  {payload}  ) => {
            state.active = payload;
            state.messageSaved="";
        },
        setNotes: (state,  {payload}  ) => {
            state.notes = payload;
        },
        setSaving: (state  ) => {
            state.isSaving = true;
            state.messageSaved="";
        },
        updateNote: (state,  {payload}  ) => {
            state.isSaving = false;
            state.notes = state.notes.map(note=>{
                if(payload.id === note.id){
                    return payload;
                }
                return note;
            });
            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state,  action  ) => {
            state.active.imageUrls= [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;

        },
        clearNoteLogout: (state,  action  ) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = [];
            state.active= null;

        },
        deleteNoteById: (state,  {payload}  ) => {
            state.notes = state.notes.filter( note=> note.id !== payload );
            state.active=null;
            state.isSaving = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    isSaving,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNoteLogout
} = journalSlice.actions;