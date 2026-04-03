import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'catalog',
                loadComponent: () => import('./features/products/pages/catalog/catalog.page').then(m => m.CatalogPage)
            },
            // {
            //     path: 'product-details/:id',
            //     loadComponent: () => import('./features/products/pages/details/details.page').then(m => m.DetailsPage)
            // },
            {
                path: 'auth/login',
                loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage),
                canActivate: [guestGuard]
            },
            {
                path: 'auth/register',
                loadComponent: () => import('./features/auth/pages/register/register.page').then(m => m.RegisterPage),
                canActivate: [guestGuard]
            }
        ]
    }
    
];