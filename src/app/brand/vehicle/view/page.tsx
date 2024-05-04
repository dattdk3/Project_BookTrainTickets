"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { HttpStatus, HttpStatusEnum } from "@/model/http/httpEnum";
import {
  AddVehicleConfigRequest,
  VehicleModel,
  VehicleType,
} from "@/model/vehicle/VehicleModel";
import { httpPostFile } from "@/service/http/httpService";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import { VehicleService } from "@/service/vehicle/vehicleService";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const AddTrip = () => {
  const [formData, setFormData] = React.useState<VehicleModel>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const referenceDataService = new ReferenceDataService();
  const vehicleList = ["COACH", "CAR", "LIMOUSINE"];
  const searchParams = useSearchParams();
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const patchForm = (value: object) => {
    setFormData({ ...formData, ...(value as any) });
  };

  const router = useRouter();
  const vehicleService = new VehicleService();

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
    const id = searchParams.get("id");
    if (id) {
      setIsLoading(true);
      vehicleService
        .getVehicleByIdAsync(id)
        .then((res) => {
          if (res.code == HttpStatusEnum.Success.code && res.data) {
            setFormData(res.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <React.Fragment>
      <Box
        component="form"
        paddingX={7}
        paddingY={15}
        noValidate
        autoComplete="off"
        bgcolor="white"
        maxWidth="1000px"
        margin="auto"
        borderRadius={4}
        boxShadow={3}
      >
        <Typography
          textAlign="center"
          children="Chi tiết phương tiện"
          fontSize={28}
          fontWeight={600}
        />
        <Grid item container width="100%" gap={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Tên phương tiện"
              fullWidth
              disabled
              value={formData?.vehicleBrand}
              onChange={(e) =>
                patchForm({ vehicleBrand: e.currentTarget.value })
              }
            />
          </Grid>
          <Grid item container width="100%" gap={2} wrap="nowrap">
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Số chỗ ngồi"
                fullWidth
                type="number"
                disabled
                value={formData?.seatAmount}
                onChange={(e) =>
                  patchForm({ seatAmount: parseInt(e.currentTarget.value) })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Biển Kiểm Soát"
                fullWidth
                disabled
                type="text"
                value={formData?.licensePlate}
                onChange={(e) =>
                  patchForm({ licensePlate: e.currentTarget.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="vehicleType">Loại phương tiện</InputLabel>
                <Select
                  labelId="vehicleType"
                  id="vehicleTypeSelect"
                  value={formData?.vehicleType ?? ""}
                  disabled
                  label="Loại xe"
                  onChange={(e) => patchForm({ vehicleType: e.target.value })}
                >
                  {vehicleList.map((x) => (
                    <MenuItem key={x} value={x}>
                      {VehicleType[x]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="departFrom">Vị Trí Hiện Tại</InputLabel>
              <Select
                labelId="departFrom"
                id="departFromSelect"
                required
                label="Bến Hiện Tại"
                value={formData?.currentStation ?? ""}
                disabled
                onChange={(e) => patchForm({ currentStation: e.target.value })}
              >
                {cityList.map((x) => (
                  <MenuItem value={x.code} key={x.code}>
                    {x.codeDescription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography children={"Ảnh phương tiện"} />
            <Grid item>
              {formData?.photoUrl &&
                JSON.parse(formData?.photoUrl).map((x: string) => (
                  <div>
                    <img
                      src={`${baseUrl}/public/images/${x}`}
                      alt={`Uploaded imagae`}
                      width="30%"
                    />
                  </div>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <LoadingSpinner isLoading={isLoading} />
      </Box>
    </React.Fragment>
  );
};

export default AddTrip;
