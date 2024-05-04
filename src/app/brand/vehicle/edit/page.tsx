"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { HttpStatus, HttpStatusEnum } from "@/model/http/httpEnum";
import {
  AddVehicleConfigRequest,
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
  const [formData, setFormData] = React.useState<AddVehicleConfigRequest>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cityList, setCityList] = React.useState<ReferenceDataModel[]>([]);
  const referenceDataService = new ReferenceDataService();
  const vehicleList = ["COACH", "CAR", "LIMOUSINE"];
  const searchParams = useSearchParams();
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const patchForm = (value: object) => {
    setFormData({ ...formData, ...value });
    console.log("🚀 ~ patchForm ~ formData:", formData);
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

  const handleSubmit = () => {
    if (formData) {
      setIsLoading(true);
      handleUploadImages().then((uploadRes) => {
        const request = { ...formData, photoUrl: JSON.stringify(uploadRes) };
        vehicleService.addVehicleConfig(request).then((res) => {
          if (res.code == 200) {
            setIsLoading(false);
            router.push("/brand/vehicle/list");
          } else {
            setIsLoading(false);
          }
        });
      });
    }
  };
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      setImages(selectedImages);
    }
  };
  const handleUploadImages = async () => {
    let imageUrls: string[] = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const resUrl = await httpPostFile<string>(image);
        if (resUrl.code == HttpStatusEnum.Success.code && resUrl.data)
          imageUrls = imageUrls.concat(resUrl.data);
      }
    }
    return imageUrls;
  };
  return (
    <>
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
          children="Cập nhật phương tiện"
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
              value={formData?.vehicleBrand ?? ""}
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
                value={formData?.seatAmount ?? ""}
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
                type="text"
                value={formData?.licensePlate ?? ""}
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
              <InputLabel id="departFrom">Bến Hiện Tại</InputLabel>
              <Select
                labelId="departFrom"
                id="departFromSelect"
                required
                label="Bến Hiện Tại"
                value={formData?.currentStation ?? ""}
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
          <Grid item container alignItems="flex-end" direction="row">
            <Grid item flex={1} />
            <Button
              disabled={!formData}
              onClick={handleSubmit}
              variant="contained"
              children="Cập nhật phương tiện"
              size="large"
            />
          </Grid>
        </Grid>
        <LoadingSpinner isLoading={isLoading} />
      </Box>
    </>
  );
};

export default AddTrip;
