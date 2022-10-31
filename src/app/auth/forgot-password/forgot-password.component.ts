import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup = new FormGroup({});
  response:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    this.resetForm = this.fb.group({
      "email": ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]]
    })
  }

  passwordResetCallback = (param) =>{
    console.log(param)
    this.response = param
  }

  submit = (callback) => {
    this.userService.sendPasswordResetLink(this.resetForm.value).subscribe({

      next: (response) => {
        callback(true);
      },
      error: (error) => {
        callback(true);
      }
  })
  }



}
