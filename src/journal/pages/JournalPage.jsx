import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

import { JournalLayout } from "../layout"
import { NothingSelectedView, NoteView } from "../views"
import { useDispatch, useSelector } from "react-redux";
import { startAddEmptyNote } from "../../store/journal/thunks";


const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startAddEmptyNote() );
  }
  

  return (
    <JournalLayout>
      
      {
        (!!active)
        ? <NoteView />
        : <NothingSelectedView />
      }      

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        sx={{ backgroundColor: 'primary.main', color: 'white', position: 'fixed', bottom: 20, right: 20, border: 3, borderColor: 'white',
      ':hover': { backgroundColor: 'white', color: 'primary.main', borderColor: 'primary.main' }}}>
        <AddIcon sx={{fontSize: 30}} />
      </IconButton>

    </JournalLayout>
  )
}

export { JournalPage }