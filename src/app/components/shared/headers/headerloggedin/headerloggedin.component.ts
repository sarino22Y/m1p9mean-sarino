import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-headerloggedin',
  templateUrl: './headerloggedin.component.html',
  styleUrls: ['./headerloggedin.component.css']
})
export class HeaderloggedinComponent implements OnInit {

  constructor(
    private userService: UserService ,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  loggedIn(){
    return localStorage.getItem('token');
  }
}
