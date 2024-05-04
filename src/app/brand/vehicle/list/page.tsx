"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { VehicleService } from "@/service/vehicle/vehicleService";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  VehicleModel,
  VehicleStatusEnum,
  VehicleType,
} from "@/model/vehicle/VehicleModel";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import { useRouter } from "next/navigation";
import { DriverModel } from "@/model/brand/DriverModel";
import { DriverService } from "@/service/driver/DriverService";
import { HttpStatusEnum } from "@/model/http/httpEnum";

export default function VehicleConfigList() {
  const vehicleService = new VehicleService();
  const driverService = new DriverService();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [vehicleConfigList, setVehicleConfigList] = React.useState<
    VehicleModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = React.useState<string | null>(
    null
  );
  const [drivers, setDrivers] = React.useState<DriverModel[]>([]);

  const referenceDataService = new ReferenceDataService();
  const router = useRouter();
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  React.useEffect(() => {
    referenceDataService
      .getReferenceDataByType("CITY")
      .then((res) => {
        setCityList(res.data ?? []);
      })
      .catch(() => {
        setCityList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    queryVehicleConfig(page);
  }, [page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const queryVehicleConfig = (page: number) => {
    setIsLoading(true);
    vehicleService.getAllVehicleListConfigAsync(page - 1, 10).then((x) => {
      setVehicleConfigList(x.data?.data ?? []);
      setTotalPage(x.data?.totalPage ?? 0);
      setIsLoading(false);
    });
  };

  const handleOpenDialog = (id?: string) => {
    setIsLoading(true);
    driverService
      .getAvailableDriversListAsync()
      .then((res) => {
        if (res.code == HttpStatusEnum.Success.code && res.data) {
          setDrivers(res.data);
        }
      })
      .finally(() => setIsLoading(false));
    if (id) {
      setOpenDialog(true);
      setSelectedVehicle(id);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVehicle(null);
    setSelectedDriver(null);
  };
  const updateDriver = () => {
    setIsLoading(true);
    if (selectedDriver && selectedVehicle) {
      vehicleService
        .addBrandDriverAsync(selectedVehicle, selectedDriver)
        .then((res) => {
          queryVehicleConfig(page);
        })
        .finally(() => {
          setIsLoading(false);
          handleCloseDialog();
        });
    }
  };

  const onActionButtonClick = (action: string, id?: string) => {
    switch (action) {
      case "create":
        router.push("/brand/vehicle/add");
        break;
      case "view":
        router.push(`/brand/vehicle/view?id=${id}`);
        break;
      case "edit":
        router.push(`/brand/vehicle/edit?id=${id}`);
        break;
      case "delete":
        break;
      case "update-driver":
        handleOpenDialog(id);
        break;
    }
  };

  return (
    <React.Fragment>
      <Typography
        children="Danh Sách Phương Tiện"
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
          Tạo phương tiện mới
        </Button>
      </Box>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên phương tiện</TableCell>
                <TableCell>Loại phương tiện</TableCell>
                <TableCell>Biển Kiểm Soát</TableCell>
                <TableCell>Vị Trí Hiện Tại</TableCell>
                <TableCell>Tài Xế</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Chỉnh Sửa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicleConfigList.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.vehicleId}
                  >
                    <TableCell>{index + 1 + 10 * (page - 1)}</TableCell>
                    <TableCell>{row.vehicleBrand}</TableCell>
                    <TableCell>
                      {VehicleType[row.vehicleType]} - {row.seatAmount} chỗ
                    </TableCell>
                    <TableCell>{row.licensePlate}</TableCell>
                    <TableCell>
                      {
                        cityList.find((x) => x.code == row.currentStation)
                          ?.codeDescription
                      }
                    </TableCell>
                    <TableCell>
                      {row.drivers
                        ?.map((driver) => driver.fullName)
                        ?.join(" - ")}
                    </TableCell>
                    <TableCell>
                      {VehicleStatusEnum[row.vehicleStatus]}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view"
                        color="primary"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("view", row.vehicleId)
                        }
                      >
                        <VisibilitySharpIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("edit", row.vehicleId)
                        }
                      >
                        <EditSharpIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="success"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("update-driver", row.vehicleId)
                        }
                      >
                        <PersonAddIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() =>
                          onActionButtonClick("delete", row.vehicleId)
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Cập nhật tài xế cho phương tiện ${
            vehicleConfigList.find((x) => x.vehicleId == selectedVehicle)
              ?.licensePlate
          }`}
        </DialogTitle>
        <DialogContent>
          <Box
            py={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={drivers.find((x) => x.driverId == selectedDriver)?.fullName}
              src={`${baseUrl}/public/images/${
                drivers.find((x) => x.driverId == selectedDriver)?.photoUrl
              }`}
            />
          </Box>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="vehicleType">Chọn tài xế</InputLabel>
            <Select
              labelId="vehicleType"
              id="vehicleTypeSelect"
              value={selectedDriver}
              label="Loại xe"
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              {drivers.map((x) => (
                <MenuItem key={x.driverId} value={x.driverId}>
                  {x.fullName} - {x.phoneNumber} - {x.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={updateDriver} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      <LoadingSpinner isLoading={isLoading} />
    </React.Fragment>
  );
}
