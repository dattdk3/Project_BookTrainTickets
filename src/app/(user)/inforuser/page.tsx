"use client";

import React, { useEffect, useState } from "react";
import "./css.css";
import { useRouter, useSearchParams } from "next/navigation";
import { UserInfo } from "../../../model/auth/AuthModel";
import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TripService } from "@/service/trip/tripService";
import { Alert, Button, Container, Grid } from "@mui/material";
import UserInfoComponent from "./UserInfoComponent";
import MyTickets from "./MyTickets";
import ChangePassword from "./ChangePassword";






const AccountPage = () => {
  const tripService = new TripService();
  const [tripList, setTripList] = React.useState<any>(tripService.getAllTrip());
  const searchParams = useSearchParams();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfoPayload = sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo") as string)
        : null;
      setUserInfo(userInfoPayload);
    } else {
      setUserInfo(null);
    }
    console.log("aaa");
  }, []);

  const [activeContent, setActiveContent] =
    useState<string>("thongTinTaiKhoan");

  const showContent = (id: string) => {
    setActiveContent(id);
  };


  return (
    <Box>
      <div className="container-1">
        <div className="left-panel">
          <h2>Thông Tin Tài Khoản</h2>
          <div
            className="menu-item"
            onClick={() => showContent("thongTinTaiKhoan")}
          >
            Thông tin tài khoản
          </div>

          <div className="menu-item" onClick={() => showContent("veCuaToi")}>
            Vé của tôi
          </div>

          {/* <div className="menu-item" onClick={() => showContent("quanLiThe")}>
            Đổi mật khẩu
          </div> */}
        </div>

        <div className="right-panel">
          <div className="content-wrapper">
            <UserInfoComponent activeContent={activeContent} userInfo={userInfo} />
            <MyTickets activeContent={activeContent} tripList={tripList}/>
            <ChangePassword activeContent={activeContent}/>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AccountPage;
