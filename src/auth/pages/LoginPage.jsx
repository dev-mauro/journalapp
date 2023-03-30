import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Google from "@mui/icons-material/Google"
import Link from "@mui/material/Link"
import CircularProgress from "@mui/material/CircularProgress"
import { Link as RouterLink } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { checkingAuthentication, startEmailAndPasswordSignIn, startGoogleSignIn } from "../../store"
import { useMemo } from "react"
import { CheckingAuth } from "../../ui"

const formData = {
  email: 'example@example.com',
  password: '123456',
}

const LoginPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange, formState } = useForm(formData);

  const isChecking = useMemo( () => status === 'checking', [status]);
  const displayErrorMessage = useMemo( () => errorMessage === 'Firebase: Error (auth/user-not-found).', [errorMessage]);



  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startEmailAndPasswordSignIn(formState) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }
  
  if( isChecking ) return <CheckingAuth />;

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>

        <Grid container justifyContent='center'>
          
          <Grid container direction="column" sx={{mb: 2}}>
            <Grid item>
              <TextField 
                name="email"
                value={email}
                onChange={onInputChange}
                label="Correo"
                type="email"
                placeholder="email@example.com"
                sx={{mb: 2}}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField 
                name="password"
                value={password}
                onChange={onInputChange}
                label="Constraseña"
                type="password"
                placeholder="***"
                fullWidth
              />
            </Grid>

          </Grid>

          <Grid container 
            justifyContent="center"
            columnSpacing={ 2 }
            rowSpacing={ 2 }>

            <Grid item xs={12} lg={ 6 }>
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                  Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} lg={ 6 }>
              <Button
                onClick={onGoogleSignIn}
                variant="outlined"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>

            <Grid container justifyContent="end" sx={{mt: 2}}>
              <Link component={ RouterLink } to="/auth/register">
                Crear cuenta
              </Link>
            </Grid>

            <Grid container justifyContent="center">
              <Typography 
                color={'red'}
                display={displayErrorMessage ? '' : 'none'}
              >
                El email y contraseña no coinciden.
              </Typography>
            </Grid>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}

export { LoginPage }
