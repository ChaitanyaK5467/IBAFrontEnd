import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private __userService : UserService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.__userService.addNewUser(formData).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.signupForm.reset();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
      this.signupForm.reset();
    }
}
}