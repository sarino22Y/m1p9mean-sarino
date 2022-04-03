import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {
  privileges: any;

  constructor(private privilegeListeService:PrivilegeService) { }

  async ngOnInit() {
    await this.getListePrivilege();
  }

  /**
   * Liste des privileges.
   */
  async getListePrivilege()
  {
    await this.privilegeListeService.getAll().subscribe( res => {
      this.privileges = res['privileges'];
      console.log('ITYYYYYYYYYYYYYYYY',this.privileges);
    });
  }
}
