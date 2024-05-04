import {
  Box,
  Tabs,
  Tab,
  Container,
  Grid,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Backdrop,
  Stack,
  Pagination,
  Collapse,
} from "@mui/material";
import "./css.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import React from "react";
import { useSearchParams } from "next/navigation";
import { TicketService } from "@/service/ticket/ticketService";
import { HttpStatusCode } from "axios";
import { VehicleType } from "@/model/vehicle/VehicleModel";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import dayjs from "dayjs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MyTicketsProps {
  activeContent: string;
  tripList: any;
}

const MyTickets = (props: MyTicketsProps) => {
  const [value, setValue] = React.useState(0);
  const searchParams = useSearchParams();
  const ticketService = new TicketService();
  const referenceDataService = new ReferenceDataService();
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>();
  const [tickets, setTickets] = React.useState<TicketModel[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedTickets, setSelectedTickets] = React.useState<string[]>([]);

  React.useEffect(() => {
    ticketService
      .getCurrentUserTickets(page - 1, 10)
      .then((res) => {
        if (res.code == HttpStatusCode.Ok) {
          setTickets(res.data?.data ?? []);
          setTotalPage(res.data?.totalPage ?? 0);
        }
      })
      .finally(() => setIsLoading(false));
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
  }, [page]);

  const onPageChanges = (e: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };

  const handleViewInfo = (ticketId: string | null) => {
    if (ticketId == null) return;
    if (selectedTickets.includes(ticketId)) {
      const newArr = selectedTickets.filter((x) => x != ticketId);
      setSelectedTickets(newArr);
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
  };
  const handleCancelTicket = (ticketId: string | null) => {
    setIsLoading(true);
    if (ticketId == null) return;
    ticketService
      .cancelTicketAsync(ticketId)
      .then((res) => {
        ticketService.getCurrentUserTickets(page - 1, 10).then((result) => {
          if (result.code == HttpStatusCode.Ok) {
            setTickets(result.data?.data ?? []);
            setTotalPage(result.data?.totalPage ?? 0);
          }
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className={`content ${
        props.activeContent === "veCuaToi" ? "active" : ""
      }`}
      id="veCuaToi"
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography fontSize={24} fontWeight={700} color="#3b79c9">
            VÉ CỦA TÔI
          </Typography>
        </Box>
        <Container>
          <Grid container>
            {tickets.map((ticket) => (
              <React.Fragment>
                <Grid
                  item
                  container
                  xs={12}
                  gap={2}
                  wrap="nowrap"
                  boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  paddingY={2}
                  paddingX={2}
                  marginTop={2}
                  alignItems="center"
                >
                  {/* TODO: Replace info */}
                  <Grid item container direction="column" xs={7} height="100%">
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                      children={`${ticket?.brandName} - ${
                        VehicleType[ticket?.vehicleType]
                      }`}
                      fontStyle="italic"
                      paddingBottom={1}
                    />
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                      children={`Từ: ${
                        stationList?.find((x) => x.code == ticket.pickupPoint)
                          ?.codeDescription
                      }`}
                    />
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                      children={`Đến: ${
                        stationList?.find((x) => x.code == ticket.dropoffPoint)
                          ?.codeDescription
                      }`}
                    />
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                      children={`Ngày xuất phát: ${ticket.startDate}`}
                    />
                    <Typography
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                      children={`Giờ xuất phát: ${ticket.startTime}`}
                    />
                    <Typography
                      children={`Số ghế: ${ticket.seatNumber}`}
                      color="hsl(0, 0%, 30%)"
                      fontWeight={500}
                      fontSize={18}
                    />
                    <Typography
                      children={`* Vé chỉ có thể hủy 24h trước giờ khởi hành`}
                      color="hsl(0, 0%, 30%)"
                      fontWeight={400}
                      fontStyle="italic"
                      fontSize={14}
                      pt={2}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={5}
                    borderLeft="1px dashed hsl(0, 0%, 60%)"
                    height="100%"
                    paddingX={2}
                  >
                    <Grid
                      item
                      display="flex"
                      flexDirection="column"
                      xs={5}
                      py={2}
                      gap={2}
                      alignItems="center"
                      wrap="nowrap"
                      position="relative"
                    >
                      {/* TODO: Update data */}

                      <Typography
                        position="absolute"
                        right={-24}
                        children={`${
                          ticket.paymentStatus == "SUCCESSFUL"
                            ? "Đã thanh toán"
                            : ""
                        }`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={10}
                        sx={{
                          color:
                            ticket.paymentStatus == "SUCCESSFUL"
                              ? "red"
                              : "orange",
                          border:
                            ticket.paymentStatus == "SUCCESSFUL"
                              ? "3px solid"
                              : "none",
                          padding: "4px",
                          rotate:
                            ticket.paymentStatus == "SUCCESSFUL"
                              ? "15deg"
                              : "0deg",
                        }}
                      />
                      <Typography
                        children={`$ ${ticket.price}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={700}
                        fontSize={40}
                      />
                      <Typography
                        children={`Trạng thái: ${
                          ticket.tripStatus == "WAITING"
                            ? "Chờ xuất phát"
                            : ticket.tripStatus == "DEPARTED"
                            ? "Đã xuất phát"
                            : "Hoàn thành"
                        }`}
                        color={
                          ticket.tripStatus == "WAITING"
                            ? "#3b79c9"
                            : "hsl(0, 0%, 50%)"
                        }
                        fontWeight={500}
                        fontSize={17}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={dayjs(
                          `${ticket.startDate} ${ticket.startTime}`,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                          .subtract(24, "hour")
                          .isBefore(dayjs(new Date()))}
                        onClick={() => handleCancelTicket(ticket.ticketId)}
                      >
                        Huỷ vé
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleViewInfo(ticket.ticketId)}
                      >
                        Thông tin hành khách
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Collapse
                  in={
                    ticket.ticketId != null &&
                    selectedTickets.includes(ticket.ticketId)
                  }
                  timeout="auto"
                  unmountOnExit
                  sx={{ width: "100%" }}
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
                    {/* TODO: Replace info */}
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
                        children={`Hành khách: ${ticket.customerName}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={16}
                      />
                      <Typography
                        children={`Ngày sinh: ${ticket.customerDob}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={16}
                      />
                      <Typography
                        children={`CMND/CCCD: ${ticket.customerIc}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={16}
                      />
                      <Typography
                        children={`SĐT: ${ticket.customerPhone}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={16}
                      />
                      <Typography
                        children={`Email: ${ticket.customerEmail}`}
                        color="hsl(0, 0%, 30%)"
                        fontWeight={500}
                        fontSize={16}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </React.Fragment>
            ))}
          </Grid>
          <Stack alignItems="center">
            <Pagination
              count={totalPage}
              page={page}
              color="primary"
              onChange={onPageChanges}
            />
          </Stack>
        </Container>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MyTickets;
