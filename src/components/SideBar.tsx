
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Logo from "../asserts/imgs/logo.png";
import profile from "../asserts/imgs/profile.png";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import CasesIcon from "@mui/icons-material/Cases";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeLocalStorageItem } from "../utils/localstorage";
import { useTranslation } from 'react-i18next';
const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}



const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { t } = useTranslation();
  const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);
  const [isIntegrationDropdownOpen, setIsIntegrationDropdownOpen] =
    useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleReportsDropdown = () => {
    setIsReportsDropdownOpen(!isReportsDropdownOpen);
  };

  const closeReportsDropdown = () => {
    setIsReportsDropdownOpen(false);
  };

  const toggleIntegrationDropdown = () => {
    setIsIntegrationDropdownOpen(!isIntegrationDropdownOpen);
  };

  const closeIntegrationDropdown = () => {
    setIsIntegrationDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const tabs = [
    { text: t('panelMenuText'), icon: <InboxIcon />, path: "/dashboard" },
      {
        text: t('productsMenuText'),
        icon: <ProductionQuantityLimitsIcon />,
        path: "/products",
      },
      { text: t('optionsMenuText'), icon: <ArticleIcon />, path: "/option" },
      { text: t('categoryMenuText'), icon: <CategoryIcon />, path: "/category" },
      { text: t('sectionMenuText'), icon: <BorderAllIcon />, path: "/section" },
      { text: t('casesMenuText'), icon: <CasesIcon />, path: "/cases" },
      { text:  t('usersMenuText'), icon: <RecentActorsIcon />, path: "/users" },
      {
        text: t('reportsMenuText'),
        icon: <ReportIcon />,
        path: "/reports",
        dropdownItems: [
          { text:  t("productMenuText"), path: "/report-product" },
          { text:t("categoryMenuText"), path: "/report-category" },
          { text:t("orderTypeMenuText"), path: "/report-order-type" },
          { text:  t("paymentTypeMenuText"), path: "/report-payment" },
          { text: t("workerMenuText"), path: "/report-worker" },
          { text: t("casesMenuText"), path: "/report-cases" },
        ],
      },
      {
        text: t('integrationMenuText'),
        icon: <ReportIcon />,
        path: "/integration",
        dropdownItems: [
        { text: t("matchProductMenuText"), path: "/match-product" },
          { text: t("matchOptionMenuText"), path: "/match-option" },
          { text:  t("huginIntegrationMenuText"), path: "/hugin-integration" },
      ],
      },
    ];
  const location = useLocation();

  const drawer = (
    <div>
      <div className="logo_cont">
        <div className="logo-header">
          <img src={Logo} alt="" className="logo_img" />
          <img src={profile} alt="" className="profile_img" />

          <h6 className="email_adress">digigarsontest@gmail.com</h6>
        </div>
      </div>
      <Divider />

      <List>
        {tabs.map((tab) => (
          <div key={tab.text}>
            {tab.dropdownItems ? (
              <div
                className={`dropdown ${
                  tab.path === "/newtab" && isDropdownOpen ? "open" : ""
                }`}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (tab.path === "/reports") {
                        toggleReportsDropdown();
                        closeIntegrationDropdown();
                      } else if (tab.path === "/integration") {
                        toggleIntegrationDropdown();
                        closeReportsDropdown();
                      }
                    }}
                    sx={{
                      backgroundColor:
                        location.pathname === tab.path
                          ? "#e3192780"
                          : "transparent",
                      borderRadius: "15px",
                      color:
                        location.pathname === tab.path ? "white" : "#1E1E1E",
                      "&:hover": {
                        backgroundColor:
                          location.pathname === tab.path
                            ? "#e3192780"
                            : "transparent",
                      },
                    }}
                    className={`tabBtnList ${
                      tab.path === "/newtab" && isDropdownOpen ? "open" : ""
                    }`}
                  >
                    <ListItemText primary={<span>{tab.text}</span>} />
                    <ListItemIcon className="iconsTabs">
                      {tab.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                {tab.path === "/reports" && isReportsDropdownOpen && (
                  <ul
                    className={`dropdown ${
                      tab.path === "/reports" && isReportsDropdownOpen
                        ? "open"
                        : ""
                    }`}
                  >
                    {tab.dropdownItems.map((item) => (
                      <Link
                        to={item.path}
                        key={item.text}
                        style={{
                          textDecoration: "none",
                          color:
                            location.pathname === item.path ? "white" : "black",
                          backgroundColor:
                            location.pathname === item.path
                              ? "#ff6e6e"
                              : "White",
                        }}
                        className="tabBtnList"
                        onClick={() => {
                          setMobileOpen(false);
                        }}
                      >
                        <li>{item.text}</li>
                      </Link>
                    ))}
                  </ul>
                )}

                {tab.path === "/integration" && isIntegrationDropdownOpen && (
                  <ul
                    className={`dropdown ${
                      tab.path === "/integration" && isIntegrationDropdownOpen
                        ? "open"
                        : ""
                    }`}
                  >
                    {tab.dropdownItems.map((item) => (
                      <Link
                        to={item.path}
                        key={item.text}
                        style={{
                          textDecoration: "none",
                          color:
                            location.pathname === item.path ? "white" : "black",
                          backgroundColor:
                            location.pathname === item.path
                              ? "#ff6e6e"
                              : "White",
                        }}
                        className="tabBtnList"
                        onClick={() => {
                          setMobileOpen(false);
                        }}
                      >
                        <li>{item.text}</li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              // ...
              <Link
                to={tab.path}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  setMobileOpen(false);
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    sx={
                      location.pathname === tab.path
                        ? {
                            backgroundColor: "#e3192780",
                            borderRadius: "15px",
                            color: "white",
                          }
                        : {
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                            backgroundColor: "white",
                          }
                    }
                    className={`tabBtnList ${
                      tab.path === "/newtab" &&
                      (isNewTabOpen || location.pathname.startsWith("/report"))
                        ? "open"
                        : ""
                    }`}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{
                            color:
                              location.pathname === tab.path
                                ? "white"
                                : "#1E1E1E",
                          }}
                        >
                          {tab.text}
                        </span>
                      }
                    />
                    <ListItemIcon
                      className="iconsTabs"
                      sx={
                        location.pathname === tab.path
                          ? { color: "white" }
                          : { color: "#757575" }
                      }
                    >
                      {tab.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
              // ...
            )}
          </div>
        ))}
      </List>

      <button
        className="logout_btn"
        onClick={() => {
          removeLocalStorageItem("token");
          window.location.reload();
        }}
      >
        {t('logout')}
        <span className="svg_cont">
          <LogoutIcon />
        </span>
      </button>
    </div>
  );

  return (
    <>
      <Drawer
        container={undefined}
        variant="temporary"
        open={mobileOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
