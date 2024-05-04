"use client";
import { TicketService } from "@/service/ticket/ticketService";
import "./css.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HttpStatusCode } from "axios";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ReferenceDataService } from "@/service/referencedata/referenceDataService";
import React from "react";

const Sucsses = () => {
  const ticketService = new TicketService();
  const referenceDataService = new ReferenceDataService();
  const [stationList, setStationList] = React.useState<ReferenceDataModel[]>(
    []
  );
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    referenceDataService
      .getReferenceDataByType("STATION")
      .then((res) => {
        setStationList(res.data ?? []);
      })
      .catch(() => {
        setStationList([]);
      });
    ticketService
      .captureTicketAsync(searchParams.get("token") || "")
      .then((res) => {
        if (res.code == HttpStatusCode.Ok && res.data) {
          setTickets(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      py={32}
    >
      <CircularProgress color="info" />
    </Box>
  ) : (
    <div className="order-status order-success">
      <div className="animation-ctn">
        <div className="icon icon--order-success svg">
          {tickets == null || tickets?.length == 0 ? (
            <svg
              fill="#ff0000"
              width="154px"
              height="154px"
              viewBox="0 -8 528 528"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ff0000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>fail</title>
                <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="154px"
              height="154px"
            >
              <g fill="none" stroke="#22AE73" stroke-width="2">
                <circle cx="77" cy="77" r="72"></circle>
                <circle
                  id="colored"
                  fill="#22AE73"
                  cx="77"
                  cy="77"
                  r="72"
                ></circle>
                <polyline
                  className="st0"
                  stroke="#fff"
                  stroke-width="10"
                  points="43.5,77.8 63.7,97.9 112.2,49.4 "
                />
              </g>
            </svg>
          )}
        </div>
      </div>

      <div className="top-part">
        <i className="far fa-check-circle"></i>
        {tickets == null || tickets?.length == 0 ? (
          <h3 style={{ color: "red" }}>Đường dẫn hết hạn</h3>
        ) : (
          <h3>ĐẶT VÉ THÀNH CÔNG</h3>
        )}
        {tickets == null || tickets?.length == 0 ? (
          <small>
            Đường dẫn bạn đang cố gắng truy cập có vẻ đã hết hạn. Vui lòng quay
            về trang chủ
          </small>
        ) : (
          <small>
            Cảm ơn bạn đã đăng kí và sử dụng dịch vụ của chúng tôi,chúc bạn có
            một chuyến đi vui vẻ,hạnh phúc bên người thân của mình.
          </small>
        )}
      </div>
      {tickets.map((item) => (
        <Card key={item.ticketId} sx={{ mt: 2 }}>
          <ul>
            <li style={{flexDirection: 'column'}}>
              <div style={{ fontWeight: 700, fontSize: 20, width: "100%" }}>
                {
                  stationList.find((x) => x.code == item.pickupPoint)
                    ?.codeDescription
                }{" "}
                -{" "}
                {
                  stationList.find((x) => x.code == item.dropoffPoint)
                    ?.codeDescription
                }
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, width: "100%" }}>
                {item.startDate} - {item.startTime?.slice(0, 5)}
              </div>
            </li>
            <li>
              <div>Tên khách hàng:</div>
              <div>{item.customerName}</div>
            </li>
            <li>
              <div>Ngày sinh:</div>
              <div>{item.customerDob}</div>
            </li>
            <li>
              <div>CMND/CCCD:</div>
              <div>{item.customerIc}</div>
            </li>
            <li>
              <div>Số điện thoại:</div>
              <div>{item.customerPhone}</div>
            </li>
            <li>
              <div>Email:</div>
              <div>{item.customerEmail}</div>
            </li>
            <li>
              <div>Số ghế:</div>
              <div>{item.seatNumber}</div>
            </li>
            <li>
              <div>Giá tiền :</div>
              <div>{item.price}$</div>
            </li>
          </ul>
        </Card>
      ))}

      <div className="frame">
        <a href="/home">
          <button className="custom-btn btn-16">Về trang chủ</button>
        </a>
      </div>
    </div>
  );
};
export default Sucsses;
