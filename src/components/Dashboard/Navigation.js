import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({dependencyObj}) => {
  return (
    <Link onClick={dependencyObj.closeMethod} to={dependencyObj.toUrl} >
        <ListItem  disablePadding key = {dependencyObj.type}>
            <ListItemButton>
                <ListItemIcon>
                    {dependencyObj.icon}
                </ListItemIcon>
                <ListItemText primary={dependencyObj.type}/>
            </ListItemButton>
        </ListItem>
    </Link>
  )
}

export default Navigation