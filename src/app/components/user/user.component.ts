import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any;

  constructor(private userListeService:UserService) { }

  async ngOnInit() {
    await this.getListeUser();
  }

  /**
   * Liste des users.
   */
  async getListeUser()
  {
    await this.userListeService.getAll().subscribe( res => {
      this.users = res['users'];
      console.log('ITYYYYYYYYYYYYYYYY',this.users);
    });
  }
}
