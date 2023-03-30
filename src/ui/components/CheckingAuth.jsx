import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

export const CheckingAuth = () => {
  return (
    <Grid container
      spacing={ 0 }
      justifyContent="center"
      alignItems="center"
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4, color: 'white'}}
    >
      <CircularProgress color="inherit" size={120}/>
    </Grid>
  )
}