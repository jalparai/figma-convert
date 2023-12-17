// import React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// // import useTheme from '@mui/material/styles/useTheme';
// import Sidebar from './SideBar';
// import '../asserts/css/drawer.css';
// import imgT from '../asserts/imgs/english.png';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import profile from '../asserts/imgs/profile.png'
// import { Box } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import { useTranslation } from 'react-i18next';
// import i18n from 'i18next';

// interface LayoutProps {
//   children: React.ReactNode;

// }

// const drawerWidth = 240;

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { t } = useTranslation();

//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     console.log('== children ===', children);
//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//       };
//       const changeLanguage = (lang: string) => {
//         i18n.changeLanguage(lang);
//       };
//     const theme = createTheme({
//         palette: {
//           primary: {
//             main: '#ff7777',
//           },
//           secondary: {
//             main: '#0dcaf0',
//           },
//         },
//       });
//       // const { t } = useTranslation();

//   return (
//   <ThemeProvider theme={theme}>
//       <Box sx={{display: 'flex'}}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//             zIndex: 1,
//           }}
//       >
//         <Toolbar>
//         {mobileOpen ? (
//         <IconButton
//           color="inherit"
//           aria-label="close drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: 'none' } }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : (
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>
//       )}
//           <div className='header_flx'>
         

//             <div>
//               {/* <button className='translator_btn'><span><img src={imgT} alt="" />English<ArrowDropDownIcon /> </span></button> */}
//               {/* <select name="English" id="" className='translator_btn'>
//                 <option value="English"><img src={imgT} alt="" />English<ArrowDropDownIcon /> </option>
//                 <option value="Turkey"><img src={imgT} alt="" />Turkey<ArrowDropDownIcon /> </option>
//                 <option value="Arabic"><img src={imgT} alt="" />Arabic<ArrowDropDownIcon /> </option>

//               </select> */}
     
//             <select name="Categories" id="" className="category"  onChange={(e) => changeLanguage(e.target.value)} style={{top:'2px' , right:'5px',width:'137px',cursor:"pointer"}}>
//             <option value="en">{t('English')}</option>
//               <option value="tr">{t('Turkish')}</option>
//               <option value="ar">{t('Arabic')}</option>
//         </select>
        
//               <img src={profile} alt="" className='fronT-pro' />

//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//       <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           marginTop: '64px', 
//           position: 'relative',
//         }}
//       >
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   </ThemeProvider>
//   );
// };

// export default Layout;
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import useTheme from '@mui/material/styles/useTheme';
import Sidebar from "./SideBar";
import "../asserts/css/drawer.css";
import imgT from "../asserts/imgs/english.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import profile from "../asserts/imgs/profile.png";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log("== children ===", children);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeLanguage = (lang: string) => {
            i18n.changeLanguage(lang);
          };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff7777",
      },
      secondary: {
        main: "#0dcaf0",
      },
    },
  });
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
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
            {mobileOpen ? (
              <IconButton
                color="inherit"
                aria-label="close drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <CloseIcon />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <div className="header_flx">
              <div>
                {/* <button className="translator_btn">
                  <span>
                    <img src={imgT} alt="" />
                    English
                    <ArrowDropDownIcon />{" "}
                  </span>
                </button> */}
                       <select name="Categories" id="" className="category"  onChange={(e) => changeLanguage(e.target.value)} style={{top:'2px' , right:'5px',width:'137px',cursor:"pointer"}}>
             <option value="en">{t('English')}</option>
               <option value="tr">{t('Turkish')}</option>
               <option value="ar">{t('Arabic')}</option>
         </select>
                <img src={profile} alt="" className="fronT-pro" />
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: "64px",
            position: "relative",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
