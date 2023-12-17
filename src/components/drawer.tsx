// 


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';

import Logo from '../asserts/imgs/logo.png';
import '../asserts/css/drawer.css';
import Panel from '../pages/panel/panel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import imgT from '../asserts/imgs/english.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import profile from '../asserts/imgs/profile.png'
import Product from '../pages/product/product';
const drawerWidth = 240;

export default function ResponsiveDrawer() {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const tabs = [
    { text: 'Panel', icon: <InboxIcon /> },
    { text: 'Products', icon: <MailIcon /> },
    { text: 'Tab 3', icon: <DraftsIcon /> },
    { text: 'Panel', icon: <InboxIcon /> },
    { text: 'Tab 2', icon: <MailIcon /> },
    { text: 'Tab 3', icon: <DraftsIcon /> },
    { text: 'Panel', icon: <InboxIcon /> },
    { text: 'Tab 2', icon: <MailIcon /> },
    { text: 'Tab 3', icon: <DraftsIcon /> },
    { text: 'Panel', icon: <InboxIcon /> },
    { text: 'Tab 2', icon: <MailIcon /> },
    { text: 'Tab 3', icon: <DraftsIcon /> },
    // Add more tabs as needed
  ];

  const drawer = (
    <div>
      <div className='logo_cont'>
        <div className="logo-header">
          <img src={Logo} alt="" className='logo_img' />
          <img src={profile} alt="" className='profile_img' />

          <h6 className='email_adress'>digigarsontest@gmail.com</h6>
        </div>
      </div>
      <Divider />


      <List>
        {tabs.map((tab, index) => (
          <ListItem key={tab.text} disablePadding>
            <ListItemButton
              onClick={() => handleTabChange(index)}
              sx={activeTab === index ? { backgroundColor: '#e3192780', borderRadius: '15px' } : { borderRadius: '15px', boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)', backgroundColor: 'white' }}
              className='tabBtnList'
            >
              <ListItemText
                sx={activeTab === index ? { color: 'white' } : {}}
                primary={tab.text}
              />
              <ListItemIcon
                sx={activeTab === index ? { color: 'white' } : {}}
                className='iconsTabs'
              >
                {tab.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <button className='logout_btn'>
        Logout

        <span className='svg_cont'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 23.3333C11.5246 23.3333 9.15067 22.35 7.40033 20.5997C5.64999 18.8493 4.66666 16.4753 4.66666 14C4.66666 11.5246 5.64999 9.15067 7.40033 7.40033C9.15067 5.64999 11.5246 4.66666 14 4.66666" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            <path d="M11.6667 14H23.3333M23.3333 14L19.8333 10.5M23.3333 14L19.8333 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className='header_flx'>
            <div className='searchbar'>
              <span><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <path d="M17.4375 15.75H16.5488L16.2338 15.4463C17.3744 14.1233 18.0012 12.4343 18 10.6875C18 9.24123 17.5711 7.82743 16.7676 6.6249C15.9641 5.42236 14.8221 4.4851 13.4859 3.93163C12.1497 3.37817 10.6794 3.23336 9.2609 3.51551C7.84242 3.79767 6.53946 4.49411 5.51678 5.51678C4.49411 6.53946 3.79767 7.84242 3.51551 9.2609C3.23336 10.6794 3.37817 12.1497 3.93163 13.4859C4.4851 14.8221 5.42236 15.9641 6.6249 16.7676C7.82743 17.5711 9.24123 18 10.6875 18C12.4988 18 14.1638 17.3363 15.4463 16.2338L15.75 16.5488V17.4375L21.375 23.0513L23.0513 21.375L17.4375 15.75ZM10.6875 15.75C7.88625 15.75 5.625 13.4888 5.625 10.6875C5.625 7.88625 7.88625 5.625 10.6875 5.625C13.4888 5.625 15.75 7.88625 15.75 10.6875C15.75 13.4888 13.4888 15.75 10.6875 15.75Z" fill="#1E1E1E" fill-opacity="0.55" />
              </svg></span>
              <input type="text" name="" id="" placeholder='Search' />
            </div>

            <div>
              <button className='translator_btn'><span><img src={imgT} alt="" />English<ArrowDropDownIcon /> </span></button>
              <img src={profile} alt="" className='fronT-pro' />

            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={undefined}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}

        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: '64px', // Add a top margin to avoid overlapping with the header
          position: 'relative', // Make sure it's a positioned element
        }}
      >
        <Toolbar />
        {activeTab === 0 && (
          <Typography paragraph>
            <Panel />
          </Typography>
        )}
        {activeTab === 1 && (
          <Typography paragraph>
            <Product />
          </Typography>
        )}
        {activeTab === 2 && (
          <Typography paragraph>
            Content for Tab 3
          </Typography>
        )}
      </Box>
    </Box>
  );
}
