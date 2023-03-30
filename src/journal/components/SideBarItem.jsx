import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Grid from "@mui/material/Grid";

import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ note }) => {

  const { title, body } = note;
  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);

  const newBody = useMemo( () => {
    return body.length > 38
      ? title.substring(0,38) + '...'
      : body
  }, [body]);

  const onListItemClick = () => {
    dispatch( setActiveNote(note) );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onListItemClick}>

        <ListItemIcon>
          <TurnedInNot/>
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle}/>
          <ListItemText secondary={newBody}/>
        </Grid>

      </ListItemButton>
    </ListItem>
  )
}