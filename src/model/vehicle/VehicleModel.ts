import { DriverConfig } from "../driver/DriverModels";

export interface AddVehicleConfigRequest {
  vehicleType?: string;
  vehicleBrand?: string;
  licensePlate?: string;
  seatAmount?: number;
  currentStation?: string;
  photoUrl?: string;
}

export interface VehicleModel {
  vehicleId: string;
  vehicleType: string;
  vehicleBrand: string;
  licensePlate: string;
  seatAmount: number;
  currentStation: string;
  vehicleStatus: string;
  photoUrl: string;
  drivers: DriverConfig[]
}

export const VehicleType: { [key: string | number]: string } = {
  COACH: "Xe khách",
  CAR: "Xe Con",
  LIMOUSINE: "Xe Limosine",
};

export const VehicleStatusEnum: { [key: string | number]: string } = {
  WAITING: "Đang chờ",
  DEPARTED: "Đã khởi hành",
  ARRIVED: "Đã cập bến",
}
