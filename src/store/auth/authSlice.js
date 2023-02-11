import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login:(state, {payload})=>{
            state.status =  'authenticated'; //'checking', 'not-authenticated', 'authenticated'
            state.uid =  payload.uid;
            state.email =  payload.email;
            state.displayName =  payload.displayName;
            state.photoURL =  payload.photoURL;
            state.errorMessage =  null;
        },
        logout:(state, {payload})=>{
            state.status =  'not-authenticated'; //'checking', 'not-authenticated', 'authenticated'
            state.uid =  null;
            state.email =  null;
            state.displayName =  null;
            state.photoURL =  null;
            state.errorMessage =  payload?.errorMessage;
        },
        //Este nos servira cuando estemos en el proceso de authenticacion, es decir si preciono en el boton de login
        //este proceso empieza a ser asincrono pero tengo q poner a mi aplicacion en algun estado de loading y este me servira
        //para blokear botones, evitar doble submit de formulario, etc
        checkingCredentials: (state)=>{
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;