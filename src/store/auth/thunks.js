import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInwithGoogle } from "../../firebase/providers"
import { clearNoteLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password)=>{

    return async( dispatch )=>{
        dispatch( checkingCredentials() )
    }
}
export const startGoogleSingIn = ()=>{

    return async( dispatch )=>{
        dispatch( checkingCredentials() )

        const result = await signInwithGoogle();
        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        dispatch( login( result ) );
        
    }
}

//para hacer la solicitud
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) =>{
    return async( dispatch )=>{

        dispatch( checkingCredentials() );
        
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        
        if(!ok) return dispatch( logout({errorMessage}) );
        //console.log(resp);

        //si sale bien hacemos el login
        dispatch( login( {uid, displayName, email, photoURL} ) );
    }
}

export const startLoginWithEmailPassword = ({email, password}) =>{
    return async( dispatch )=>{

        dispatch( checkingCredentials() );
        
        const {ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password});
        
        if(!ok) return dispatch( logout({errorMessage}) );
        
        dispatch( login( {uid, displayName, email, photoURL} ) );
    }
}

export const startLogout = () =>{
    return async( dispatch )=>{

        await logoutFirebase();

        dispatch( clearNoteLogout() )

        dispatch( logout() );

    }
}