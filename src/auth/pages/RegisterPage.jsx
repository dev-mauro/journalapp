import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

import { Link as RouterLink } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startRegister } from "../../store"


const formData = {
  name: 'mauricio',
  email: 'mauro@ejemplo.cl',
  password: '123456'
}

const formValidation = {
  'name': [(value) => value.length > 5, 'El nombre debe tener más de 5 caracteres'],
  'email': [(value) => value.includes('@'), 'El email debe incluir un @' ],
  'password': [(value) => value.length > 5, 'La contraseña debe tener más de 5 caracteres']
}

const RegisterPage = () => {

  const { name, nameValid, email, emailValid, password, passwordValid, onInputChange, isValid, formState } = useForm( formData, formValidation );

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);
  const displayErrorMessage = useMemo( () => errorMessage === "Firebase: Error (auth/email-already-in-use).", [errorMessage]);
  

  const onSubmit = ( e ) => {
    e.preventDefault();

    if(!isValid) return;

    dispatch( startRegister(formState) );
  }

  return (
    <AuthLayout title="sign in">
      
      <form onSubmit={onSubmit}>

        <Grid container justifyContent='center' sx={{width: '100%'}}>

          <Grid container rowSpacing={ 2 } sx={{mb: 2}}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Ingrese su nombre"
                type="text"
                error={!!nameValid}
                helperText={nameValid}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="email@example.com"
                type="email"
                error={!!emailValid}
                helperText={emailValid}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="*****"
                type="password"
                error={!!passwordValid}
                helperText={passwordValid}
                fullWidth
              ></TextField>
            </Grid>

          </Grid>

          <Grid container justifyContent="center" rowSpacing={ 2 }>

            <Grid item xs={12} sx={{mb: 2}}>
              <Button
                variant="contained"
                type="submit"
                disabled={!isValid || isCheckingAuthentication}
                fullWidth
              >
                Registrar
              </Button>
            </Grid>

            <Grid container justifyContent='end'>
              <Link component={ RouterLink } to="login">
                Iniciar sesión
              </Link>
            </Grid>

            {
              (displayErrorMessage)
                ? (<Grid container justifyContent='center'>
                    <Typography sx={{color: 'red'}}>El usuario ya está registrado</Typography>
                  </Grid>)
                : ''
            }

          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}

export { RegisterPage }