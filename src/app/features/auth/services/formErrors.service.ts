import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Injectable({
    providedIn: 'root',
})
export class FormErrorsService {

    isValidField(form: FormGroup, field: string): boolean {
        const control = form.get(field);
        if (!control) return false;

        if (field === 'passwordConfirmation' && form.hasError('passwordMismatch') && control?.dirty) return true;
        
        return control.invalid && (control.touched || control.dirty);
    }

    getFieldError(form: FormGroup, field: string): string | null {
        
        const control = form.get(field);
        if (!control) return null;

        if (control?.errors) {
            if (control.errors['required']) return 'Este campo es requerido.';
            if (control.errors['email']) return 'El formato del correo es inválido.';
            if (control.errors['emailTaken']) return 'Ya existe un usuario con ese correo.';
            if (control.errors['minlength']) return 'La contraseña debe contener al menos 8 caracteres.';
            if (control.errors['maxlength']) return 'Nombre demasiado largo, máximo 30 caracteres.';
            if (control.errors['pattern']) return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.';
        }

        if (field === 'passwordConfirmation' && form.hasError('passwordMismatch')) {
            return 'Las contraseñas no coinciden.';
        }

        return null;
    }

}