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

// ** Layout Imports
interface Props {
  children: ReactNode;
}

const navigation = [
  {
    title: "Tổng Quan",
    icon: HomeIcon,
    path: "/admin/overview",
  },
  {
    sectionTitle: "Nhà xe",
  },
  {
    title: "Nhà Xe",
    icon: AssignmentTurnedInRoundedIcon,
    path: "/admin/listbrands/list",
  },
  {
    title: "Lộ Trình",
    icon: RouteIcon,
    path: "/admin/listroutes",
  },
  {
    title: "Chuyến Đi",
    icon: AltRouteIcon,
    path: "/admin/listtrips",
  },
  {
    title: "Phương Tiện",
    icon: DirectionsCarFilledIcon,
    path: "/admin/listvehicles",
  },
  {
    sectionTitle: "Lịch sử giao dịch",
  },
  {
    title: "Nhà Xe",
    icon: HistoryOutlinedIcon,
    path: "/admin/paymentbrand",
  },
  {
    title: "Người Dùng",
    icon: CurrencyExchangeOutlinedIcon,
    path: "/admin/paymentuser",
  },
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
