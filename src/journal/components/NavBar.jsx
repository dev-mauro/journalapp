import LogoutOutlined from "@mui/icons-material/LogoutOutlined"
import MenuOutlined from "@mui/icons-material/MenuOutlined"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import { logOut } from "../../store"
import { useDispatch } from "react-redux"

const NavBar = ({ drawerWidth = 240, toggleDrawer }) => {

  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch( logOut() );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${ drawerWidth }px` }
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={ toggleDrawer }
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container justifyContent="space-between" alignItems="center">

          <Typography variant="h5" component="div" noWrap>Journal App</Typography>

          <IconButton color="error" onClick={onLogoutClick}>
            <LogoutOutlined />
          </IconButton>

        </Grid>

      </Toolbar> 
    </AppBar>
  )
}

export { NavBar }