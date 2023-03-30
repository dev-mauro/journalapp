import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { login, logout } from "../store";
import { cleanJournalState } from "../store/journal/journalSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuthStatus = () => {
  
  const dispatch = useDispatch();
  const { status } = useSelector( state => state.auth );

  useEffect(() => {
    onAuthStateChanged( firebaseAuth, async(user) => {
      if(!user) {
        dispatch( logout() );
        dispatch( cleanJournalState() );
        document.title = 'Journal';
        return;
      }

      const { displayName, email, photoURL, uid } = user;
      dispatch( login({ displayName, email, photoURL, uid }) );
      dispatch( startLoadingNotes() );
      document.title = `${displayName.split(' ')[0]}'s Journal`
    } )
  }, [])

  
  return {
    status,
  }
}