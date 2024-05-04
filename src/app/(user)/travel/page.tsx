"use client";

import SelectTicket from "@/components/ticket/selectTicket";
import { TripService } from "@/service/trip/tripService";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";

import { DataProvider, useDataContext } from "../travel/DataContext";
import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { format } from "date-fns";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import { TripModel } from "@/model/trip/TripModel";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import theme from "@/app/theme";
import ImageCarousel from "./ImageCarousel";
import TripDetail from "./TripDetail";
import TripPolicies from "./TripPolicies";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { AuthService } from "@/service/auth/authService";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
          width="100%"
          children={children}
        ></Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const steps = ["Lựa chọn chỗ ngồi", "Điểm Đón Trả", "Điền thông tin"];

const TripPage = () => {
  const tripService = new TripService();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tripList, setTripList] = React.useState<TripModel[]>();
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [sort, setSort] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [value, setValue] = React.useState(0);
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>(
    []
  );
  const [selectedTrip, setSelectedTrip] = React.useState<TripModel | null>();
  const referenceDataService = new ReferenceDataService();
  const authService = new AuthService();
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const pathName= usePathname();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const getFromStep = (trip: TripModel) => {
    return [
      {
        component: <Step1 trip={trip} stationRefData={stationList} />,
        message: "Điểm Đón Trả",
      },
      {
        component: <Step2 trip={trip} />,
        message: "Lựa chọn chỗ ngồi",
      },
      {
        component: <Step3 />,
        message: "Điền thông tin",
      },
    ];
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
      .finally(() => {
        setIsLoading(false);
      });
    queryTrips(
      page,
      getSortMapping(sort).sortBy,
      getSortMapping(sort).sortOrder
    );
  }, []);

  const handleClickOpen = (trip: TripModel) => {
    if (authService.getUserInfo()) {
      setOpen(true);
      setSelectedTrip(trip);
    } else {
      const returnUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
      router.push(`/auth/login?returnUrl=${returnUrl}`);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setSelectedTrip(null);
  };

  const handleClickOpen1 = (trip: TripModel) => {
    setOpen1(true);
    setSelectedTrip(trip);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setSelectedTrip(null);
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const onSortSelect = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(value.currentTarget.value);
    setSort(newValue);
    queryTrips(
      page,
      getSortMapping(newValue).sortBy,
      getSortMapping(newValue).sortOrder
    );
  };
  const onPageChanges = (e: React.ChangeEvent<any>, value: number) => {
    queryTrips(
      value,
      getSortMapping(sort).sortBy,
      getSortMapping(sort).sortOrder
    );
  };
  const queryTrips = (page: number, sortBy: string, sortOrder: string) => {
    const departFrom = searchParams.get("from") as string;
    const departAt = format(
      new Date(searchParams.get("checkin") as string),
      "MM-dd-yyyy"
    );
    const arriveTo = searchParams.get("to");
    const vehicleType = searchParams.get("vehicle");
    tripService
      .getPublicTripAsync(
        departFrom,
        departAt,
        arriveTo,
        vehicleType,
        page - 1,
        size,
        sortBy,
        sortOrder
      )
      .then((x) => {
        setTripList(x.data?.data);
        setPage((x.data?.page ?? 0) + 1);
        setSize(x.data?.size ?? 0);
        setTotalPage(x.data?.totalPage ?? 0);
        setIsLoading(false);
      });
  };
  const getSortMapping = (sort: number) => {
    switch (sort) {
      case 0:
        return { sortBy: "startTime", sortOrder: "asc" };
      case 1:
        return { sortBy: "startTime", sortOrder: "desc" };
      default:
        return { sortBy: "startTime", sortOrder: "asc" };
    }
  };

  return (
    <div>
      <SelectTicket />
      <Container maxWidth="lg">
        <Grid container gap={1} wrap="nowrap">
          {/* #region filter */}
          <Grid item xs={3} marginY={2}>
            <FormControl
              sx={{
                width: "100%",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                paddingY: 2,
                paddingX: 2,
                position: "sticky",
                // position: "sticky",
                top: 20,
              }}
            >
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ fontWeight: 700 }}
                children="Sắp xếp"
              />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={0}
                name="sort"
                value={sort}
                onChange={(e) => onSortSelect(e)}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Giờ đi sớm nhất"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Giờ đi muộn nhất"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* #endregion */}
          {isLoading ? (
            <Grid
              item
              container
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
            <Grid
              item
              container
              xs={9}
              gap={2}
              wrap="nowrap"
              direction="column"
              paddingX={2}
              marginY={2}
            >
              {tripList?.map((item) => (
                <Grid
                  key={item.tripId}
                  item
                  container
                  xs={12}
                  gap={2}
                  wrap="nowrap"
                  boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  paddingY={2}
                  paddingX={2}
                  alignItems="center"
                  height={300}
                >
                  {/* TODO: Replace this url */}
                  <Grid item xs={3}>
                    <img
                      src={
                        JSON.parse(item.vehicle.photoUrl)[0]
                          ? `${baseUrl}/public/images/${
                              JSON.parse(item.vehicle.photoUrl)[0]
                            }`
                          : "https://vcdn-dulich.vnecdn.net/2022/06/16/World-Travel-1-2359-1655367719.jpg"
                      }
                      width="80%"
                    />
                  </Grid>
                  {/* TODO: Replace info */}
                  <Grid item container direction="column" xs={6} height="100%">
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={700}
                      fontSize={18}
                      children={`${item.brand?.brandName}`}
                      paddingBottom={1}
                    />
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={400}
                      fontSize={14}
                      children={`${VehicleType[item.vehicleType]} - ${
                        item.seatAmount
                      } chỗ`}
                      paddingBottom={1}
                    />
                    <Grid
                      container
                      direction="row"
                      columns={24}
                      wrap="nowrap"
                      gap={1}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        xs={1}
                        wrap="nowrap"
                        alignItems="center"
                      >
                        <Grid
                          item
                          children={
                            <RadioButtonUncheckedIcon
                              sx={{ fontSize: 18, alignSelf: "center" }}
                            />
                          }
                          xs={1}
                        />
                        <Grid
                          borderLeft="4px dotted hsl(0, 0%, 50%)"
                          xs={10}
                          item
                          marginBottom={0.5}
                        />
                        <Grid
                          item
                          children={<LocationOnIcon sx={{ fontSize: 20 }} />}
                          xs={1}
                          alignSelf="center"
                        />
                      </Grid>
                      <Grid item container direction="column" xs={23}>
                        <Grid
                          item
                          children={
                            <Typography
                              color={
                                item.tripStatus == "WAITING"
                                  ? "hsl(0, 0%, 30%)"
                                  : "hsl(0, 0%, 50%)"
                              }
                              fontWeight={700}
                              fontSize={20}
                              children={`${
                                cityList.find((x) => x.code == item.startCity)
                                  ?.codeDescription
                              } -
                        ${item.startTime.slice(0, -3)}`}
                            />
                          }
                          xs={1}
                        />
                        <Grid
                          item
                          children={
                            <Typography
                              color="hsl(0, 0%, 50%)"
                              fontWeight={500}
                              fontSize={14}
                              children={item.routeDuration.slice(0, 5)}
                            />
                          }
                          xs={1}
                        />
                        <Grid
                          item
                          children={
                            <Typography
                              color={
                                item.tripStatus == "DEPARTED"
                                  ? "hsl(0, 0%, 30%)"
                                  : "hsl(0, 0%, 50%)"
                              }
                              fontWeight={700}
                              fontSize={20}
                              children={`${
                                cityList.find((x) => x.code == item.endCity)
                                  ?.codeDescription
                              } -
                              ${item.endTime.slice(0, -3)}`}
                            />
                          }
                          xs={1}
                        />
                      </Grid>
                    </Grid>
                    <Typography />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={3}
                    borderLeft="1px solid hsl(0, 0%, 60%)"
                    height="100%"
                    gap={1}
                    wrap="nowrap"
                    paddingX={2}
                  >
                    <Grid
                      item
                      container
                      xs={4}
                      direction="row"
                      alignItems="center"
                      wrap="nowrap"
                    >
                      <SellIcon
                        sx={{ fontSize: 14, color: "hsl(0, 0%, 30%)" }}
                      />
                      {/* TODO: Update data */}
                      <Typography
                        children={` $ ${
                          (
                            JSON.parse(item.stationsMapping).find(
                              (x: { [x: string]: any }) =>
                                x["station"] == item.startStation
                            ).price as number
                          ).toLocaleString() ?? 0
                        }`}
                        color="#1976d2"
                        fontWeight={700}
                        fontSize={24}
                      />
                    </Grid>
                    {/* TODO: Update data */}
                    <Grid item xs={1}>
                      <Typography
                        children={`Số chỗ còn lại: ${
                          item.seatAmount - (item.tickets as any[]).length ?? 0
                        }`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={400}
                        fontSize={16}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        children={
                          <Typography fontSize={14}>
                            Thông tin chi tiết
                          </Typography>
                        }
                        fullWidth
                        color="primary"
                        variant="text"
                        onClick={() => handleClickOpen1(item)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <React.Fragment>
                        <Button
                          children={
                            <Typography color={theme.palette.common.black}>
                              Đặt chỗ ngay
                            </Typography>
                          }
                          fullWidth
                          sx={{
                            backgroundColor: "rgb(255, 199, 0, 0.7)",
                            ":hover": {
                              backgroundColor: "rgb(255, 199, 0, 1)",
                            },
                          }}
                          variant="contained"
                          onClick={() => handleClickOpen(item)}
                        />
                      </React.Fragment>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item>
                <Stack alignItems="center">
                  <Pagination
                    count={totalPage}
                    page={page}
                    color="primary"
                    onChange={onPageChanges}
                  />
                </Stack>
              </Grid>
            </Grid>
          )}
        </Grid>
        {selectedTrip && (
          <Dialog
            open={open1}
            onClose={handleClose1}
            maxWidth="lg"
            // fullWidth
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0 ,0 ,0 ,50%)",
                },
              },
            }}
            PaperProps={{
              sx: {
                padding: 4,
                boxShadow: "none",
              },
            }}
            // fullWidth
          >
            <Box sx={{ width: "70vw", height: "80vh" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{ width: "100%" }}
                >
                  <Tab sx={{ flex: 1 }} label="Hình ảnh xe" {...a11yProps(0)} />
                  <Tab
                    sx={{ flex: 1 }}
                    label="Thông tin chuyến"
                    {...a11yProps(1)}
                  />
                  <Tab sx={{ flex: 1 }} label="Chính Sách" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <ImageCarousel
                  urls={
                    selectedTrip
                      ? JSON.parse(selectedTrip.vehicle.photoUrl) ?? []
                      : []
                  }
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TripDetail trip={selectedTrip} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <TripPolicies />
              </CustomTabPanel>
            </Box>
          </Dialog>
        )}
        {selectedTrip && (
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0 ,0 ,0 ,50%)",
                },
              },
            }}
            PaperProps={{
              sx: {
                padding: 4,
                boxShadow: "none",
              },
            }}
            fullWidth
          >
            <DataProvider tripDetail={selectedTrip}>
              <Box
                sx={{ width: "100%", height: "80vh" }}
                display="flex"
                flexDirection="column"
              >
                <Stepper activeStep={activeStep}>
                  {getFromStep(selectedTrip).map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption"></Typography>
                      );
                    }

                    return (
                      <Step key={label.message} {...stepProps}>
                        <StepLabel {...labelProps}>{label.message}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Cảm ơn bạn đã cung cấp thông tin
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pt: 2,
                      }}
                    >
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Trở Lại
                      </Button>
                      <a href="/success">
                        <Button>Xem Chi Tiết</Button>
                      </a>
                    </Box>
                  </React.Fragment>
                ) : (
                  <Box flex={1}>
                    {getFromStep(selectedTrip)[activeStep].component}
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Trở lại
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>Tiếp</Button>
                </Box>
              </Box>
            </DataProvider>
          </Dialog>
        )}
      </Container>
    </div>
  );
};

export default TripPage;
