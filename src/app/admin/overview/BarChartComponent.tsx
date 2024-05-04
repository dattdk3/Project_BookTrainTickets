"use client";
// ** MUI Imports
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import { BarChart } from "@mui/x-charts";
import { Card, Grid, Typography } from "@mui/material";
import theme from "@/app/theme";
// ** Third Party Imports

export interface BarChartProps {
  title: string;
  datas: { [key: string]: number }[];
  fields: {
    fieldLabel: string;
    fieldName: string;
  }[];
  labels: string[];
}
const BarChartComponent = (props: BarChartProps) => {
  return (
    <Card>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.common.white,
          borderRadius: 2,
        }}
      >
        <Grid item pt={4} mb={-2}>
          <Typography fontSize={24} fontWeight={600} color={theme.palette.primary.main}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <BarChart
            slotProps={{
              legend: {
                itemGap: 48,
                labelStyle: { fontSize: 14 },
                position: { vertical: "bottom", horizontal: "middle" },
              },
            }}
            series={props.fields.map((field) => {
              return {
                data: props.datas.map((x) => x[field.fieldName]),
                label: field.fieldLabel,
                id: field.fieldName,
              };
            })}
            height={350}
            width={700}
            xAxis={[{ data: props.labels, scaleType: "band" }]}
            margin={{ bottom: 90 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default BarChartComponent;
