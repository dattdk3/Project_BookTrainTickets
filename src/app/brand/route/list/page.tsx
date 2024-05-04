"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
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
import { RouteModel } from "@/model/trip/TripModel";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useRouter } from "next/navigation";

const RouteList = () => {
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);

  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>(
    []
  );
  const [routeList, setRouteList] = React.useState<RouteModel[]>([]);
  const referenceDataService = new ReferenceDataService();
  const tripService = new TripService();
  const router = useRouter();

  const onPageChanges = (e: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };

  const onActionButtonClick = (action: string, id?: string) => {
    switch (action) {
      case "create":
        router.push("/brand/route/add");
        break;
      case "view":
        router.push(`/brand/route/view?id=${id}`);
        break;
      case "edit":
        router.push(`/brand/route/edit?id=${id}`);
        break;
      case "delete":
        setIsLoading(true);
        tripService.deleteRoute(id ?? "").then((res) => {
          tripService
            .getAllBrandRoutesAsync("", "", "", "", page - 1, 10)
            .then((res) => {
              setRouteList(res.data?.data ?? []);
              setTotalPage(res.data?.totalPage ?? 0);
            });
        })
        .finally(() => setIsLoading(false));
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
    tripService
      .getAllBrandRoutesAsync("", "", "", "", page - 1, 10)
      .then((res) => {
        setRouteList(res.data?.data ?? []);
        setTotalPage(res.data?.totalPage ?? 0);
      });
  }, [page]);

  return (
    <React.Fragment>
      <Typography
        children="Danh Sách Lộ Trình"
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
          Tạo lộ trình mới
        </Button>
      </Box>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>STT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Chuyến</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bến</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Thời gian di chuyển
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phương tiện</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Số Chỗ</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routeList.map((route, index) => (
                <TableRow
                  key={route.routeId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{10 * (page - 1) + index + 1}</TableCell>
                  <TableCell>
                    {
                      cityList.find((x) => x.code == route.startCity)
                        ?.codeDescription
                    }{" "}
                    -{" "}
                    {
                      cityList.find((x) => x.code == route.endCity)
                        ?.codeDescription
                    }
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {JSON.parse(route.stationsMapping)
                      .filter(
                        (y: StationMappingObject) => y.from == route.startCity
                      )
                      .map(
                        (y: StationMappingObject) =>
                          stationList.find((x) => x.code == y.station)
                            ?.codeDescription
                      )
                      .concat(
                        JSON.parse(route.stationsMapping)
                          .filter(
                            (y: StationMappingObject) => y.from == route.endCity
                          )
                          .map(
                            (y: StationMappingObject) =>
                              stationList.find((x) => x.code == y.station)
                                ?.codeDescription
                          )
                          .reverse()
                      )
                      .join(" - ")}
                  </TableCell>
                  <TableCell>{route.routeDuration}</TableCell>
                  <TableCell>{VehicleType[route.vehicleType]}</TableCell>
                  <TableCell>{route.seatAmount}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      color="primary"
                      size="small"
                      onClick={() => onActionButtonClick("view", route.routeId)}
                    >
                      <VisibilitySharpIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="secondary"
                      size="small"
                      onClick={() => onActionButtonClick("edit", route.routeId)}
                    >
                      <EditSharpIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() =>
                        onActionButtonClick("delete", route.routeId)
                      }
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

export default RouteList;
