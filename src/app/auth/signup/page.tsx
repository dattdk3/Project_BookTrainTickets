"use client";
import Image from "next/image";
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "./css.css";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent, useState } from "react";
import logo from "@/assets/images/logo-blue.svg";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Logo from "@/assets/images/logo-blue.svg";
import { HttpStatusEnum } from "@/model/http/httpEnum";
import { AuthService } from "@/service/auth/authService";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter } from "next/navigation";
import { SignupRequest } from "@/model/auth/AuthModel";

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignupRequest>();
  const [error, setError] = useState<string | null>();
  const [isError, setIsError] = useState<boolean>(false);
  const authService = new AuthService();
  const router = useRouter();

  const onClick = async (event: any) => {
    if (formData) {
      const loginResult = await authService.signup(formData);
      if (loginResult.code == HttpStatusEnum.Success.code) {
        sessionStorage.setItem(
          "token",
          loginResult.data?.accessToken as string
        );
        sessionStorage.setItem(
          "expired",
          loginResult.data?.expired?.toISOString() as string
        );
        router.push("/");
      } else {
        setError(`${loginResult.code}: ${loginResult.message}`);
        setIsError(true);
      }
    } else {
      setIsError(true);
      setError("Please fill all required field");
    }
    setLoading(false);
  };

  const onFormDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      fullName:
        field === "fullName"
          ? event.target.value
          : (formData?.fullName as string),
      password:
        field === "password"
          ? event.target.value
          : (formData?.password as string),
      email:
        field === "email" ? event.target.value : (formData?.email as string),
      phone:
        field === "phone" ? event.target.value : (formData?.phone as string),
    });
  };

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
            Tạo tài khoản mới
          </Typography>
        </Grid>
        <Grid item width="80%" padding={2} paddingTop={0}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Họ và Tên"
            label="Họ và Tên"
            type="text"
            onChange={(e) => onFormDataChange(e, "fullName")}
          />
        </Grid>
        <Grid item width="80%" padding={2} paddingTop={0}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Số điện thoại"
            label="Số điện thoại"
            type="tel"
            onChange={(e) => onFormDataChange(e, "phone")}
          />
        </Grid>
        <Grid item width="80%" padding={2} paddingTop={0}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Email"
            label="Email"
            type="email"
            onChange={(e) => onFormDataChange(e, "email")}
          />
        </Grid>
        <Grid item width="80%" padding={2} pt={0}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Mật khẩu"
            label="Mật khẩu"
            type="password"
            onChange={(e) => onFormDataChange(e, "password")}
          />
        </Grid>
        <Grid
          item
          container
          width="80%"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
          paddingTop={0}
        >
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
            label="Tôi đã đọc và đồng ý với điều khoản"
            color="#404040"
            sx={{
              "& span": { fontSize: 14 },
              fontSize: "8px !important",
            }}
          />
        </Grid>
        <Grid item width="80%" padding={2} py={0}>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<PersonAddIcon />}
            variant="contained"
            fullWidth
            size="large"
            style={{ margin: "16px 0" }}
            onClick={onClick}
          >
            Đăng ký
          </LoadingButton>
        </Grid>
        <Grid item pb={2}>
          <Link
            href="/auth/login"
            color="#404040"
            style={{ cursor: "pointer", color: "#404040" }}
            underline="hover"
          >
            <Typography fontSize={14} fontWeight={700} color="#404040">
              Already have an account? Login to continue
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
