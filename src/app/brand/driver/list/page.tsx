"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { DriverModel } from "@/model/brand/DriverModel";
import { VehicleStatusEnum } from "@/model/vehicle/VehicleModel";
import { Box, Button, Grid, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import React, { useState } from "react";
import { VehicleService } from "@/service/vehicle/vehicleService";

const DriverList = () => {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [drivers, setDrivers] = React.useState<DriverModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const vehicleService = new VehicleService();
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    setIsLoading(true);
    vehicleService.getBrandDriverListAsync(page - 1, 10)
    .then((res) => {
      setDrivers(res?.data?.data ?? []);
      setTotalPage(res?.data?.totalPage ?? 0);
    })
    .finally(() => {setIsLoading(false)})
  }, [page]);

  const onActionButtonClick = (action: string, id?: string) => {
    switch (action) {
      case "create":
        router.push("/brand/driver/add");
        break;
      case "view":
        router.push(`/brand/driver/view?id=${id}`);
        break;
      case "edit":
        router.push(`/brand/driver/edt?id=${id}`);
        break;
      case "delete":
        break;
    }
  };

  return (
    <React.Fragment>
      <Typography
        children="Danh Sách Tài Xế"
        fontSize={28}
        textAlign="center"
        fontWeight={600}
        mb={2}
        color="#1976d2"
      />
      <Box display="flex" flexDirection="row-reverse" pb={2}>
        <Button
          variant="contained"
          onClick={() => onActionButtonClick("create")}
        >
          Thêm tài xế mới
        </Button>
      </Box>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ và Tên</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Phương tiện phụ trách</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={driver.driverId}
                  >
                    <TableCell>{index + 1 + 10 * (page - 1)}</TableCell>
                    <TableCell>{driver.fullName}</TableCell>
                    <TableCell>{driver.dob}</TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>
                      {VehicleStatusEnum[driver.vehicle?.vehicleStatus]}
                    </TableCell>
                    <TableCell>{driver.vehicle?.licensePlate}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view"
                        color="primary"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("view", driver.driverId)
                        }
                      >
                        <VisibilitySharpIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("edit", driver.driverId)
                        }
                      >
                        <EditSharpIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("delete", driver.driverId)
                        }
                      >
                        <DeleteSharpIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack alignItems="center">
          <Pagination
            count={totalPage}
            page={page}
            color="primary"
            onChange={handleChangePage}
          />
        </Stack>
      </Paper>
      <LoadingSpinner isLoading={isLoading} />
    </React.Fragment>
  );
};

export default DriverList;
