import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"

import SaveOutlined from "@mui/icons-material/SaveOutlined"
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { useEffect, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

  const { title, body, date, formState, onInputChange } = useForm( note );

  const inputRef = useRef();

  useEffect(() => {
    dispatch( setActiveNote(formState) );
  }, [formState])
  
  useEffect(() => {
    if(messageSaved.length > 0)
      Swal.fire({
        icon: 'success',
        title: 'Nota guardada',
        text: messageSaved
      });
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  // Inicia el proceso de subida de archivos
  const onChangeInputFile = ({ target }) => {
    if( target.files.length === 0 ) return;
    dispatch( startUploadingFiles(target.files) );
  }

  const onUploadButtonClick = () => {
    inputRef.current.click();
  }

  const onDeleteNote = () => {
    dispatch( startDeleteNote() );
  }

  return (
    <Grid container
      justifyContent="space-between"
      alignItems="center"
      rowSpacing={1}
    >

      <input
        type="file"
        multiple
        onChange={ onChangeInputFile }
        ref={ inputRef }
        style={{display: 'none'}}
      />

      <Grid
        container
        flex={true}
        alignItems={'center'}
        justifyContent={'space-between'}
      >

        <Grid item>
          <Typography variant="p" edge="start" sx={{fontSize: {xs: 30, sm: 39}}}>
            28 de septiembre, 2023
          </Typography>
        </Grid>

        <Grid item>
          <Grid container gap={2}>

            <Grid item>
              <IconButton
                color="primary" 
                disabled={ isSaving }
                onClick={ onUploadButtonClick }
              >
                <UploadFileOutlined />
              </IconButton>
            </Grid>

            <Grid item>
              <Button
                onClick={ onSaveNote }
                color="primary" variant="outlined"
              >
                <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                <Typography sx={{fontWeight: 'bold'}}>Guardar</Typography>
              </Button>
            </Grid>

          </Grid>
        </Grid>

      </Grid>

      

      <Grid container rowSpacing={ 2 } sx={{mt: 2}}>
        <Grid item xs={ 12 }>
          <TextField 
            type="text"
            placeholder="Ingrese un título"
            fullWidth
            label="Título"
            variant="standard"
            name="title"
            value={ title }
            onChange={ onInputChange }
            />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField 
            type="text"
            placeholder="¿Qué sucedió hoy?"
            multiline
            minRows={ 5 }
            fullWidth
            variant="filled"
            name="body"
            value={ body }
            onChange={ onInputChange }
          />
        </Grid>
      </Grid>

      <Grid container
        flex justifyContent={'end'}
        sx={{marginY: '5px'}}
      >
        <IconButton onClick={ onDeleteNote } color="error">
         <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>

      <Grid item xs={ 12 }>
        <ImageGallery />
      </Grid>

    </Grid>
  )
}