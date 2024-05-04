import {
  HttpPaginationResponse,
  HttpResponse,
  SortEnum,
} from "@/model/http/httpEnum";
import { ITripService } from "./tripServiceInterface";
import { TripListMock } from "@/model/mock/tripMock";
import { httpGet, httpPost } from "@/service/http/httpService";
import {
  AddTripConfigRequest,
  RouteModel,
  TripModel,
} from "@/model/trip/TripModel";
export class TripService implements ITripService {
  private readonly publicTripUrl: string = "public/trip";
  private readonly brandTripUrl: string = "brand/trip";
  getAllTrip = () => TripListMock();

  public getPublicTripAsync = async (
    departFrom: string,
    departAt: string,
    arriveTo: string | null,
    vehicleType: string | null,
    page: number,
    size: number,
    sortBy: string,
    sortOrder: string
  ): Promise<HttpResponse<HttpPaginationResponse<TripModel>>> => {
    return await httpGet<HttpPaginationResponse<TripModel>>(
      `${this.publicTripUrl}/get-trips`,
      {
        // sortBy: "depart_at",
        sort: SortEnum.ASC,
        page: page,
        size: size,
        startCity: departFrom,
        startDate: departAt,
        endCity: arriveTo,
        vehicleType: vehicleType,
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
      false
    );
  };
  public getAllBrandTripsAsync = async (
    departFrom: string,
    departAt: string,
    arriveTo: string | null,
    vehicleType: string | null,
    page: number,
    size: number
  ): Promise<HttpResponse<HttpPaginationResponse<TripModel>>> => {
    return await httpGet<HttpPaginationResponse<TripModel>>(
      `${this.brandTripUrl}/get-trips`,
      {
        // sortBy: "depart_at",
        // sort: SortEnum.ASC,
        page: page,
        size: size,
        // startCity: departFrom,
        // startDate: departAt,
        // endCity: arriveTo,
        // vehicleType: vehicleType
      },
      true
    );
  };
  public getAllBrandRoutesAsync = async (
    departFrom: string,
    departAt: string,
    arriveTo: string | null,
    vehicleType: string | null,
    page: number,
    size: number
  ): Promise<HttpResponse<HttpPaginationResponse<RouteModel>>> => {
    return await httpGet<HttpPaginationResponse<RouteModel>>(
      `${this.brandTripUrl}/get-routes`,
      {
        // sortBy: "depart_at",
        // sort: SortEnum.ASC,
        page: page,
        size: size,
        // departFrom: departFrom,
        // departAt: departAt,
        // arriveTo: arriveTo
      },
      true
    );
  };

  addTripConfig = async (
    request: AddTripConfigRequest
  ): Promise<HttpResponse<TripModel>> => {
    return await httpPost<TripModel>(
      request,
      `${this.brandTripUrl}/create-route`,
      null,
      true
    );
  };
  updateRoute = async (
    request: AddTripConfigRequest,
    routeId: string
  ): Promise<HttpResponse<TripModel>> => {
    return await httpPost<TripModel>(
      request,
      `${this.brandTripUrl}/update-route/${routeId}`,
      null,
      true
    );
  };

  getRouteById = async (routeId: string) : Promise<HttpResponse<RouteModel>> => {
    return httpGet<RouteModel>(`${this.brandTripUrl}/get-route/${routeId}`, null, true);
  }
  getTripById = async (tripId: string) : Promise<HttpResponse<TripModel>> => {
    return httpGet<TripModel>(`${this.brandTripUrl}/get-trip/${tripId}`, null, true);
  }

  deleteRoute = async(routeId: string): Promise<HttpResponse<boolean>> => {
    return httpPost<boolean>({routeId: routeId}, `${this.brandTripUrl}/delete-route`, null, true);
  }
}
