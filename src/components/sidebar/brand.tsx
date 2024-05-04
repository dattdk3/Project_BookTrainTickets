"use client";
import "./css.css";
import { List, ListItem, Box } from "@mui/joy";
import {
  ListItemText,
  ListItemButton,
  Grid,
} from "@mui/material";
import InforBrand from "./InforBrand";

interface Routing {
  url: string;
  label: string;
}
const routing: Array<Routing> = [
  {
    url: "/brand/trip/add",
    label: "Thêm chuyến",
  },
  {
    url: "/brand/trip/list",
    label: "Danh sách chuyến",
  },
  {
    url: "/brand/vehicle/add",
    label: "Thêm phương tiện",
  },
  {
    url: "/brand/vehicle/list",
    label: "Danh sách phương tiện",
  },
  {
    url: "/brand/driver/add",
    label: "Thêm tài xế",
  },
  {
    url: "/brand/driver/list",
    label: "Danh sách tài xế",
  },
];

const NavBrand = () => {

  return (
    <nav className="navbarItems">
      <h1>
        <a href="/" className="navbar-logo">
          Brand
          <i className="fab fa-react"></i>
        </a>
      </h1>
      <div className="menu-bar">
        <div className="menu">
          <Box
            component="nav" aria-label="My site" sx={{ flexGrow: 1 }}
          >
            <List role="menubar" orientation="horizontal">
              {routing.map((item, index) => (
                <ListItem
                  role="none"
                  key={index}
                >
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href={item.url}
                  >
                    <ListItemText className="text nav-text" primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Grid container alignItems="flex-start">
                <InforBrand />
              </Grid>
            </List>
          </Box>
        </div>
      </div>
    </nav >
  );
}

export default NavBrand;
