"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { DriverService } from "@/service/driver/DriverService";
import { httpPostFile } from "@/service/http/httpService";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const Driver = () => {
  const [fullName, setFullName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const DriverServices = new DriverService();
  const router = useRouter();
  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleIdNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdNumber(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const OnClickSubmit = () => {
    setIsLoading(true);
    console.log(image);
    if (image) {
      httpPostFile<string>(image).then((res) => {
        console.log("🚀 ~ httpPostFile<string> ~ res:", res);
        DriverServices.AddDriverService({
          fullName: fullName,
          dob: dateOfBirth,
          phoneNumber: phoneNumber,
          email: email,
          nationalId: idNumber,
          address: address,
          photoUrl: res.data ?? "",
        }).then((res) => {
          if (res.code == 200) {
            setIsLoading(false);
            router.push("/brand/driver/list");
          } else {
            setIsLoading(false);
          }
        });
      });
    } else {
      DriverServices.AddDriverService({
        fullName: fullName,
        dob: dateOfBirth,
        phoneNumber: phoneNumber,
        email: email,
        nationalId: idNumber,
        address: address,
        photoUrl: "",
      }).then((res) => {
        if (res.code == 200) {
          setIsLoading(false);
          router.push("/brand/driver/list");
        } else {
          setIsLoading(false);
        }
      });
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.item(0));
  };

  const handleRegister = () => {
    setIsLoading(true);
  };

  return (
    <Box
      component="form"
      paddingX={7}
      paddingY={10}
      noValidate
      autoComplete="off"
      bgcolor="white"
      maxWidth="1000px"
      margin="auto"
      borderRadius={4}
      boxShadow={3}
    >
      <Typography
        textAlign="center"
        children="Đăng ký tài xế"
        fontSize={28}
        pb={3}
        fontWeight={600}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            id="fullName"
            label="Họ và Tên"
            fullWidth
            value={fullName}
            onChange={handleFullNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="dateOfBirth"
            label="Ngày tháng năm sinh"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="phoneNumber"
            label="Số điện thoại"
            fullWidth
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="idNumber"
            label="Số CMND"
            fullWidth
            value={idNumber}
            onChange={handleIdNumberChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="address"
            label="Địa chỉ thường trú"
            fullWidth
            value={address}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography children={"Upload Ảnh chân dung"} />
          <input
            accept="image/*"
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={handleImageChange}
          />
          <Grid item>
            {image && (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded image`}
                  width="30%"
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Button
            onClick={OnClickSubmit}
            variant="contained"
            children="Đăng ký"
            size="large"
          />
        </Grid>
      </Grid>
      <LoadingSpinner isLoading={isLoading} />
    </Box>
  );
};

export default Driver;
