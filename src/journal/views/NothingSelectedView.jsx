import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import StarOutline from "@mui/icons-material/StarOutline"
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export const NothingSelectedView = () => {

  const { messageSaved } = useSelector( state => state.journal );

  useEffect(() => {
    if(messageSaved.length > 0) {
      Swal.fire({
        icon: 'info',
        title: 'Nota eliminada',
        text: messageSaved
      });
    }

  }, [messageSaved])
  

  return (
    <Grid container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{minHeight: 'calc(100vh - 120px)', backgroundColor: 'primary.main', borderRadius: 2, color: 'white'}}
    >
      <Grid item>
        <StarOutline sx={{fontSize: 100}}/>
      </Grid>
      <Grid item>
        <Typography variant="h5" textAlign="center">Selecciona o crea una entrada</Typography>
      </Grid>
    </Grid>
  )
}