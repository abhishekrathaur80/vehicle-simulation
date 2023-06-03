import React from "react";
import { Link,  useLocation } from "react-router-dom";
import "./Layout.css";
const Layout = (props) => {
 
  const location = useLocation();

  const sideMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Add Scenario",
      path: "/add-scenario",
    },

    {
      name: "All Scenarios",
      path: "/all-senarios",
    },
    {
      name: "Add vehicles",
      path: "/add-vehicles",
    },
  ];
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="menu">
              {sideMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
