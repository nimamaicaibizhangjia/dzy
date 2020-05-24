import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-exit-component',
  templateUrl: './exit-component.component.html',
  styleUrls: ['./exit-component.component.css']
})
export class ExitComponentComponent implements OnInit {

  constructor(private authServer:AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authServer.logout();
  }

}
