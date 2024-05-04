import { TicketListMock } from "@/model/mock/ticketMock";
import { httpGet, httpPost } from "../http/httpService";
import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { ITicketService } from "./ticketServiceInterface";

export class TicketService implements ITicketService {
  readonly userTicketUrl = "user/ticket";
  readonly publicPaymentUrl = "public/payment/ticket";
  getAllTicket = () => TicketListMock();

  bookTicketAsync = async (
    request: BookTicketRequest
  ): Promise<HttpResponse<string>> => {
    return await httpPost<string>(
      request,
      `${this.userTicketUrl}/book-tickets`,
      null,
      true
    );
  };

  captureTicketAsync = async (
    id: string
  ): Promise<HttpResponse<TicketModel[]>> => {
    return await httpGet<TicketModel[]>(
      `${this.publicPaymentUrl}/capture-tickets/${id}`,
      null,
      false
    );
  };

  getCurrentUserTickets = async (
    page: number,
    size: number
  ): Promise<HttpResponse<HttpPaginationResponse<TicketModel>>> => {
    return await httpGet<HttpPaginationResponse<TicketModel>>(
      `${this.userTicketUrl}/my-tickets`,
      { page: page, size: size },
      true
    );
  };

  cancelTicketAsync = async (id: string): Promise<HttpResponse<boolean>> => {
    return await httpPost<boolean>({
      ticketId: id
    }, `${this.userTicketUrl}/cancel-tickets`, null, true)
  }
}
