import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInwithGoogle = async()=>{
    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log( credentials)
        
        //const user = result.user;
        //console.log( user);

        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok:false,
            errorMessage,
        }        
    }
}

// crear usuario y password

export const registerUserWithEmailPassword= async({email, password, displayName})=>{

    try {
        console.log({email, password, displayName})
        //importar esta funcion de firebase
        //me pide 3 elementos el auth, email y password
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        //la funcion en general debemos llamarla en nuestros thunks.js

        //Todo: actualizar el displayName en firebase
        // 1.- para actualizar en firebase debemos importar uptadeProfile
        await updateProfile( FirebaseAuth.currentUser, { displayName} )
        return {
            ok:true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            errorMessage: error.message
        }
    }

}

export const loginWithEmailPassword = async({ email , password })=>{
    try {
        //console.log(email)
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        
        //const user = result.user;
        const {displayName, photoURL, uid} = result.user;
        //console.log(user);

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok:false,
            errorMessage,
        }        
    }
}

export const logoutFirebase = async() => {
    //cerrara la cuenta de cualquier lugar ya sea google, facebook, etc
    return await FirebaseAuth.signOut();

}