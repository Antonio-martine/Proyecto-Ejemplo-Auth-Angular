import { Component, OnInit } from '@angular/core';
import { ServicesAuthService } from 'src/app/services/services-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(public authService: ServicesAuthService){}

  ngOnInit(): void {
    
  }

}
