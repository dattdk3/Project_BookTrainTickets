"use client";
import { Grid } from "@mui/material";
import DashboardTable, { DashboardTableProps } from "./DashboardTable";
import BarChartComponent, { BarChartProps } from "./BarChartComponent";
import LineChartComponent, { LineChartProps } from "./LineChartComponent";
import React from "react";
import StatisticsCard from "./StatisticsCard";

const Overview = () => {
  const revenueTableProps: DashboardTableProps = {
    title: `Doanh thu tháng ${new Date().getMonth()}/${new Date().getFullYear()}`,
    total: 30000,
    totalAddOn: "$",
    rows: [{
      url: "",
      name: "Brand A",
      amount: 20000
    },
    {
      url: "",
      name: "Brand A",
      amount: 5000
    },
    {
      url: "",
      name: "Brand A",
      amount: 5000
    }]
  };
  const tripsTableProps: DashboardTableProps = {
    title: `Số chuyến tháng ${new Date().getMonth()}/${new Date().getFullYear()}`,
    total: 30000,
    totalAddOn: " Chuyến",
    rows: [{
      url: "",
      name: "Brand A",
      amount: 2000
    }]
  };

  const barChartProps: BarChartProps = {
    title: `Doanh thu theo tháng năm ${new Date().getFullYear()}`,
    labels: Array(12)
      .fill(0)
      .map((x, index) => `${(index + 1).toString().padStart(2, "0")}`),
    fields: [
      {
        fieldLabel: "Doanh thu",
        fieldName: "Revenue",
      },
      {
        fieldLabel: "Chuyến",
        fieldName: "Trips",
      },
    ],
    datas: [
      {
        Revenue: 3000,
        Trips: 1235,
      },
      {
        Revenue: 2000,
        Trips: 1235,
      },
      {
        Revenue: 4000,
        Trips: 1235,
      },
      {
        Revenue: 4000,
        Trips: 1235,
      },
      {
        Revenue: 4000,
        Trips: 1235,
      },
      {
        Revenue: 4000,
        Trips: 1235,
      },
    ],
  };
  const lineChartProps: LineChartProps = {
    title: `Lượng người dùng theo tháng năm ${new Date().getFullYear()}`,
    datas: [10000, 20000, 25000, 15000, 0, 0, 0, 0, 0, 13000, 20100, 40000],
  };
  return (
    <Grid container direction="column" margin={0} width="100%" gap={2}>
      <Grid item xs={12}>
        <StatisticsCard />
      </Grid>
      <Grid item container xs={12} direction="row" wrap="nowrap" gap={2}>
        <Grid item xs={8}>
          <BarChartComponent {...barChartProps} />
        </Grid>
        <Grid item xs={4}>
        <DashboardTable {...revenueTableProps} />
        </Grid>
      </Grid>
      <Grid item container xs={12} direction="row" wrap="nowrap" gap={2}>
        <Grid item xs={8}>
        <LineChartComponent {...lineChartProps} />
        </Grid>
        <Grid item xs={4}>
          <DashboardTable {...tripsTableProps} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Overview;
