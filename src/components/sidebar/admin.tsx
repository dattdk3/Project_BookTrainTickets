"use client";
import Overview from "@/app/admin/overview/page";
import "./css.css";
import { UserInfo } from "@/model/auth/AuthModel";
import { AuthService } from "@/service/auth/authService";
import { List, ListItem, Box } from "@mui/joy";
import {
  ListItemText,
  ListItemButton,
  Grid,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RouteIcon from "@mui/icons-material/Route";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HomeIcon from "@mui/icons-material/Home";
import InforAdmin from "./InforAdmin";
interface Routing {
  url: string;
  label: string;
  icon: React.ReactElement;
}
const routing: Array<Routing> = [
  {
    url: "/admin/overview",
    label: "Tổng quan",
    icon: <HomeIcon className="icon" />,
  },
  {
    url: "/admin/listbrands/list",
    label: "Danh Sách Nhà Xe",
    icon: <AssignmentTurnedInRoundedIcon className="icon" />,
  },
  {
    url: "/admin/listtrips",
    label: "Danh Sách Chuyến Đi",
    icon: <AltRouteIcon className="icon" />,
  },
  {
    url: "/admin/listroutes",
    label: "Danh Sách Lộ Trình",
    icon: <RouteIcon className="icon" />,
  },
  {
    url: "/admin/listvehicles",
    label: "Danh Sách Xe",
    icon: <DirectionsCarFilledIcon className="icon" />,
  },
  {
    url: "/admin/paymentuser",
    label: "Lịch Sử Giao Dịch Người Dùng",
    icon: <HistoryOutlinedIcon className="icon" />,
  },
  {
    url: "/admin/paymentbrand",
    label: "Lịch Sử Giao Dịch Nhà Xe",
    icon: <CurrencyExchangeOutlinedIcon className="icon" />,
  },
];
const NavAdmin = () => {
  const router = useRouter();
  const authService = new AuthService();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  function handleLogOut() {
    authService.logout();
    setUserInfo(null);
    router.push("/auth/login");
  }
  const handleClick = (url: string) => {
    router.push(url);
  };
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const toggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <nav className={toggleSidebar ? "sidebar close" : "sidebar"}>
      <header>
        <div className="image-text">
          <a href="/admin/adminsetting" className="image">
            <InforAdmin />
          </a>
        </div>
        <i className="bx bx-chevron-right toggle" onClick={toggle}>
          {" "}
          <ArrowForwardIosIcon />
        </i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <List role="menubar">
            {routing.map((item, index) => (
              <ListItem role="none" key={index}>
                <ListItemButton role="menuitem" component="a" href={item.url}>
                  <ListItemIcon children={item.icon} />
                  <ListItemText
                    className="text nav-text"
                    primary={item.label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{flex: 1}}/>
            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                component="a"
                onClick={handleLogOut}
              >
                <ListItemIcon
                  children={<LogoutIcon className="bx bx-log-out icon" />}
                />
                <ListItemText className="text nav-text" primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
