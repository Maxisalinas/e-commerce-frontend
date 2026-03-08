import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../dtos/login-request.dto';
import { LoginResponse } from '../dtos/login-response.dto';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../enviroments/enviroments';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    http = inject(HttpClient);
    apiBaseUrl = environment.apiUrl

    private _isLogged = signal<boolean>(!!localStorage.getItem('access_token'));
    readonly isLogged = this._isLogged.asReadonly()

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${ this.apiBaseUrl }/auth/login`, request).pipe(
            tap(res => {
                localStorage.setItem('access_token', res.access_token);
                this._isLogged.set(true);
            })
        );
    }

    logout() {
        localStorage.removeItem('access_token');
        this._isLogged.set(false);
    }

}
