import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../dtos/login-request.dto';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {


    private router = inject(Router)
    private authService = inject(AuthService);

    isSubmitting = signal<boolean>(false);
    serverErrorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    isFormDisabled(): boolean {
        return (this.loginForm.invalid || this.isSubmitting());
    }

    login() {
    
        if (this.isFormDisabled()) return;

        this.isSubmitting.set(true);

        const { email, password } = this.loginForm.value;

        const request: LoginRequest = {
            email: email!,
            password: password!
        }

        this.authService.login(request).subscribe({
            next: () => {
                    this.serverErrorMessage.set(null);
                    this.successMessage.set('¡Ha iniciado sesión exitosamente!');
                    setTimeout(() => {
                        this.router.navigateByUrl('/', { replaceUrl: true });
                    }, 2000);
            },
            error: (err) => {
                this.serverErrorMessage.set(err.error?.message ? 'El correo o la contraseña es incorrecto.' : 'Ocurrió un error inesperado. Intente nuevamente.' );
                this.isSubmitting.set(false);
            }
        })

        


    }

}
