import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icommande } from 'src/app/models/icommande';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientdashboardComponent implements OnInit {

  title!: string;
  commandes!: any;
  commandesCurrentUser: any;
  nameClientC!: any;
  adressClientC: any;
  mailClientC: any;

  nameCurrentClient: any;
  
  commandeForm!: FormGroup;
  model!: Icommande;

  constructor(
    private commandeService: CommandeService,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) {  
      
    }

  async ngOnInit() {
    this.title = 'Tableau de board';
    await this.getListeCommande();        
    this.infoUser();
    this.createForm();
  }

  /**
   * Form de la commande.
   * 
  */
  createForm() {
    this.commandeForm = this.formBuilder.group({
      namePlat: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      dateLivraison: new FormControl('', [Validators.required])
    });
  }

  /**
 * Informations de l'utilisateur connecté.
 * @returns 
 */
  infoUser() {
    console.log('Id User',this.idUser());
    
    return this.userService.getUserById(this.idUser()).subscribe( res => {
      this.nameClientC =  res[0].name;
      this.adressClientC =  res[0].adress;
      this.mailClientC =  res[0].email;
    })
  }
  
  /**
   * Ajout de commande.
  */
  commander() {
    this.model = this.commandeForm.value;

    this.model["nameClient"] = this.nameClientC;
    this.model["adressClient"] = this.adressClientC;
    this.model["emailClient"] = this.mailClientC;
    // console.log(this.model);
    this.commandeService.create(this.model)
    .subscribe({
      next: ( data ) => {
        console.log("DATA--------------------",data);
      },
      error: (e) => {
        console.error(e);
      }
    })
   }

  // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  /**
   * Liste des commandes de client connecté.
   */
   async getListeCommande()
   {
     await this.commandeService.getAll().subscribe( res => {
       this.commandes = res['commandes'];    
     });
   }

   /**
    * La liste de commande de l'utilisateur connecté.
    */
   async getListeCommandeCurrentUser() {
     return await console.log("Tous le commandes ",this.commandes);
   }

}
