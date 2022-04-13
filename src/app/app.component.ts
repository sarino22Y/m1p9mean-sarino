import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'm1p9mean-sarino';

  constructor(
    private userService: UserService
  ){

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.userService.setIsUserConnected(true);
    }
  }
}