// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/navigation";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { RoleEnum, UserInfo } from "@/model/auth/AuthModel";
import { AuthService } from "@/service/auth/authService";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const authService = new AuthService();
  useEffect(() => {
    const userInfo = authService.getUserInfo();
    setUserInfo(userInfo);
  }, []);
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const handleLogOut = () =>  {
    authService.logout();
    setUserInfo(null);
    router.push("/auth/login");
  }

  const handleUserInfo = () =>  {
    const pathName = userInfo?.roles.includes(RoleEnum.ADMIN) ? "admin" : "brand"
    router.push(`/${pathName}/userinfo`);
  }

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  return (
    <Fragment>
      <Avatar
        alt={userInfo?.fullName}
        onClick={handleDropdownOpen}
        sx={{ width: 40, height: 40 }}
        src={userInfo?.image ?? ""}
      />
      <Typography
        variant="body2"
        sx={{ fontSize: "1rem", color: "text.disabled", pl: 1 }}
      >
        {userInfo?.fullName}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                alt={userInfo?.fullName}
                src={userInfo?.image ?? ""}
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{userInfo?.fullName}</Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {userInfo?.roles.includes(RoleEnum.ADMIN) ? "Admin" : "Brand"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem
          sx={{ py: 2 }}
          onClick={() => handleUserInfo()}
        >
          <AssignmentIndIcon
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Thông tin tài khoản
        </MenuItem>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem
          sx={{ py: 2 }}
          onClick={() => handleLogOut()}
        >
          <LogoutIcon
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Đăng xuất
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
