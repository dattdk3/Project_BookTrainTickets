import { TripModel } from "@/model/trip/TripModel";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import {
  Stack,
  Grid,
  Avatar,
  Typography,
  ListItemText,
  ListItem,
  List,
  Divider,
  Card,
} from "@mui/material";

interface TripDetailProps {
  trip: TripModel | undefined;
}
const TripDetail = (props: TripDetailProps) => {
  const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return (
    <Grid item container direction="row" wrap="nowrap" gap={4}>
      <Grid item container direction="column" gap={2}>
        <Grid item>
          <Typography
            children={`Thông tin hãng xe:`}
            color="#1976d2"
            fontWeight={300}
            fontSize={20}
          />
          <List>
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Tên hãng: <b>{props.trip?.brand.brandName}</b>
                    </p>
                  }
                />
              }
            />
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Email: <b>{props.trip?.brand.email}</b>
                    </p>
                  }
                />
              }
            />
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Hotline: <b>{props.trip?.brand.hotline}</b>
                    </p>
                  }
                />
              }
            />
          </List>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography
            children={`Thông tin phương tiện:`}
            color="#1976d2"
            fontWeight={300}
            fontSize={20}
          />
          <List>
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Tên hãng phương tiện:{" "}
                      <b>{props.trip?.vehicle.vehicleBrand}</b>
                    </p>
                  }
                />
              }
            />
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Biển kiểm soát:{" "}
                      <b>{props.trip?.vehicle.licensePlate}</b>
                    </p>
                  }
                />
              }
            />
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Loại phương tiện:{" "}
                      <b>
                        {VehicleType[props.trip?.vehicle.vehicleType ?? ""]}
                      </b>
                    </p>
                  }
                />
              }
            />
            <ListItem
              children={
                <ListItemText
                  primary={
                    <p>
                      - Số chỗ ngồi: <b>{props.trip?.vehicle.seatAmount}</b>
                    </p>
                  }
                />
              }
            />
          </List>
        </Grid>
      </Grid>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item container direction="column" gap={2}>
        <Typography
          children={`Thông tin tài xế:`}
          color="#1976d2"
          fontWeight={300}
          fontSize={20}
        />
        {props.trip?.vehicle.drivers.map((driver) => (
          <>
            <Grid item container direction="row" alignItems="center">
              <Grid item xs={2}>
                <Avatar
                  alt={driver.fullName}
                  src={`${baseUrl}/public/images/${JSON.parse(
                    driver.photoUrl
                  )}`}
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item container direction="column" xs={10}>
                <Typography children={driver.fullName} />
                <Typography children={driver.dob} />
                <Typography children={driver.email} />
                <Typography children={driver.phoneNumber} />
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </>
        ))}
      </Grid>
    </Grid>
  );
};

export default TripDetail;
