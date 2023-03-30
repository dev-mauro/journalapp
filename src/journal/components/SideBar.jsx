import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider"

import { SideBarItem } from "./";
import { useSelector } from "react-redux";

const SideBar = ({ drawerWidth, drawerState, toggleDrawer }) => { 

  const { displayName } = useSelector( state => state.auth);
  const { notes } = useSelector( state => state.journal );

  const drawer = (
    <Box sx={{width: `${drawerWidth}px`}}>

      <Toolbar >
        <Typography
          variant="h6"
          component="div"
          sx={{textTransform: 'capitalize'}}
        >
          { displayName }
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {
          notes.map( note => <SideBarItem note={note} key={note.id}/>)
        }
      </List>
    </Box>
  )

  return (
    <div>
      <Drawer
        anchor="left"
        variant="temporary"
        open={drawerState}
        onClose={ toggleDrawer }
        sx={{display: {md: 'none'}}}
      >
        {drawer}
      </Drawer> 
      <Drawer
        anchor="left"
        variant="permanent"
        open
        sx={{display: {xs: 'none', md: 'block'}}}
      >
        {drawer}
      </Drawer> 
    </div>
  )
}

export { SideBar }