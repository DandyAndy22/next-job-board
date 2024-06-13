'use client'
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useUserContext } from '@/context/userContext';
import Link from 'next/link';
import { LoginButton } from './LoginButton';


export default function NavBar() {
    const user = useUserContext()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} onClick={handleClose} href="/">
                            Home
                        </MenuItem>
                        <MenuItem component={Link} onClick={handleClose} href="/job_board">
                            Jobs
                        </MenuItem>
                        {user &&
                        <MenuItem component={Link} onClick={handleClose} href="/add_job">
                            Add Job
                        </MenuItem>}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Job Board
                    </Typography>
                    <LoginButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}