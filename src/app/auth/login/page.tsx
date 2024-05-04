"use client";
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import "./css.css";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent, useEffect, useState } from "react";
import Logo from "@/assets/images/logo-blue.svg";
import LoginIcon from "@mui/icons-material/Login";
import { AuthService } from "@/service/auth/authService";
import { HttpStatusEnum } from "@/model/http/httpEnum";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { LoginRequest } from "../../../model/auth/AuthModel";


const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>();
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginRequest>();
  const authService = new AuthService();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfoPayload = sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo") as string)
        : null;
      if (userInfoPayload) router.push("/");
    }
  }, []);

  const onFormDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      username:
        field === "username"
          ? event.target.value
          : (formData?.username as string),
      password:
        field === "password"
          ? event.target.value
          : (formData?.password as string),
    });
  };
  const onClick = async (event: any) => {
    setLoading(true);
    if (formData) {
      const loginResult = await authService.login(formData);
      if (loginResult.code == HttpStatusEnum.Success.code) {
        sessionStorage.setItem(
          "token",
          loginResult.data?.accessToken as string
        );
        sessionStorage.setItem(
          "expired",
          loginResult.data?.expired?.toISOString() as string
        );
        const returnUrl = searchParams.get("returnUrl");
        if(returnUrl){
          router.push(returnUrl);
        }
        else{
          router.push("/");
        }
      } else {
        setError(`${loginResult.code}: faile`);
        setIsError(true);
      }
    } else {
      setIsError(true);
      setError("Please fill all required field");
    }
    setLoading(false);
  };

  const onSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={onSnackbarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={4}
        margin="5vh 0"
        sx={{ minHeight: "90vh", width: "100%", backgroundColor: "#ffffff" }}
      >
        <Grid item padding={2} justifySelf="flex-start">
          <Image src={Logo} alt="Vexecucre" height={150} />
        </Grid>
        <Grid item padding={2}>
          <Typography
            color="#3b79c9"
            fontSize={30}
            fontWeight={700}
            textAlign="center"
          >
            Chào mừng bạn quay trở lại
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="#333333"
            fontSize={16}
            fontWeight={700}
            textAlign="center"
          >
            Đăng nhập bằng email
          </Typography>
        </Grid>
        <Grid item width="80%" padding={2} paddingTop={0}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Email"
            label="Email"
            type="text"
            value={formData?.username}
            onChange={(e) => onFormDataChange(e, "username")}
          />
        </Grid>
        <Grid item width="80%" padding={2}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Mật khẩu"
            label="Mật khẩu"
            type="password"
            value={formData?.password}
            onChange={(e) => onFormDataChange(e, "password")}
          />
        </Grid>
        <Grid
          item
          container
          width="80%"
          justifyContent="space-between"
          alignItems="center"
          padding="0 16px"
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={checked}
                  // onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label="Ghi nhớ đăng nhập"
              color="#404040"
              sx={{
                "& span": { fontSize: 14 },
                fontSize: "8px !important",
              }}
            />
          </Grid>
          <Grid item>
            <Link
              href="/auth/forgot-password"
              color="#404040"
              style={{ cursor: "pointer", color: "#404040" }}
              underline="hover"
            >
              <Typography fontSize={14} fontWeight={500} color="#3b79c9">
                Quên mật khẩu?
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item width="80%">
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="contained"
            fullWidth
            size="large"
            style={{ margin: "32px 0" }}
            onClick={onClick}
          >
            Đăng nhập
          </LoadingButton>
        </Grid>
        <Grid item>
          <Link
            href="/auth/signup"
            color="#404040"
            style={{ cursor: "pointer", color: "#404040" }}
            underline="hover"
          >
            <Typography fontSize={14} fontWeight={700} color="#404040">
              Chưa có tài khoản? Tạo mới
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
        TransitionComponent={SlideTransition}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle sx={{ fontWeight: 700 }}>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
