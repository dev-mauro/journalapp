import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
}

/*
  note: {
    id: '123123', // Firebase ID
    title: '',
    body: '',
    date: 1234,
    imageUrls: [], // https:foto1.jpg, https:foto2.jpg
  }

*/

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload)
      state.isSaving = false;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = '';
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
      state.isSaving = false;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: ( state ) => {
      state.isSaving = false;

      state.notes = state.notes.map( (note) => {
        if(note.id == state.active.id)
          return state.active;
        return note;
      });

      state.messageSaved = `${state.active.title}, actualizada correctamente`
    },
    setPhotosToActiveNote: (state, {payload}) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      let removedNoteTitle = '';
      state.notes = state.notes.filter( note => {
        if(note.id != payload)
          return note;
        removedNoteTitle = note.title;
      });
      state.active = null;
      state.messageSaved = `${removedNoteTitle}, eliminada correctamente`;
    },
    cleanJournalState: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    }
  }
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  savingNewNote,
  setSaving,
  updateNote,
  deleteNoteById,
  setPhotosToActiveNote,
  cleanJournalState } = journalSlice.actions;
export { journalSlice };