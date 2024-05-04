import { HttpResponse, HttpPaginationResponse } from "@/model/http/httpEnum";
import { IVehicleService } from "./vehicleServiceInterface";
import { httpPost, httpGet } from "../http/httpService";
import { AddVehicleConfigRequest, VehicleModel } from "@/model/vehicle/VehicleModel";
import { DriverModel } from "@/model/brand/DriverModel";

export class VehicleService implements IVehicleService{
    private readonly vehicleConfigUrl : string = "brand/vehicle";
    private readonly driverBrandUrl : string = "brand/driver";

    getAllVehicleListConfigAsync = async (page: number, size: number) :  Promise<HttpResponse<HttpPaginationResponse<VehicleModel>>> => {
        return await httpGet<HttpPaginationResponse<VehicleModel>>(`${this.vehicleConfigUrl}/get-vehicles`, {
            page: page,
            size: size
         }, true);
    }
    addVehicleConfig = async (body: AddVehicleConfigRequest) : Promise<HttpResponse<VehicleModel>> => {
        return await httpPost<VehicleModel>(body, `${this.vehicleConfigUrl}/create-vehicle`, null, true)
    }

    getAllVehicleConfigAsync = async () : Promise<HttpResponse<VehicleModel[]>> => {
        return await httpGet<Array<VehicleModel>>(`${this.vehicleConfigUrl}/get-vehicles`, null, true);
    }

    getVehicleByIdAsync = async (id: string) : Promise<HttpResponse<VehicleModel>> => {
        return await httpGet<VehicleModel>(`${this.vehicleConfigUrl}/get-vehicle/${id}`, null, true);
    }
    //driver
    getBrandDriverListAsync= async (page: number, size: number): Promise<HttpResponse<HttpPaginationResponse<DriverModel>>> => {
        return await httpGet<HttpPaginationResponse<DriverModel>>(`${this.driverBrandUrl}/get-drivers`, {
            page: page,
            size: size
        }, true);
    }
    addBrandDriverAsync = async (vehicleId: string, driverId: string): Promise<HttpResponse<VehicleModel>> => {
        return await httpPost<VehicleModel>({
            vehicleId: vehicleId,
            driverIds: [driverId]
        },`${this.vehicleConfigUrl}/update-drivers`, null, true);

    }
 }