import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import Swal from "sweetalert2";

import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { getNotes } from "../../helpers/getNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

const startAddEmptyNote = () => {
  return async( dispatch, getState )  => {
    dispatch( savingNewNote() );

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
    }

    const newDoc = doc( collection( firebaseDB, `${uid}/journal/notes` ) );
    await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;
    dispatch( addNewEmptyNote( newNote ) );
    dispatch( setActiveNote( newNote ) );

  }
}

const startLoadingNotes = () => {
  return async( dispatch, getState ) => {

    dispatch( setSaving() );
    const { uid } = getState().auth;

    const notes = await getNotes( uid );

    dispatch( setNotes(notes) );

  }
}

const startSaveNote = () => {
  return async(dispatch, getState) => {
    dispatch( setSaving() );

    const { active: note } = getState().journal;
    const { uid } = getState().auth;

    const noteToFireStore = {...note};
    delete noteToFireStore.id;

    const colRef = collection( firebaseDB, `${uid}/journal/notes` );
    const docRef = doc( colRef, note.id );
    await setDoc( docRef, noteToFireStore, { merge: true });

    dispatch( updateNote() );
  }
}

const startUploadingFiles = ( files = [] ) => {
  return async(dispatch, getState) => {

    dispatch( setSaving() );
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push( fileUpload( file ) );
    }

    const photosUrls = await Promise.all( fileUploadPromises );
    dispatch( setPhotosToActiveNote( photosUrls ) );

  }

}

const startDeleteNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    
    const { id } = note;

    const colRef = collection(firebaseDB, `${uid}/journal/notes` );
    const docRef = doc(colRef, `${id}`);

    await deleteDoc( docRef );

    dispatch( deleteNoteById( id ) );
  }
}

export { startAddEmptyNote, startLoadingNotes, startSaveNote, startUploadingFiles, startDeleteNote }