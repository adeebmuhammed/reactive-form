import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  imports: [ ReactiveFormsModule,CommonModule ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  @Input() group!: FormGroup;
  @Input() title = '';

  isInvalid(controlName: string): boolean {
    const control = this.group.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getError(controlName: string): string {
    const control = this.group.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['invalidName']) return 'Only letters are allowed';
    if (control.errors['invalidZip']) return 'Invalid zip code';

    return 'Invalid value';
  }
}
