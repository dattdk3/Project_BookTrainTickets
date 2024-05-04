"use client";
import "@/assets/css/style.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
const SelectTicket = () => {
  const vehicleList = ["COACH", "CAR", "LIMOUSINE"];
  const searchParams = useSearchParams();
  const [selectedOption1, setSelectedOption1] = React.useState(
    searchParams.get("from") || ""
  );
  const [selectedOption2, setSelectedOption2] = React.useState(
    searchParams.get("to") || ""
  );
  const [selectedVehicle, setSelectedVehicle] = React.useState(
    searchParams.get("vehicle") || ""
  );
  const [checkin, setCheckin] = React.useState(
    searchParams.get("checkin") || dayjs(new Date()).format("MM-DD-YYYY")
  );
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const referenceDataService = new ReferenceDataService();

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

  const handleSelect1Change = (event: SelectChangeEvent) => {
    setSelectedOption1(event.target.value as string);
  };

  const handleSelect2Change = (event: SelectChangeEvent) => {
    setSelectedOption2(event.target.value as string);
  };
  const handleSelectVehicle = (event: SelectChangeEvent) => {
    setSelectedVehicle(event.target.value as string);
  };

  const handleSetCheckin = (val: string) => {
    setCheckin(val);
  };

  return (
    <div>
      <section className="tour-search">
        <div className="container">
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <CircularProgress color="info" />
            </Box>
          ) : (
            <form action="./travel" method="get" className="tour-search-form">
              <div>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "100px",
                  }}
                >
                  <InputLabel id="from-label">Điểm xuất phát*</InputLabel>
                  <Select
                    labelId="go-label"
                    id="from"
                    name="from"
                    value={selectedOption1}
                    onChange={handleSelect1Change}
                    required
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                      border: 0,
                      ":hover:before": {
                        border: "0 !important",
                      },
                      ":focus:before": {
                        border: 0,
                      },
                      "::before": {
                        border: 0,
                      },
                    }}
                  >
                    {cityList.map((x) => (
                      <MenuItem key={x.code} value={x.code}>
                        {x.codeDescription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "100px",
                  }}
                >
                  <InputLabel id="to-label">Điểm đến*</InputLabel>
                  <Select
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                      border: 0,
                      ":hover:before": {
                        border: "0 !important",
                      },
                      ":focus:before": {
                        border: 0,
                      },
                      "::before": {
                        border: 0,
                      },
                    }}
                    labelId="to-label"
                    id="to"
                    name="to"
                    value={selectedOption2}
                    onChange={handleSelect2Change}
                    required
                  >
                    {cityList.map((x) => (
                      <MenuItem key={x.code} value={x.code}>
                        {x.codeDescription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="input-wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      ".MuiOutlinedInput-root": {
                        color: "black",
                        background: "white",
                        borderRadius: 50,
                      },
                    }}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        sx: {
                          ".MuiInputBase-root": {
                            backgroundColor: "transparent !important",
                          },
                          backgroundColor: "white",
                          borderRadius: "100px",
                          border: 0,
                          "*:hover:before": {
                            border: "0 !important",
                            backgroundColor: "transparent",
                          },
                          "*:focus:before": {
                            border: 0,
                            borderRadius: "100px",
                            backgroundColor: "transparent",
                          },
                          "*::before": {
                            border: "0 !important",
                          },
                          "*::after": {
                            border: 0,
                          },
                        },
                      },
                    }}
                    label="Ngày xuất phát*"
                    value={dayjs(checkin, "MM-DD-YYYY")}
                    minDate={dayjs(new Date())}
                    name="checkin"
                    format="MM-DD-YYYY"
                    onChange={(
                      newValue:
                        | string
                        | number
                        | Date
                        | dayjs.Dayjs
                        | null
                        | undefined
                    ) => handleSetCheckin(dayjs(newValue).format("MM-DD-YYYY"))}
                  />
                </LocalizationProvider>
              </div>

              <div>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "100px",
                  }}
                >
                  <InputLabel id="vehicle-label">Phương tiện</InputLabel>
                  <Select
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                      border: 0,
                      ":hover:before": {
                        border: "0 !important",
                      },
                      ":focus:before": {
                        border: 0,
                      },
                      "::before": {
                        border: 0,
                      },
                    }}
                    labelId="vehicle-label"
                    id="vehicle"
                    name="vehicle"
                    value={selectedVehicle}
                    onChange={handleSelectVehicle}
                  >
                    {vehicleList.map((x) => (
                      <MenuItem value={x} key={x}>
                        {VehicleType[x]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <button type="submit" className="btn btn-secondary">
                Search Now
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
export default SelectTicket;
