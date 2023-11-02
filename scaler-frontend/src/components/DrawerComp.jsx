import React from 'react';
import {
    Divider,
    IconButton, List, ListItemButton, ListItemText, SwipeableDrawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import profile from '../assets/profile.png';
import '../stylesheets/DrawerComp.css';

const DrawerComp = () => {
    const [open, setOpen] = React.useState(false);

    const pages = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Edit Marks',
            path: '/edit',
        },
        {
            label: 'View Marks',
            path: '/view',
        }
    ];



    return (<>
        <SwipeableDrawer PaperProps={{sx: {backgroundColor: '#FF936F'}}} open={open}
                         onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
            <List sx={{
                marginRight: '2vw',
                marginLeft: '1vw',
            }}>
                <img className={'profileDrawer'} src={profile} referrerPolicy="no-referrer" alt={'Profile Icon'}/>
                <Divider/>
                {pages.map(page => <ListItemButton key={page.path} component={Link} onClick={() => setOpen(false)} to={page.path}>
                    <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary={page.label}/>
                </ListItemButton>)}
            </List>
        </SwipeableDrawer>
        <IconButton sx={{marginLeft: 'auto'}} onClick={() => setOpen(!open)}>
            <MenuIcon/>
        </IconButton>
    </>);
};

export default DrawerComp;
