import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Yh } from './yh';
import { Router } from '@angular/router';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
  return { invalidUser: true };
  }
  }
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  name$:Observable<string>;
  baseUrl="http://127.0.0.1:8080/";
  yhs$:Observable<Yh>;
  constructor(private authService:AuthService,private fb: FormBuilder, private httpClient: HttpClient,private router: Router) {
    this.myForm = this.fb.group(
      {
      'userName': ['', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required,Validators.minLength(5)])]
      }
      ); 
  this.userName = this.myForm.controls['userName'];
  this.password = this.myForm.controls['password'];
  this.name$=this.userName.valueChanges;
 // this.userName.valueChanges.subscribe(val => { 
 //   console.log(val);
  //  });
  }
 
  ngOnInit(): void {
   }
  login(){
      this.httpClient.post(this.baseUrl + 'yhs',this.myForm.value).subscribe(
        (val: any) => {  
          if (val.succ) {
         this.authService.login();
        this.router.navigate(['./management']);
         }else{
        alert("用户名或者密码无效");
      }
        }
       );            
       }
      }
  
 
 

