import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

    const formDate= {
        email:"a@a.com",
        password:"123456",
    }

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const onSubmitNote = (e)=>{
        e.preventDefault();
    }

    const dispatch = useDispatch();
    
    const {email, password, onInputChange} = useForm( formDate );

    //lo memorizamos y esto regresara un valor booleano y de dependencias mandamos el status
    const isAuthenticating = useMemo( () => status === 'checking', [status] );

    const onSubmit = (event) =>{
        event.preventDefault();

        // console.log({email, password})
        // dispatch( checkingAuthentication() )
        dispatch( startLoginWithEmailPassword( { email, password } ) )
    }

    const onGoogleSignIn = () =>{
        console.log('google');
        dispatch(startGoogleSingIn() );
    }

    return (
            <AuthLayout title="login">
                <form onSubmit={onSubmit}>
                    <Grid
                        container
                        className="animate__animated animate__fadeIn animate__faster"
                        >
                        <Grid item xs={12} sx={{mt:2}}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder="Escribe tu correo"
                                fullWidth
                                name="email"
                                value={email}
                                onChange={onInputChange}
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
                                />
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            sx={{mb:2, mt:2}}
                            >
                            <Grid item xs={12} sm={6}
                                display={!!errorMessage?"":"none"}
                            >
                                <Alert severity="error">{ errorMessage }</Alert>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button 
                                    disabled={isAuthenticating}
                                    variant="contained" fullWidth type="submit">
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button 
                                    disabled={isAuthenticating}
                                    variant="contained" fullWidth onClick={onGoogleSignIn}>
                                    <Google/>
                                    <Typography
                                        sx={{ml:1}}
                                        > 
                                        Google
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            direction="row" 
                            justifyContent="end">
                            <Grid item>
                                <Link component={RouterLink} color="inherit" to="/auth/register">
                                    Crear una cuenta
                                </Link>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
            
    )
}
