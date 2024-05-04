import { CurrentUserMock, UserListMock } from "@/model/mock/userMock";
import { userInfo } from "os";
import { httpPost } from "../http/httpService";
import { HttpResponse } from "@/model/http/httpEnum";
import { IUserService } from "./userServiceInterface";

export class UserService implements IUserService{
    getAllUser = () => UserListMock();
    getCurrentUser = () => CurrentUserMock();
    updateUserInfo = async (fullName: string, email: string, phone: string) : Promise<HttpResponse<UserModel>> => {
        return await httpPost<UserModel>({
            email: email,
            phone: phone,
            fullName: fullName
        }, `info/update`, null, true);
    }
}
