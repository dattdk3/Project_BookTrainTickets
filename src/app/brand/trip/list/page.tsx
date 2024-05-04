"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import { TripService } from "@/service/trip/tripService";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import {
  TripModel,
  TripStatusEnum,
  TripStatusList,
} from "@/model/trip/TripModel";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useRouter } from "next/navigation";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const TripList = () => {
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);

  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>(
    []
  );
  const [tripList, setTripList] = React.useState<TripModel[]>([]);
  const referenceDataService = new ReferenceDataService();
  const tripService = new TripService();
  const router = useRouter();

  const onPageChanges = (e: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };

  const onActionButtonClick = (action: string, id?: string) => {
    switch (action) {
      case "create":
        router.push("/brand/trip/add");
        break;
      case "view":
        router.push(`/brand/trip/view?id=${id}`);
        break;
      case "edit":
        router.push(`/brand/trip/?id=${id}`);
        break;
      case "delete":
        break;
    }
  };

  React.useEffect(() => {
    referenceDataService
      .getReferenceDataByType("CITY")
      .then((res) => {
        setCityList(res.data ?? []);
      })
      .catch(() => {
        setCityList([]);
      });
    referenceDataService
      .getReferenceDataByType("STATION")
      .then((res) => {
        setStationList(res.data ?? []);
      })
      .catch(() => {
        setStationList([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    tripService
      .getAllBrandTripsAsync("", "", "", "", page - 1, 10)
      .then((res) => {
        setTripList(res.data?.data ?? []);
        setTotalPage(res.data?.totalPage ?? 0);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  return (
    <React.Fragment>
      <Typography
        children="Danh Sách Chuyến"
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
          Tạo chuyến mới
        </Button>
      </Box>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>STT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Chuyến</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bến Xuất Phát</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Thời gian</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phương tiện</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Biển Kiểm Soát</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tài xế</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tripList.map((trip, index) => (
                <TableRow
                  key={trip.tripId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{10 * (page - 1) + index + 1}</TableCell>
                  <TableCell>
                    {
                      cityList.find((x) => x.code == trip.startCity)
                        ?.codeDescription
                    }{" "}
                    -{" "}
                    {
                      cityList.find((x) => x.code == trip.endCity)
                        ?.codeDescription
                    }
                  </TableCell>
                  <TableCell>
                    {
                      stationList.find((x) => x.code == trip.startStation)
                        ?.codeDescription
                    }
                  </TableCell>
                  <TableCell>
                    {trip.startDate}
                    <br />
                    {trip.startTime.slice(0, 5)}{" "}
                  </TableCell>
                  <TableCell>
                    {VehicleType[trip.vehicleType]} -{" "}
                    {trip.vehicle?.vehicleBrand} - {trip.seatAmount} chỗ
                  </TableCell>
                  <TableCell>{trip.vehicle?.licensePlate}</TableCell>
                  <TableCell> {trip.vehicle?.drivers.map(x => x.fullName).join(" - ")}</TableCell>
                  <TableCell>{TripStatusEnum[trip.tripStatus]}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      color="primary"
                      size="small"
                      onClick={() => onActionButtonClick("view", trip.tripId)}
                    >
                      <VisibilitySharpIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="secondary"
                      size="small"
                      onClick={() => onActionButtonClick("edit", trip.tripId)}
                    >
                      <EditSharpIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => onActionButtonClick("delete", trip.tripId)}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack alignItems="center">
          <Pagination
            count={totalPage}
            page={page}
            color="primary"
            onChange={onPageChanges}
          />
        </Stack>
      </Paper>
      <LoadingSpinner isLoading={isLoading} />
    </React.Fragment>
  );
};

export default TripList;
