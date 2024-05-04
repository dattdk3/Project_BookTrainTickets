
import { DriverConfig } from "@/model/driver/DriverModels";
import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { promises } from "dns";
export interface IDriverService {
    AddDriverService: (body: DriverConfig) => Promise<HttpResponse<{}>>;
    //  getAllDriverListConfigAsync: (page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<DriverGetlist>>>;
}