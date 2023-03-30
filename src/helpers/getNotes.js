import { collection, getDocs, query } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

// Obtiene las notes de firestore del uid indicado
const getNotes = async( uid ) => {
  if( !uid ) throw new Error('[getNotes] El uid del usuario no existe');

  const collectionRef = collection( firebaseDB, `${uid}/journal/notes` );
  const queryResult = await getDocs( collectionRef );

  const notes = queryResult.docs.map( (doc) => {
    const id = doc.id;
    const data = doc.data();
    return {
      ...data,
      id
    }
  } );

  return notes;
}

export { getNotes };