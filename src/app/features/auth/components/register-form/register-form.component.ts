import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsersService } from '../../../users/services/users.service';
import { AuthService } from '../../services/auth.service';
import { FormErrorsService } from '../../services/form-errors.service';
import { FormValidatorsService } from '../../services/form-validators.service';
import { RegisterRequest } from '../../dtos/register-request.dto';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  
      private router = inject(Router);
      private authService = inject(AuthService);
      private usersService = inject(UsersService);
      private FormValidatorsService = inject(FormValidatorsService);
      private formErrorsService = inject(FormErrorsService);
      
      isSubmitting = signal<boolean>(false);
      serverErrorMessage = signal<string | null>(null);
      successMessage = signal<string | null>(null);
  
      registerForm = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
          email: new FormControl('', [Validators.required, Validators.email], [this.FormValidatorsService.emailAvailable()]),
          password: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
          ]),
          passwordConfirmation: new FormControl('', [Validators.required]),
      }, {
          validators: this.FormValidatorsService.passwordsMatches('password', 'passwordConfirmation')
      });
  
      isFormDisabled(): boolean {
          return (this.registerForm.invalid || this.registerForm.pending || this.isSubmitting());
      }
  
      isValidField(field: string): boolean | null {
          return this.formErrorsService.isValidField(this.registerForm, field);
      }
  
      getFieldError(field: string): string | null {
          return this.formErrorsService.getFieldError(this.registerForm, field);
      }
  
      register() {
          
          if (this.isFormDisabled()) return;
  
          this.isSubmitting.set(true);
  
          const { name, email, password } = this.registerForm.value;
  
          const request: RegisterRequest = {
              name: name!,
              email: email!,
              password: password!
          };
  
          this.usersService.register(request).subscribe({          // TODO: refactor a mejores practicas rxjs.
                  next: () => {
                      this.serverErrorMessage.set(null);
                      this.successMessage.set('¡Se ha registrado exitosamente!');
                      setTimeout(() => {
                          this.authService.login({ email: email!, password: password! })
                              .subscribe({
                                  next: () =>  {
                                      this.router.navigateByUrl('/', { replaceUrl: true });
                                  } 
                          });
                      }, 1500);
                  },
                  error: (err) => {
                      this.serverErrorMessage.set(err.error?.details || 'Ocurrió un error inesperado. Intente nuevamente.');
                      this.isSubmitting.set(false);
                  }
          });
  
      }

}
