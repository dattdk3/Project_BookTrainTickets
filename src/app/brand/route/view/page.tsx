"use client";

import { HttpStatusEnum } from "@/model/http/httpEnum";
import { AddTripConfigRequest, RouteModel } from "@/model/trip/TripModel";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import { TripService } from "@/service/trip/tripService";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Switch,
  FormLabel,
  IconButton,
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  SlideProps,
} from "@mui/material";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface StationMappingItem {
  station: string;
  from: string;
  price: number;
}
const AddTrip = () => {
  const tripService = new TripService();
  const referenceDataService = new ReferenceDataService();
  const router = useRouter();
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>(
    []
  );
  const [startStationList, setStartStationList] = React.useState<
    ReferenceDataModel[]
  >([]);
  const [endStationList, setEndStationList] = React.useState<
    ReferenceDataModel[]
  >([]);
  const [formData, setFormData] = React.useState<
    RouteModel | null | undefined
  >();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const [isError, setIsError] = useState<boolean>(false);
  const vehicleList = ["COACH", "CAR", "LIMOUSINE"];
  const params = useSearchParams();
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
    let stations: ReferenceDataModel[] = [];
    referenceDataService
      .getReferenceDataByType("STATION")
      .then((res) => {
        setStationList(res.data ?? []);
        stations = res.data ?? [];
      })
      .catch(() => {
        setStationList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    const id = params.get("id");
    if (id) {
      tripService.getRouteById(id).then((res) => {
        if (res.code == HttpStatusEnum.Success.code && res.data) {
          setFormData(res.data);
          setStartStationList(
            stations.filter(
              (x) => JSON.parse(x.parameterData)["City"] == res.data?.startCity
            )
          );
          setEndStationList(
            stations.filter(
              (x) =>
                (JSON.parse(x.parameterData)["City"] as string) ==
                res.data?.endCity
            )
          );
          setInputStartList(
            JSON.parse(res.data.stationsMapping).filter(
              (x: { [key: string]: any }) => x["from"] == res.data?.startCity
            )
          );
          setInputEndList(
            JSON.parse(res.data.stationsMapping).filter(
              (x: { [key: string]: any }) => x["from"] == res.data?.endCity
            )
          );
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    if (formData) {
      setIsLoading(true);
      let body = formData;
      body.stationsMapping = JSON.stringify(formData.stationsMapping);
      body.startStation = inputStartList[0].station;
      body.endStation = inputEndList[0].station;
      tripService
        .updateRoute(body, formData.routeId)
        .then((x) => {
          if (x.code == HttpStatusEnum.Success.code) {
            router.push("/brand/trip/list");
          } else {
            setIsError(true);
            setError(x.message);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const [inputStartList, setInputStartList] = useState<StationMappingItem[]>([
    { station: "", from: "", price: 0 },
  ]);
  const [inputEndList, setInputEndList] = useState<StationMappingItem[]>([
    { station: "", from: "", price: 0 },
  ]);

  // handle input change
  const handleInputChange = (data: object, index: number) => {
    inputStartList[index] = { ...inputStartList[index], ...data };
    setInputStartList([...inputStartList]);
    patchForm({ stationsMapping: [...inputStartList, ...inputEndList] });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    inputStartList.splice(index, 1);
    setInputStartList([...inputStartList]);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputStartList([
      ...inputStartList,
      { station: "", from: formData?.startCity ?? "", price: 0 },
    ]);
  };

  // handle input change
  const handleInputChange2 = (data: object, index: number) => {
    inputEndList[index] = { ...inputEndList[index], ...data };
    setInputEndList([...inputEndList]);
    patchForm({ stationsMapping: [...inputStartList, ...inputEndList] });
  };

  // handle click event of the Remove button
  const handleRemoveClick2 = (index: number) => {
    inputEndList.splice(index, 1);
    setInputEndList([...inputEndList]);
  };

  // handle click event of the Add button
  const handleAddClick2 = () => {
    setInputEndList([
      ...inputEndList,
      { station: "", from: formData?.endCity ?? "", price: 0 },
    ]);
  };

  const onSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
    setError(null);
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }
  const patchForm = (value: object) => {
    setFormData({ ...formData, ...(value as any) });
    if (Object.keys(value).includes("startCity")) {
      const city = Object.values(value)[0];
      const newArr = stationList.filter(
        (x) => (JSON.parse(x.parameterData)["City"] as string) == city
      );
      setStartStationList(newArr);
    }
    if (Object.keys(value).includes("endCity")) {
      const city = Object.values(value)[0];
      const newArr = stationList.filter(
        (x) => (JSON.parse(x.parameterData)["City"] as string) == city
      );
      setEndStationList(newArr);
    }
    console.log("🚀 ~ patchForm ~ formData:", formData);
  };

  const validateForm = (key: string) => {
    switch (key) {
      case "startCity":
        return false;
      case "startStation":
        return false;
      case "endCity":
        return false;
      case "endStation":
        return false;
      case "routeDuration":
        return false;
      case "earliestStartTimeFromStart":
        return false;
      case "latestStartTimeFromStart":
        return false;
      case "earliestStartTimeFromEnd":
        return false;
      case "latestStartTimeFromEnd":
        return false;
      case "gapDurationBetweenTrip":
        return false;
      case "gapDurationBetweenRoute":
        return false;
      case "stationsMapping":
        return false;
      case "vehicleType":
        return false;
      case "seatAmount":
        return false;
    }
  };

  return (
    <>
      <Box
        component="form"
        paddingX={7}
        paddingY={3}
        noValidate
        autoComplete="off"
        bgcolor="white"
        maxWidth="1000px"
        margin="auto"
        borderRadius={4}
        boxShadow={3}
      >
        <Typography
          children="Chi tiết lộ trình"
          fontSize={28}
          textAlign="center"
          fontWeight={600}
        />
        {isLoading ? (
          <Grid
            container
            item
            xs={9}
            gap={2}
            wrap="nowrap"
            direction="column"
            alignItems="center"
            justifyContent="center"
            paddingX={2}
            marginY={2}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Grid container paddingY={3} spacing={3}>
            <Grid item container width="100%" gap={2} wrap="nowrap">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="vehicleType">Loại phương tiện</InputLabel>
                <Select
                  labelId="vehicleType"
                  id="vehicleTypeSelect"
                  required
                  disabled
                  value={formData?.vehicleType ?? "COACH"}
                  label="Loại phương tiện"
                  onChange={(e) => patchForm({ vehicleType: e.target.value })}
                >
                  {vehicleList.map((x) => (
                    <MenuItem value={x} key={x}>
                      {VehicleType[x]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                id="outlined-required"
                label="Số chỗ ngồi"
                fullWidth
                type="number"
                disabled
                value={formData?.seatAmount}
                onChange={(e) =>
                  patchForm({ seatAmount: parseInt(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={6} wrap="nowrap" direction="column">
              <Typography textAlign="center">Chuyến A</Typography>
              <Grid item xs={2} py={1}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="departFrom">Thành Phố</InputLabel>
                  <Select
                    labelId="departFrom"
                    id="departFromSelect"
                    required
                    disabled
                    value={formData?.startCity ?? ""}
                    label="Điểm xuất phát"
                    onChange={(e) => patchForm({ startCity: e.target.value })}
                  >
                    {cityList.map((x) => (
                      <MenuItem value={x.code} key={x.code}>
                        {x.codeDescription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={6} gap={1} py={1} wrap="nowrap">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={6}>
                    <TimeField
                      disabled
                      label="Giờ Chuyến Đầu"
                      value={dayjs(
                        formData?.earliestStartTimeFromStart,
                        "HH:mm:ss"
                      )}
                      format="HH:mm:ss"
                      fullWidth
                      onChange={(newValue) =>
                        patchForm({
                          earliestStartTimeFromStart:
                            dayjs(newValue).format("HH:mm:ss"),
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimeField
                      disabled
                      label="Giờ Chuyến Cuối"
                      value={dayjs(
                        formData?.latestStartTimeFromStart,
                        "HH:mm:ss"
                      )}
                      fullWidth
                      onChange={(newValue) =>
                        patchForm({
                          latestStartTimeFromStart:
                            dayjs(newValue).format("HH:mm:ss"),
                        })
                      }
                      format="HH:mm:ss"
                    />
                  </Grid>
                </LocalizationProvider>
              </Grid>
              {inputStartList.map((x, i) => {
                return (
                  <Grid item container xs={6} py={1} gap={1} wrap="nowrap">
                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="departFrom">Bến</InputLabel>
                        <Select
                          labelId="departFrom"
                          id="departFromSelect"
                          required
                          value={x.station}
                          label="Bến"
                          fullWidth
                          disabled
                          onChange={(e) =>
                            handleInputChange(
                              {
                                station: e.target.value,
                                from: formData?.startCity,
                              },
                              i
                            )
                          }
                        >
                          {startStationList.map((x) => (
                            <MenuItem value={x.code} key={x.code}>
                              {x.codeDescription}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        className="ml10"
                        name="lastName"
                        placeholder="Giá"
                        value={x.price}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        disabled
                        onChange={(e) =>
                          handleInputChange(
                            { price: parseInt(e.target.value) },
                            i
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item container xs={1} wrap="nowrap">
                      {inputStartList.length !== 1 && (
                        <Grid
                          item
                          children={
                            <IconButton
                              disabled={
                                formData?.startCity == "" ||
                                formData?.startCity == undefined
                              }
                              onClick={() => handleRemoveClick(i)}
                              size="large"
                              children={<Remove />}
                            />
                          }
                        />
                      )}
                      {inputStartList.length - 1 === i && (
                        <Grid
                          item
                          children={
                            <IconButton
                              disabled={
                                formData?.startCity == "" ||
                                formData?.startCity == undefined
                              }
                              onClick={handleAddClick}
                              size="large"
                              children={<Add />}
                            />
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={6} wrap="nowrap" gap={2} direction="column">
              <Typography textAlign="center">Chuyến B</Typography>
              <Grid item xs={2} py={1}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="departFrom">Thành Phố</InputLabel>
                  <Select
                    labelId="departFrom"
                    id="departFromSelect"
                    required
                    value={formData?.endCity ?? ""}
                    label="Điểm xuất phát"
                    disabled
                    onChange={(e) => patchForm({ endCity: e.target.value })}
                  >
                    {cityList.map((x) => (
                      <MenuItem value={x.code} key={x.code}>
                        {x.codeDescription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={6} gap={1} py={1} wrap="nowrap">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={6}>
                    <TimeField
                      label="Giờ Chuyến Đầu"
                      disabled
                      value={dayjs(
                        formData?.earliestStartTimeFromEnd,
                        "HH:mm:ss"
                      )}
                      format="HH:mm:ss"
                      onChange={(newValue) =>
                        patchForm({
                          earliestStartTimeFromEnd:
                            dayjs(newValue).format("HH:mm:ss"),
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimeField
                      label="Giờ Chuyến Cuối"
                      disabled
                      value={dayjs(
                        formData?.latestStartTimeFromEnd,
                        "HH:mm:ss"
                      )}
                      onChange={(newValue) =>
                        patchForm({
                          latestStartTimeFromEnd:
                            dayjs(newValue).format("HH:mm:ss"),
                        })
                      }
                      format="HH:mm:ss"
                      fullWidth
                    />
                  </Grid>
                </LocalizationProvider>
              </Grid>
              {inputEndList.map((x, i) => {
                return (
                  <Grid item container xs={6} py={1} gap={1} wrap="nowrap">
                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="startStation">Bến</InputLabel>
                        <Select
                          labelId="startStation"
                          id="startStationSelect"
                          required
                          value={x.station}
                          label="Bến"
                          fullWidth
                          disabled
                          onChange={(e) =>
                            handleInputChange2(
                              {
                                station: e.target.value,
                                from: formData?.endCity,
                              },
                              i
                            )
                          }
                        >
                          {endStationList.map((x) => (
                            <MenuItem value={x.code} key={x.code}>
                              {x.codeDescription}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="lastName2"
                        placeholder="Giá"
                        value={x.price}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        fullWidth
                        disabled
                        onChange={(e) =>
                          handleInputChange2(
                            { price: parseInt(e.target.value) },
                            i
                          )
                        }
                      />
                    </Grid>
                    <Grid item container xs={1} wrap="nowrap">
                      {inputEndList.length !== 1 && (
                        <Grid
                          item
                          children={
                            <IconButton
                              onClick={() => handleRemoveClick2(i)}
                              disabled={
                                formData?.endCity == "" ||
                                formData?.endCity == undefined
                              }
                              size="large"
                              children={<Remove />}
                            />
                          }
                        />
                      )}
                      {inputEndList.length - 1 === i && (
                        <Grid
                          item
                          children={
                            <IconButton
                              onClick={handleAddClick2}
                              disabled={
                                formData?.endCity == "" ||
                                formData?.endCity == undefined
                              }
                              size="large"
                              children={<Add />}
                            />
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} container gap={2} py={1} wrap="nowrap">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={4}>
                  <TimeField
                    disabled
                    label="Thời Gian Di Chuyển Của Một Chuyến"
                    value={dayjs(formData?.routeDuration, "HH:mm:ss")}
                    onChange={(newValue) =>
                      patchForm({
                        routeDuration: dayjs(newValue).format("HH:mm:ss"),
                      })
                    }
                    format="HH:mm:ss"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TimeField
                    disabled
                    label="Thời Gian Nghỉ Trước Khi Quay Về"
                    value={dayjs(formData?.gapDurationBetweenTrip, "HH:mm:ss")}
                    onChange={(newValue) =>
                      patchForm({
                        gapDurationBetweenTrip:
                          dayjs(newValue).format("HH:mm:ss"),
                      })
                    }
                    format="HH:mm:ss"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TimeField
                    disabled
                    label="Thời Gian Lặp Lại Giữa Hai Chuyến"
                    value={dayjs(formData?.gapDurationBetweenRoute, "HH:mm:ss")}
                    onChange={(newValue) =>
                      patchForm({
                        gapDurationBetweenRoute:
                          dayjs(newValue).format("HH:mm:ss"),
                      })
                    }
                    format="HH:mm:ss"
                    fullWidth
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={onSnackbarClose}
          TransitionComponent={SlideTransition}
        >
          <Alert severity="error" variant="filled">
            <AlertTitle sx={{ fontWeight: 700 }}>Lỗi xảy ra</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default AddTrip;
