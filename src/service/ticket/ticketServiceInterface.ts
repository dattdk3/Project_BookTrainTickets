import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";

export interface ITicketService {
    getAllTicket: () => TicketModel[];
    bookTicketAsync: (request: BookTicketRequest) => Promise<HttpResponse<string>>;
    captureTicketAsync: (id: string) => Promise<HttpResponse<TicketModel[]>>;
    getCurrentUserTickets: (page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<TicketModel>>>
    cancelTicketAsync: (id: string) => Promise<HttpResponse<boolean>>;

}