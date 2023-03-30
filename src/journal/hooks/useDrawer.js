import { useState } from "react";

export const useDrawer = (width) => {
  
  const drawerWidth = width;

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(drawerState => !drawerState);
  }
  
  return {
    drawerState,
    toggleDrawer,
    drawerWidth
  }
}