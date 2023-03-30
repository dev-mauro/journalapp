import { ConnectingAirportsOutlined, ContentPasteGoOutlined } from '@mui/icons-material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { logoutUser, registerUserWithCredentials, signInWithCredentials, signInWithGoogle } from '../../firebase/providers';


import { checkingCredentials, login, logout } from "./authSlice";

const checkingAuthentication = (email, password) => {
  return async(dispatch, getState) => {
    console.log('autentikeichon');
    dispatch( checkingCredentials() );

  }
}

const startGoogleSignIn = () => {
  return async( dispatch ) => {
    console.log('autentikeichon con google');

    dispatch( checkingCredentials() );

    const {ok, result} = await signInWithGoogle();

    if(!ok) return dispatch( logout( result.errorMessage ) );

    // dispatch( login(result) );

    console.log(result);

  }
}

const startEmailAndPasswordSignIn = (userCredentials) => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, result } = await signInWithCredentials( userCredentials );

    if( !ok ) return dispatch( logout( result.errorMessage ) );

    // dispatch( login(result) );

  }
}

const startRegister = (userCredentials) => {
  return async( dispatch ) => {
    console.log('se inicia el registro');

    dispatch(  checkingCredentials() );

    const { ok, result } = await registerUserWithCredentials(userCredentials);

    if( !ok ) return dispatch( logout( result.errorMessage ) );

    // dispatch( login(result) );

    console.log(result);

  }
}

const logOut = () => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );
    await logoutUser();

    // dispatch( logout() );

  }
}


export { checkingAuthentication, startGoogleSignIn, startRegister, startEmailAndPasswordSignIn, logOut }