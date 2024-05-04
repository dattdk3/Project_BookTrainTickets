import { DriverModel } from "@/model/brand/DriverModel";
import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { AddVehicleConfigRequest, VehicleModel } from "@/model/vehicle/VehicleModel";

export interface IVehicleService {
    getAllVehicleListConfigAsync: (page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<VehicleModel>>>;
    getAllVehicleConfigAsync: () => Promise<HttpResponse<Array<VehicleModel>>>;
    addVehicleConfig: (body: AddVehicleConfigRequest) => Promise<HttpResponse<VehicleModel>>;
    getVehicleByIdAsync: (id: string) => Promise<HttpResponse<VehicleModel>>;
    //drivers
    getBrandDriverListAsync: (page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<DriverModel>>>;
    // addBrandDriverAsync: (page: number, size: number) => Promise<HttpResponse<DriverModel>>;
}