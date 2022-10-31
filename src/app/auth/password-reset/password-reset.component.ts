import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private  userService: UserService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  resetForm: FormGroup;
  passwordValidationMessage: string = ""
  passwordsMatch: boolean = false;
  response: boolean = false;
  status: boolean;
  access: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: [null, Validators.required],
      passwordAgain: [null, Validators.required],
    })
  }

  onPasswordAgainChange = () => {

    const password = this.resetForm.value.password;
    const passwordAgain = this.resetForm.value.passwordAgain;
    console.log(password, passwordAgain)
    if(password === passwordAgain){
      // passwords match
      this.passwordValidationMessage = "Passwords match";
      this.passwordsMatch = true;
      return
    }
    this.passwordsMatch = false
    this.passwordValidationMessage = "Passwords must match";
  }

setAccess = (access) => {
  this.access = access;
}

setResponse = (response) => {
  this.response = response;
}

setStatus = (status) => {
  console.log("setting status...", this.status)

  this.status = status;
  console.log("setting status...", this.status)
}

submit = () => {
  this.activatedRoute.params.subscribe(
    (s) =>{
      this.setAccess(s['access']);
    }
  )
  const body: object = {password: this.resetForm.value.password, rand: this.access}

  this.userService.sendPassword(body).subscribe(
    // please remove this when cors is removed from backend before deployment
    (res) => {
      console.log(res);
      this.setStatus(true);
      this.setResponse(true);
    }
    /*{
    ()
    next: (response) => {
      this.setStatus(true);
      this.setResponse(true);
    },
    error: (error) =>{
      console.log(error)
      this.setStatus(false);
      this.setResponse(true);
    }
  }*/)
}
}
