import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressFormComponent } from '../../components/shared/address-form/address-form.component';
import { emailValidator, nameValidator, phoneValidator, zipValidator } from '../../utils/validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [AddressFormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  sameAsBilling = false;

  addressGroup = () =>
    this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), nameValidator]],
      address_1: ['', [Validators.required, Validators.minLength(5)]],
      address_2: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      country: ['',[ Validators.required, Validators.minLength(2)]],
      zip: ['', [Validators.required, zipValidator]],
    });

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contact_information: this.fb.group({
        first_name: [
          '',
          [Validators.required, Validators.minLength(3), nameValidator],
        ],
        last_name: [
          '',
          [Validators.required, Validators.minLength(3), nameValidator],
        ],
        email: ['', [Validators.required, Validators.email, emailValidator]],
        phone: ['', [Validators.required, phoneValidator]], // (999) 999-9999
      }),
      billing_address: this.addressGroup(),
      shipping_address: this.addressGroup(),
    });
  }

  toggleSameAsBilling(checked: boolean) {
    this.sameAsBilling = checked;

    if (checked) {
      this.shippingAddress.patchValue(this.billingAddress.value);
      this.shippingAddress.disable();
    } else {
      this.shippingAddress.enable();
      this.shippingAddress.reset();
    }
  }

  isInvalid(path: string): boolean {
    const control = this.form.get(path);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getError(path: string): string {
    const control = this.form.get(path);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Enter a valid email address';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['invalidName']) return 'Only letters are allowed';
    if (control.errors['invalidZip']) return 'Invalid zip code';
    if (control.errors['invalidEmail']) return 'Invalid email address';
    if (control.errors['invalidPhone']) return 'Invalid phone number';

    return 'Invalid value';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.getRawValue());
  }

  get billingAddress(): FormGroup {
    return this.form.get('billing_address') as FormGroup;
  }

  get shippingAddress(): FormGroup {
    return this.form.get('shipping_address') as FormGroup;
  }
}
