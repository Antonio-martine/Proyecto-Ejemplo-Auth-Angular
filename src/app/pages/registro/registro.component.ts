import { Component,OnInit } from '@angular/core';
import { ServicesAuthService } from 'src/app/services/services-auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  constructor(public authService: ServicesAuthService){}

  ngOnInit(): void {
    
  }

}
