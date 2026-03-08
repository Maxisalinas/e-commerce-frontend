import { UserResponse } from "../../users/dtos/user-response.dto";

export interface LoginResponse {
    user: UserResponse;
    access_token: string;
}