"use client";

import theme from "@/app/theme";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Box,
  Typography,
  Avatar,
  LinearProgress,
} from "@mui/material";

// ** MUI Imports

export interface DashboardTableProps {
  title: string;
  total: number;
  totalAddOn: string;
  rows: DashboardTableRow[];
}

export interface DashboardTableRow {
  url: string;
  name: string;
  amount: number;
}

const data: any[] = [
  {
    progress: 75,
    imgHeight: 20,
    title: "Zipcar",
    color: "primary",
    amount: "$24,895.65",
    subtitle: "Vuejs, React & HTML",
    imgSrc: "/images/cards/logo-zipcar.png",
  },
  {
    progress: 50,
    color: "info",
    imgHeight: 27,
    title: "Bitbank",
    amount: "$8,650.20",
    subtitle: "Sketch, Figma & XD",
    imgSrc: "/images/cards/logo-bitbank.png",
  },
  {
    progress: 20,
    imgHeight: 20,
    title: "Aviato",
    color: "secondary",
    amount: "$1,245.80",
    subtitle: "HTML & Angular",
    imgSrc: "/images/cards/logo-aviato.png",
  },
];
const DashboardTable = (props: DashboardTableProps) => {
  const color: Array<
    "primary" | "secondary" | "error" | "info" | "success" | "warning"
  > = ["primary", "success", "secondary", "warning", "error"];
  return (
    <Card sx={{ height: "100%", px: 1 }}>
      <CardHeader
        title={props.title}
        titleTypographyProps={{
          sx: {
            color: theme.palette.primary.main,
            fontSize: 20,
            fontWeight: 600,
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ mb: 2, mt: 0, display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "1.5rem !important" }}
          >
            {props.total}
            {props.totalAddOn}
          </Typography>
        </Box>
        {props.rows?.map((item: DashboardTableRow, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Avatar
                alt={item.name}
                src={item.url}
                // variant="rounded"
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme.palette[color[index]].main,
                  opacity: 0.9
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: 0.5, fontWeight: 500, color: "text.primary" }}
                  >
                    {item.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    minWidth: 85,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
                  >
                    {item.amount}
                  </Typography>
                  <LinearProgress
                    color={color[index]}
                    value={(item.amount / props.total) * 100}
                    variant="determinate"
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
