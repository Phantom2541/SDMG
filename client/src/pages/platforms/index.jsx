import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/sidebar";
import TopNavigation from "../../components/topbar";
import Routes from "../Routes";
import { socket } from "../../services/utilities";

const breakWidth = 1400;
export default function Platforms() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth),
    [sideNavToggled, setSideNavToggled] = useState(false),
    [dynamicLeftPadding, setDynamicLeftPadding] = useState("0");

  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    console.log("[App] initialized.");
    socket.on("me", (id) => console.log(`[${id}] Connected.`));

    return () => socket.off("me");
  }, []);

  useEffect(() => {
    if (windowWidth > breakWidth) {
      setDynamicLeftPadding("240px");
    } else {
      setDynamicLeftPadding("0");
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSideNav = () => {
    if (windowWidth < breakWidth) {
      setSideNavToggled(!sideNavToggled);
    }
  };

  return (
    <div className="app">
      <SideNavigation
        breakWidth={breakWidth}
        style={{ transition: "all .3s" }}
        triggerOpening={sideNavToggled}
        onLinkClick={toggleSideNav}
      />
      <div className="flexible-content white-skin">
        <TopNavigation
          toggle={windowWidth < breakWidth}
          onSideNavToggleClick={toggleSideNav}
          className="white-skin"
        />
        <main
          style={{ paddingLeft: dynamicLeftPadding, margin: "8rem 6% 6rem" }}
        >
          <Routes />
        </main>
      </div>
    </div>
  );
}
