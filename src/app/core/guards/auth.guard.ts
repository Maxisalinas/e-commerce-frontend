import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';


export const authGuard: CanActivateFn = (): boolean | UrlTree => {

    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.isLogged() ? true : router.parseUrl('/auth/login');

}

export const guestGuard: CanActivateFn = (): boolean => {

    const auth = inject(AuthService);

    return !auth.isLogged() ? true : false;

}
