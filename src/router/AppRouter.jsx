import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { FirebaseAuth } from "../firebase/config"
import { JournalRouter } from "../journal/routes/JournalRouter"
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { login, logout } from "../store/auth/authSlice";
import { useCheckAuth } from "../hooks/useCheckAuth"


export const AppRouter = () => {

    // const {status} = useSelector(state=>state.auth);
    // const dispatch = useDispatch();

    // useEffect(() => {
    
    //     onAuthStateChanged( FirebaseAuth, async( user )=>{
    //         if( !user ) return dispatch( logout() );

    //         const {uid, email, displayName, photoURL} = user;
    //         dispatch( login( { uid, email, displayName, photoURL } ) )
    //     } )

    // }, [])
    
    const status = useCheckAuth();

    if(status === "checking"){
        return <CheckingAuth/>
    }

    return (
        <Routes>

            {
                (status === "authenticated")
                    ?<Route path="/*" element={<JournalRouter/>}/>
                    :<Route path="/auth/*" element={<AuthRouter/>}/>
            }


            <Route path="/*" element={<Navigate to="/auth/login"/>}/>

            {/* Para el login */}
            {/* <Route path="/auth/*" element={<AuthRouter/>}/> */}

            {/* Para la app */}
            {/* <Route path="/*" element={<JournalRouter/>}/> */}
        </Routes>
    )
}
