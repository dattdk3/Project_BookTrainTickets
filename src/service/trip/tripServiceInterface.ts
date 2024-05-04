import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { AddTripConfigRequest, RouteModel, TripModel } from "@/model/trip/TripModel";

export interface ITripService {
    getAllTrip: () => TripModel[];
    getPublicTripAsync: (departFrom: string, departAt: string, arriveTo: string, vehicleType: string, page: number, size: number, sortBy: string, sortOrder: string) => Promise<HttpResponse<HttpPaginationResponse<TripModel>>>;
    getAllBrandTripsAsync: (departFrom: string, departAt: string, arriveTo: string, vehicleType: string, page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<TripModel>>>;
    getAllBrandRoutesAsync: (departFrom: string, departAt: string, arriveTo: string, vehicleType: string, page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<RouteModel>>>;
    addTripConfig: (request: AddTripConfigRequest) => Promise<HttpResponse<TripModel>>
    getRouteById: (routeId: string) => Promise<HttpResponse<RouteModel>>;
    getTripById: (tripId: string) => Promise<HttpResponse<TripModel>>;
    deleteRoute: (routeId: string) => Promise<HttpResponse<boolean>>;
}