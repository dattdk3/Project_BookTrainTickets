import { BrandModel } from "../brand/BrandModel";
import { VehicleModel } from "../vehicle/VehicleModel";

export interface TripModel extends IBaseModel {
  tripId: string;
  tripStatus: string;
  startCity: string;
  startStation: string;
  endCity: string;
  endStation: string;
  startTime: string;
  startDate: string;
  routeDuration: string;
  endTime: string;
  stationsMapping: string;
  vehicleType: string;
  seatAmount: number;
  vehicle: VehicleModel;
  brand: BrandModel;
  tickets: MaskedTicketModel[];
}
export interface RouteModel extends IBaseModel {
  routeId: string;
  startCity: string;
  startStation: string;
  endCity: string;
  endStation: string;
  earliestStartTimeFromStart: string;
  latestStartTimeFromStart: string;
  earliestStartTimeFromEnd: string;
  latestStartTimeFromEnd: string;
  routeDuration: string;
  gapDurationBetweenTrip: string;
  gapDurationBetweenRoute: string;
  stationsMapping: string;
  vehicleType: string;
  seatAmount: number;
  brand: BrandModel;
}

export interface TripConfigQueryModel extends IBaseModel {
  tripConfigId: string;
  departFrom: string;
  departAt: Date;
  arriveTo: string;
  arriveAt: Date;
  stops: string;
  vehicleConfig: string;
  trips: Array<any>;
  ticketConfigs: Array<any>;
}

export interface AddTripConfigRequest {
  startCity?: string | undefined;
  startStation?: string | undefined;
  endCity?: string | undefined;
  endStation?: string | undefined;
  routeDuration?: string | undefined;
  earliestStartTimeFromStart?: string | undefined;
  latestStartTimeFromStart?: string | undefined;
  earliestStartTimeFromEnd?: string | undefined;
  latestStartTimeFromEnd?: string | undefined;
  gapDurationBetweenTrip?: string | undefined;
  gapDurationBetweenRoute?: string | undefined;
  stationsMapping?: string | undefined;
  vehicleType?: string | undefined;
  seatAmount?: number | undefined;
}

export const TripStatusEnum: { [key: string | number]: string } = {
  WAITING: "Đang chờ",
  DEPARTED: "Đã rời bến",
  ARRIVED: "Hoàn thành",
};

export const TripStatusList = ["WAITING", "DEPARTED", "ARRIVED"]