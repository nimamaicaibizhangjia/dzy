import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MENUS } from './data';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  menus=MENUS;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login();
   }
}
