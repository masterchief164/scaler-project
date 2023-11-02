import React from 'react';
import {
    AppBar, IconButton, Tab, Tabs, Toolbar, useMediaQuery,
} from '@mui/material';
import {Link} from 'react-router-dom';
import CollegeIcon from '../assets/iiitdmj.svg';
import '../stylesheets/Nav.css';
import GoogleIcon from '../assets/google.png';
import DrawerComp from './DrawerComp.jsx';
import {UserContext} from '../utils/UserContext.jsx';

const Nav = () => {
    const [, , pageNumber, setPageNumber] = React.useContext(UserContext);
    const isSmall = useMediaQuery('(max-width:900px)');

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
        <AppBar position="static" className={'row header'} sx={{
            background: '#fff',
            padding: '0.5em 2em',
        }}>
            <Toolbar>
                <IconButton sx={{background: '#FE926E'}} component={Link} to={'/'}
                            onClick={() => setPageNumber(0)}>
                    <img src={CollegeIcon} alt="IIITDMJ"/>
                </IconButton>
                {!isSmall ? <>
                    <Tabs value={pageNumber} onChange={(e, val) => setPageNumber(val)}
                          indicatorColor={'primary'}>
                        {pages.map(page =>
                            <Tab key={page.path} component={Link} to={page.path} label={page.label} sx={{
                                fontSize: '0.9vw',
                                margin: ' 0 1.5vw',
                            }}/>)}
                    </Tabs>
                    <IconButton
                        sx={{
                            marginLeft: 'auto',
                            height: 'calc(max(3vw, 5vh))',
                            width: 'calc(max(3vw, 5vh))',
                        }}>
                        <img src={GoogleIcon} alt={'Google Icon'}/>
                    </IconButton>
                </> : <DrawerComp/>}
            </Toolbar>
        </AppBar>

    </>);
};

export default Nav;
