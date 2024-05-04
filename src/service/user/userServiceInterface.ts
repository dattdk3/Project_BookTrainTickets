import { HttpResponse } from "@/model/http/httpEnum";

export interface IUserService {
    getAllUser: () => UserModel[];
    getCurrentUser: ()=> UserModel;
    updateUserInfo: (fullName: string, email: string, phone: string) => Promise<HttpResponse<UserModel>>;
}