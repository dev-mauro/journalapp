import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async() => {
  try {

    const result = await signInWithPopup( firebaseAuth, googleProvider );

    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;

    const user = result.user;

    return { ok: true, result: user };

  } catch(e) {
    
    const errorMessage = e.message;

    return {
      ok: false,
      result: {
        errorMessage,
      }
    }
  }
}

const signInWithCredentials = async({email, password}) => {

  try {

    const resp = await signInWithEmailAndPassword( firebaseAuth, email, password );

    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      result: { uid, displayName, email, photoURL },
    }

  } catch (err) {

    console.log(err)
    const {message : errorMessage} = err;

    return {
      ok: false,
      result: {
        errorMessage
      }
    }
  }

}

const registerUserWithCredentials = async({ name, email, password }) => {

  try {

    //Se crea un user en firebase con el email y password enviado
    const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password );

    const { photoURL, uid } = resp.user;

    //Se actualiza el displayName en firebase
    await updateProfile( firebaseAuth.currentUser, {
      displayName: name,
    } );

    return { ok: true, result: { name, email, photoURL, uid } };


  } catch(error) {

    const errorMessage = error.message;
    console.log(error)
    return {
      ok: false,
      result: {
        errorMessage,
      }
    }
  }

}


const logoutUser = async() => {
  try {

    const resp = await signOut(firebaseAuth);

    return {ok: true}

  } catch(error) {

    const {message: errorMessage} = error;
    return {ok: false, errorMessage}

  }


}

export { signInWithGoogle, registerUserWithCredentials, signInWithCredentials, logoutUser }