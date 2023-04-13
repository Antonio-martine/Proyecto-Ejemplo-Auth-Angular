import { Component, OnInit } from '@angular/core';
import { ServicesAuthService } from 'src/app/services/services-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(public authService: ServicesAuthService){}

  ngOnInit(): void {
    
  }

}
