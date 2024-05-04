"use client"
import { UserInfo } from "@/model/auth/AuthModel";
import "./css.css";
import { Avatar, Grid } from "@mui/material";
import React from "react";
import { TicketService } from "@/service/ticket/ticketService";
import { UserService } from "@/service/user/userService";
import { HttpStatus, HttpStatusEnum } from "@/model/http/httpEnum";

interface UserInfoProps {
  activeContent: string;
  userInfo: UserInfo | null;
}

const UserInfoComponent = (props: UserInfoProps) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<UserModel>({
    email: props.userInfo?.email ?? "",
    fullName: props.userInfo?.fullName ?? "",
    phoneNumber: props.userInfo?.phoneNumber ?? "",
    userId: props.userInfo?.userId ?? ""
  });
  const userService = new UserService();
  function updateAccountInfo(): void {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      //implement api
      if (userInfo != null)
        userService
          .updateUserInfo(
            userInfo.fullName,
            userInfo.email,
            userInfo.phoneNumber
          )
          .then((res) => {
            if (res.code == HttpStatusEnum.Success.code && res.data) {
              setUserInfo(res.data);
            }
          });
      setIsEdit(false);
    }
  }
  console.log(userInfo)
  console.log(props.userInfo)

  const patchForm = (value: object) => {
    if (userInfo) setUserInfo({ ...userInfo, ...value });

  };
  return (
    <div
      className={`content ${
        props.activeContent === "thongTinTaiKhoan" ? "active" : ""
      }`}
      id="thongTinTaiKhoan"
    >
      <h2 style={{ textAlign: "center", paddingBottom: 24 }}>
        Thông tin tài khoản
      </h2>
      <div className="form-group">
        {props.userInfo ? (
          <>
            <label htmlFor="fullname">Họ và tên:</label>
            <input
              type="text"
              id="fullname"
              disabled={!isEdit}
              onChange={(e) => patchForm({ fullName: e.target.value })}
              defaultValue={`${props.userInfo?.fullName}`}
            />
          </>
        ) : (
          <p>no data</p>
        )}
      </div>
      <div className="form-group">
        {props.userInfo ? (
          <>
            <label htmlFor="fullname">Số Điện Thoại:</label>
            <input
              type="text"
              id="phone"
              disabled={!isEdit}
              onChange={(e) => patchForm({ phoneNumber: e.target.value})}
              defaultValue={`${props.userInfo?.phoneNumber}`}
            />
          </>
        ) : (
          <p>no data</p>
        )}
      </div>
      <div className="form-group">
        {props.userInfo ? (
          <>
            <label htmlFor="fullname">Email:</label>
            <input
              type="email"
              id="email"
              disabled={!isEdit}
              onChange={(e) => patchForm({ email: e.target.value })}
              defaultValue={`${props.userInfo?.email}`}
            />
          </>
        ) : (
          <p>no data</p>
        )}
      </div>
      {/* <div className="form-group">
        <button onClick={() => updateAccountInfo()}>
          {isEdit ? "Lưu" : "Cập nhật thông tin"}
        </button>
      </div> */}
    </div>
  );
};

export default UserInfoComponent;
