import { HttpPaginationResponse, HttpResponse } from "@/model/http/httpEnum";
import { IDriverService } from "./DriverServiceInterface.ts";
import { httpGet, httpPost } from "../http/httpService";
import { DriverConfig, DriverGetlist } from "@/model/driver/DriverModels.js";
import { DriverModel } from "@/model/brand/DriverModel.js";

export class DriverService implements IDriverService {
  //getAllDriverListConfigAsync: (page: number, size: number) => Promise<HttpResponse<HttpPaginationResponse<DriverGetlist>>>;
  private readonly DriverConfigUrl: string = "brand/driver";
  AddDriverService = async (body: DriverConfig): Promise<HttpResponse<{}>> => {
    return await httpPost<DriverConfig>(
      body,
      `${this.DriverConfigUrl}/create-driver`,
      null,
      true
    );
  };

  getAllDriverListConfigAsync = async (
    page: number,
    size: number
  ): Promise<HttpResponse<HttpPaginationResponse<DriverGetlist>>> => {
    return await httpGet<HttpPaginationResponse<DriverGetlist>>(
      `${this.DriverConfigUrl}/get-drivers?sortBy=createdAt&sortOrder=desc`,
      {
        page: page,
        size: size,
      },
      true
    );
  };

  getAvailableDriversListAsync = async (): Promise<
    HttpResponse<Array<DriverModel>>
  > => {
    return await httpGet<Array<DriverModel>>(
      `${this.DriverConfigUrl}/get-available-drivers`,
      null,
      true
    );
  };
}
