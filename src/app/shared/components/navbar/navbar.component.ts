import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../features/auth/services/auth.service';
import { InputSearchComponent } from '../../../features/products/components/input-search/input-search.component';


@Component({
    selector: 'app-navbar',
    imports: [RouterLink, InputSearchComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

    private router = inject(Router);
    authService = inject(AuthService);

    onSearch(value: string) {
        this.router.navigate(['/catalog'], {
            queryParams: {
                search: value,
                page: 1,
            },
        });
    }

}
