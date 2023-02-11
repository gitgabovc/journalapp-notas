import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUploads } from "../../helpers/fileUploads";
import { loadeNotes } from "../../helpers/loadeNotes";
import { addNewEmptyNote, deleteNoteById, isSaving, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () =>{
    return async (  dispatch, getState  )=>{

        dispatch( isSaving() )

        const {uid} = getState().auth;
        //uid
        const newNote = {
            title:"",
            body:"",
            imageUrls: [],
            date: new Date().getTime(),
        }

        //! dipatch
        //dipatch( newNote )
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote );

        console.log( newDoc );
        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );

        dispatch( setActiveNote( newNote ))
        //dispatch( activarNote )
    }
}

export const  startLoagingNotes = () =>{
    return async ( dispatch, getState )=>{

        const {uid} = getState().auth;
        //console.log(uid);
        if(!uid) throw new Error("usuario no encontrado");
        
        const notes = await loadeNotes(uid);
        dispatch( setNotes( notes ) )
    }
}

export const  startSaveNote = () =>{
    return async ( dispatch, getState )=>{

        dispatch( setSaving() );
        
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        //el tercer parametro q se manda hace q si no hay esa propiedad las une el marge
        await setDoc( docRef, noteToFirestore, { marge: true } );

        dispatch(updateNote( note ));

        console.log(noteToFirestore);
    }
}

export const  startUploadFiles = (files=[]) =>{
    return async ( dispatch, getState )=>{

        dispatch( setSaving() );
        // console.log(files);

        // await fileUploads(files[0]);
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUploads( file ) );
        }

        const photoUrls = await Promise.all( fileUploadPromises );
        console.log(photoUrls)
        dispatch( setPhotosToActiveNote( photoUrls ) )
    }
}

export const  startDeletingNote = () =>{
    return async ( dispatch, getState )=>{

        dispatch( setSaving() );

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id))
    }
}