interface TicketModel extends IBaseModel {
  ticketId: string | null;
  customerName: string;
  customerDob: string;
  customerIc: number;
  customerPhone: number;
  customerEmail: number;
  pickupPoint: string;
  dropoffPoint: string;
  seatNumber: string;
  price: number;
  startTime: string;
  startDate: string;
  paymentStatus: string;
  brandName: string;
  licensePlate: string;
  vehicleType: string;
  tripStatus: string;
}

interface TicketConfigModel extends IBaseModel {
  ticketConfigId: string;
  ticketType: string;
  price: number;
  seat: string;
  coach: string;
  ticketDescription: string;
}

interface BookTicketRequest {
  tripId?: string;
  tickets?: BookTicketRequestDetail[];
}
interface BookTicketRequestDetail {
  customerName: string;
  customerDob: string;
  customerIc: string;
  customerEmail: string;
  customerPhone: string;
  pickupPoint: string;
  dropoffPoint: string;
  seatNumber: string;
  price: number;
}

interface MaskedTicketModel {
  pickupPoint: string;
  dropoffPoint: string;
  seatNumber: string;
}
