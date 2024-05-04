import { VehicleModel } from "../vehicle/VehicleModel";

export interface DriverModel {
    driverId: string;
    fullName: string;
    dob: string;
    phoneNumber: string;
    email: number;
    photoUrl: string;
    vehicle: VehicleModel;
  }