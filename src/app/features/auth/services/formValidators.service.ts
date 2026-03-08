import { inject, Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable, map , of, switchMap, timer, catchError } from "rxjs";
import { UsersService } from "../../users/services/users.service";


@Injectable({
    providedIn: 'root',
})
export class FormValidatorsService {

    usersService = inject(UsersService);

    emailAvailable(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) return of(null);

            return timer(1000).pipe(        // TODO: Comprender porqué no genera un stack de observables/requests.
                switchMap(() =>
                    this.usersService.checkEmail(control.value).pipe(
                        map(res => (res.available ? null : { emailTaken: true })),
                        catchError(() => of(null))
                    )
                )
            );
        }
    }

    passwordsMatches(password: string, passwordConfirmation: string): ValidatorFn {

        return (formGroup: AbstractControl): ValidationErrors | null => {
            const pass = formGroup.get(password)?.value || '';
            const confirm = formGroup.get(passwordConfirmation)?.value || '';

            if (pass !== confirm) {
                return { passwordMismatch: true };
            }

            return null;
        };
    }


}