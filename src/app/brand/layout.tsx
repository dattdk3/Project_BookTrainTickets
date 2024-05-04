"use client";
// ** React Imports
import { ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import VerticalLayout from "@/components/layout/VerticalLayout";
import VerticalAppBarContent from "@/components/layout/AppBarContent";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import RouteIcon from "@mui/icons-material/Route";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PersonIcon from '@mui/icons-material/Person';
// ** Layout Imports
interface Props {
  children: ReactNode;
}

const navigation = [
  {
    title: "Tổng Quan",
    icon: HomeIcon,
    path: "/brand/overview",
  },
  {
    sectionTitle: "Lộ trình",
  },
  {
    title: "Lộ Trình",
    icon: RouteIcon,
    path: "/brand/route/list",
  },
  // {
  //   title: "Thêm Lộ Trình",
  //   icon: AltRouteIcon,
  //   path: "/brand/route/add",
  // },
  {
    title: "Chuyến Đi",
    icon: AltRouteIcon,
    path: "/brand/trip/list",
  },
  // {
  //   title: "Thêm Chuyến",
  //   icon: AltRouteIcon,
  //   path: "/brand/trip/add",
  // },
  {
    sectionTitle: "Phương Tiện",
  },
  {
    title: "Phương Tiện",
    icon: DirectionsCarFilledIcon,
    path: "/brand/vehicle/list",
  },
  // {
  //   title: "Thêm Phương Tiện",
  //   icon: DirectionsCarFilledIcon,
  //   path: "/brand/vehicle/add",
  // },
  {
    title: "Tài Xế",
    icon: PersonIcon,
    path: "/brand/driver/list",
  },
  // {
  //   title: "Thêm Tài Xế",
  //   icon: PersonIcon,
  //   path: "/brand/driver/add",
  // },
  {
    sectionTitle: "Đối Soát",
  },
  {
    title: "Lịch sử giao dịch",
    icon: HistoryOutlinedIcon,
    path: "/brand/payment",
  }
];
const Layout = ({ children }: Props) => {
  const hidden = useMediaQuery("1200px");
  return (
    <VerticalLayout
      hidden={hidden}
      verticalNavItems={navigation}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  );
};

export default Layout;
