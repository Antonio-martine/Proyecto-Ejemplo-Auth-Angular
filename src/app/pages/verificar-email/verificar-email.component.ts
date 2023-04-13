import { Component, OnInit } from '@angular/core';
import { ServicesAuthService } from 'src/app/services/services-auth.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit{
  constructor(public authService: ServicesAuthService){}

  ngOnInit(): void {
    
  }

}
