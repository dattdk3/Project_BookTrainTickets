import {
  Alert,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDataContext } from "./DataContext";
import { ChangeEvent } from "react";
import { TripModel } from "@/model/trip/TripModel";
import React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
interface StepProps {
  trip: TripModel;
  stationRefData: ReferenceDataModel[];
}
interface StationMappingObject {
  station: string;
  price: number;
  from: string;
}
const Step1 = (props: StepProps) => {
  const { data, updateData } = useDataContext();
  const handleSelectPickupPoint = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    updateData({
      ...data,
      pickupPoint: value,
      price: stationsMapping.find((x) => x.station == value)?.price,
    });
  };
  const handleSelectDropoffPoint = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    updateData({ ...data, dropoffPoint: value });
  };
  const stationsMapping = JSON.parse(
    props.trip.stationsMapping
  ) as StationMappingObject[];

  return (
    <div>
      <Container maxWidth="lg">
        <Grid paddingX={2} marginY={2}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            <Typography fontSize={18}>
              An tâm được đón đúng nơi, trả đúng chỗ đã chọn và dễ dàng thay đổi
              khi cần.
            </Typography>
          </Alert>
        </Grid>
        <Grid container gap={1} wrap="nowrap">
          <Grid
            item
            container
            xs={15}
            gap={2}
            wrap="nowrap"
            direction="column"
            paddingX={2}
            marginY={2}
          >
            <Grid
              item
              container
              xs={12}
              gap={2}
              wrap="nowrap"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              paddingY={2}
              paddingX={2}
              alignItems="center"
            >
              <Grid item container direction="column" xs={6} height="100%">
                <Typography
                  textAlign={"center"}
                  children={`Điểm đón`}
                  fontSize={20}
                />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={
                      stationsMapping.filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.startCity
                      )[0]?.["station"]
                    }
                    name="radio-buttons-group"
                    value={
                      data["pickupPoint"] ??
                      stationsMapping.filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.startCity
                      )[0]?.["station"]
                    }
                    onChange={handleSelectPickupPoint}
                  >
                    {stationsMapping
                      .filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.startCity
                      )
                      .map((x: { [key: string]: any }) => (
                        <FormControlLabel
                          key={x["station"]}
                          value={x["station"]}
                          control={<Radio />}
                          sx={{ py: 2 }}
                          label={
                            <React.Fragment>
                              <Typography fontWeight={500} fontSize={20}>
                                {
                                  props.stationRefData.find(
                                    (y) => y.code == x["station"]
                                  )?.codeDescription
                                }
                              </Typography>
                              <Typography>
                                $ {x["price"].toLocaleString()}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={6}
                borderLeft="1px solid hsl(0, 0%, 60%)"
                height="100%"
                paddingX={2}
              >
                <Typography
                  textAlign={"center"}
                  children={`Điểm Trả`}
                  fontSize={20}
                />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={
                      stationsMapping.filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.endCity
                      )[0]?.["station"] 
                    }
                    name="radio-buttons-group"
                    value={
                      data["dropoffPoint"] ??
                      stationsMapping.filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.endCity
                      )[0]?.["station"]
                    }
                    onChange={handleSelectDropoffPoint}
                  >
                    {stationsMapping
                      .filter(
                        (s: { [key: string]: any }) =>
                          s["from"] == props.trip.endCity
                      )
                      .map((x: { [key: string]: any }) => (
                        <FormControlLabel
                          key={x["station"]}
                          value={x["station"]}
                          control={<Radio />}
                          sx={{ py: 2 }}
                          label={
                            <React.Fragment>
                              <Typography fontWeight={500} fontSize={20}>
                                {
                                  props.stationRefData.find(
                                    (y) => y.code == x["station"]
                                  )?.codeDescription
                                }
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Step1;
