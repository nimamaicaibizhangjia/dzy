import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Yh } from './yh';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
  myForm:FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  yhs$:Observable<Yh>;
  baseUrl="http://127.0.0.1:8080/";
    currentUser: Yh;
    constructor(private fb:FormBuilder,private httpClient:HttpClient) {
      this.myForm=this.fb.group({
        'userName':[''],
        'password':[''],
        'id':['']
      });
      this.userName=this.myForm.controls['userName'];
      this.id=this.myForm.controls['id'];
      this.password=this.myForm.controls['password'];
     }
     ngOnInit(): void {
      this.yhs$=<Observable<Yh>>this.httpClient.get(this.baseUrl+'yhs');
    }
    search() {
        if (this.id.value) {
      this.yhs$ = <Observable<Yh>>this.httpClient.get(this.baseUrl + 'yhs/' +this.id.value);
       } else {
        this.yhs$ = <Observable<Yh>>this.httpClient.get(this.baseUrl+'yhs');
       }
      }
      add() {
          console.log(this.myForm.value);
          // 对于可观察对象执行，我们需要订阅其结果
          this.httpClient.post(this.baseUrl + 'yh',this.myForm.value).subscribe(
          (val: any) => {  // val是服务器返回的值
            if (val.succ) {
             alert('添加成功!');
           }
          }
         );
        }
        delete() {
            if (!this.currentUser) {
             alert('必须先选择用户!');
           }
            else {
             this.httpClient.delete(this.baseUrl + 'yh/' +this.currentUser.id).subscribe(
             (val: any) => {
               if (val.succ) {
                alert('删除成功!');
              }
             }
            )
           }
          }
      update() {
          if (!this.currentUser) {
           alert('必须先选择用户!');
         }
          else {
           this.httpClient.put(this.baseUrl + 'yh',
        this.myForm.value).subscribe(
           (val: any) => {
             if (val.succ) {
              alert('修改成功!');
            }
           }
          )
         }
        }
    select(u:Yh){
      this.currentUser=u;
      this.myForm.setValue(this.currentUser);
    }
  }
  
