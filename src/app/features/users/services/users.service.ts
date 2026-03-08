import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequest } from "../../auth/dtos/register-request.dto";
import { UserResponse } from "../dtos/user-response.dto";
import { CheckEmailResponse } from "../../auth/dtos/check-email.response";
import { environment } from "../../../../enviroments/enviroments";


@Injectable({
    providedIn: 'root',
})
export class UsersService {

    http = inject(HttpClient);
    apiBaseUrl = environment.apiUrl;

    checkEmail(email: string) {
        return this.http.get<CheckEmailResponse>(`${ this.apiBaseUrl }/users/check-email`, { params: { email }});
    }
    
    register(request: RegisterRequest) {
        return this.http.post<UserResponse>(`${ this.apiBaseUrl }/users/register`, request);
    }


}

