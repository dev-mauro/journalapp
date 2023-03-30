import Box from "@mui/system/Box"
import Toolbar from "@mui/material/Toolbar";




import { NavBar, SideBar } from "../components";
import { useDrawer } from "../hooks";

const JournalLayout = ({children}) => {

  const { drawerState, toggleDrawer, drawerWidth } = useDrawer(240);

  return (
    <Box xs={{display: 'flex'}}>

      <NavBar drawerWidth={ drawerWidth }  toggleDrawer={toggleDrawer}/>

      <SideBar drawerWidth={drawerWidth} drawerState={drawerState} toggleDrawer={toggleDrawer}/>
      
      <Box component='main'
        sx={{ flexGrow: 1, p: 3, ml: {md: `${drawerWidth}px`}}}>

        <Toolbar />

        {children}

      </Box>

    </Box>
  )
}

export { JournalLayout }