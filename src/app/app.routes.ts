import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'auth/login',
                loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent), 
                canActivate: [guestGuard]
            },
            {
                path: 'auth/register',
                loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent), 
                canActivate: [guestGuard]
            }
        ]
    }
];
