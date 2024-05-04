"use client";
// ** MUI Imports
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import { LineChart } from "@mui/x-charts";
import { Card, Grid, Typography } from "@mui/material";
import theme from "@/app/theme";
// ** Third Party Imports

export interface LineChartProps {
  title: string;
  datas: number[];
}

const LineChartComponent = (props: LineChartProps) => {
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
          <LineChart
            xAxis={[{ data: props.datas.map((x, index) => index + 1) }]}
            series={[
              {
                data: props.datas,
              },
            ]}
            width={700}
            height={350}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default LineChartComponent;
