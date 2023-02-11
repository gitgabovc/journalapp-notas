import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    displayName:'',
    email: '',
    password: '',
}

const formValidations = {
    email: [(value)=> value.includes('@'), 'El correo debe tener una @'],
    password: [(value)=> value.length>=6, 'El password debe tener mas de 6 letras'],
    displayName: [(value)=> value.length>=1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( state=> state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

    const {
            formState,   isFormValid,
            displayName, displayNameValid,
            email,       emailValid,
            password,    passwordValid,
            onInputChange 
        } = useForm(formData, formValidations);


    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if(!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState))
    }

  return (
            <AuthLayout title="Crear Cuenta">
                {/* <h1>FormValid {isFormValid?"valido":"incorrecto"}</h1> */}

                <form onSubmit={onSubmit}>
                    <Grid
                        container
                        className="animate__animated animate__fadeIn animate__faster"
                        >
                        <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Nombre"
                            type="text"
                            placeholder="Escribe tu nombre"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt:2}}>
                            <TextField
                                label="Email"
                                type="email"
                                placeholder="Escribe tu correo"
                                fullWidth
                                name="email"
                                value={email}
                                onChange={onInputChange}
                                error={!!emailValid && formSubmitted}
                                helperText={emailValid}
                                />
                        </Grid>
                        <Grid item xs={12} sx={{mt:2}}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                placeholder="Escribe tu contraseña"
                                fullWidth
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                error={!!passwordValid && formSubmitted}
                                helperText={passwordValid}
                                />
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            sx={{mb:2, mt:2}}
                            >
                            <Grid item xs={12}
                                display={ !!errorMessage ? "": "none" }
                                >
                                <Alert severity="error">{ errorMessage }</Alert>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    disabled={ isCheckingAuthentication }
                                    type='submit'
                                    variant="contained" fullWidth>
                                    Crear Cuenta
                                </Button>
                            </Grid>

                        </Grid>
                        <Grid 
                            container 
                            direction="row" 
                            justifyContent="end">
                            
                                <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
                                <Link component={RouterLink} color="inherit" to="/auth/login">
                                    Ingresar
                                </Link>

                            
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
            
    )
}
