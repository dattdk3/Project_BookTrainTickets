import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/joy/Typography";
import { useDataContext } from "./DataContext";
import { ChangeEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TicketService } from "@/service/ticket/ticketService";
import { RedirectType, redirect, useRouter } from "next/navigation";
const Step3 = () => {
  const { data, updateData } = useDataContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const ticketService = new TicketService();
  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    seatNumber: number
  ) => {
    let tickets = data.tickets;
    if (tickets.length != data.selectedSeats.length)
      tickets = data.selectedSeats.map((x: number) => ({
        seatNumber: String(x),
      }));
    tickets.find(
      (x: { [x: string]: number }) => x["seatNumber"] == seatNumber
    ).customerName = e.currentTarget.value;
    updateData({ ...data, tickets: tickets });
  };
  const handlePhoneChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    seatNumber: number
  ) => {
    let tickets = data.tickets;
    if (tickets.length != data.selectedSeats.length)
      tickets = data.selectedSeats.map((x: number) => ({
        seatNumber: String(x),
      }));
    tickets.find(
      (x: { [x: string]: number }) => x["seatNumber"] == seatNumber
    ).customerPhone = e.currentTarget.value;
    updateData({ ...data, tickets: tickets });
  };
  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    seatNumber: number
  ) => {
    let tickets = data.tickets;
    if (tickets.length != data.selectedSeats.length)
      tickets = data.selectedSeats.map((x: number) => ({
        seatNumber: String(x),
      }));
    tickets.find(
      (x: { [x: string]: number }) => x["seatNumber"] == seatNumber
    ).customerEmail = e.currentTarget.value;
    updateData({ ...data, tickets: tickets });
  };
  const handleDobChange = (e: any, seatNumber: number) => {
    let tickets = data.tickets;
    if (tickets.length != data.selectedSeats.length)
      tickets = data.selectedSeats.map((x: number) => ({
        seatNumber: String(x),
      }));
    tickets.find(
      (x: { [x: string]: number }) => x["seatNumber"] == seatNumber
    ).customerDob = dayjs(e).format("MM-DD-YYYY");
    updateData({ ...data, tickets: tickets });
  };
  const handleIcChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    seatNumber: number
  ) => {
    let tickets = data.tickets;
    if (tickets.length != data.selectedSeats.length)
      tickets = data.selectedSeats.map((x: number) => ({
        seatNumber: String(x),
      }));
    tickets.find(
      (x: { [x: string]: number }) => x["seatNumber"] == seatNumber
    ).customerIc = e.currentTarget.value;
    updateData({ ...data, tickets: tickets });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    let externalLink = null;
    const res = await ticketService
      .bookTicketAsync({
        tripId: data.tripId ?? "",
        tickets: data.tickets.map((x: any) => ({
          pickupPoint: data.pickupPoint ?? "",
          dropoffPoint: data.dropoffPoint ?? "",
          customerName: x.customerName ?? "",
          customerDob: x.customerDob ?? new Date().toLocaleDateString(),
          customerIc: x.customerIc ?? "",
          customerEmail: x.customerEmail ?? "",
          customerPhone: x.customerPhone ?? "",
          seatNumber: x.seatNumber,
          price: data.price ?? 0,
        })),
      });
    if (res.data) {
      window.location.href = res.data;
    }
    setIsLoading(false);
  };

  return (
    <div>
      <FormControl
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "50vh",
          width: "100%",
        }}
      >
        <Typography textAlign={"center"} sx={{ py: 1 }}>
          Vui lòng điền đầy đủ thông tin
        </Typography>
        {data.selectedSeats.map((x: number) => (
          <Stack
            component="form"
            sx={{
              width: "80%",
            }}
            noValidate
            autoComplete="off"
            gap={2}
            py={2}
          >
            <Divider>Thông tin hành khách ghế số {x}</Divider>
            <TextField
              label="Họ và Tên"
              value={
                data.tickets.find(
                  (y: { [y: string]: number }) => y["seatNumber"] == x
                )?.customerName ?? ""
              }
              onChange={(e) => handleNameChange(e, x)}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày tháng năm sinh"
                value={dayjs(
                  data.tickets.find(
                    (y: { [y: string]: number }) => y["seatNumber"] == x
                  )?.customerDob ?? new Date(),
                  "MM-DD-YYYY"
                )}
                onChange={(e) => handleDobChange(e, x)}
              />
            </LocalizationProvider>
            <TextField
              label="Email"
              value={
                data.tickets.find(
                  (y: { [y: string]: number }) => y["seatNumber"] == x
                )?.customerEmail ?? ""
              }
              onChange={(e) => handleEmailChange(e, x)}
              variant="outlined"
            />
            <TextField
              label="Số điện thoại"
              value={
                data.tickets.find(
                  (y: { [y: string]: number }) => y["seatNumber"] == x
                )?.customerPhone ?? ""
              }
              onChange={(e) => handlePhoneChange(e, x)}
              variant="outlined"
              type="tel"
            />
            <TextField
              label="CMND/CCCD"
              value={
                data.tickets.find(
                  (y: { [y: string]: number }) => y["seatNumber"] == x
                )?.customerIc ?? ""
              }
              onChange={(e) => handleIcChange(e, x)}
              variant="outlined"
            />
          </Stack>
        ))}
        <Button children="Thanh toán" onClick={handleSubmit} />
      </FormControl>
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
export default Step3;
