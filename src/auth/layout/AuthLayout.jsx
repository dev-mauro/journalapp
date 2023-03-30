import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const AuthLayout = ({children, title}) => {
  return (
    <Grid container
      spacing={ 0 }
      justifyContent="center"
      alignItems="center"
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
      <Grid item
        sx={{maxWidth: '500px', backgroundColor: 'white', borderRadius: 2, boxShadow: '0 5px 5px rgba(0,0,0,0.2)', padding: 2}}  
      >
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, textTransform:'capitalize' }}>
          {title} 
        </Typography>
            
        {children}

      </Grid>

    </Grid>
  )
}

export { AuthLayout }
