import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icommande } from 'src/app/models/icommande';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  commandeForm!: FormGroup;
  model!: Icommande;
  commandes: any;

  nameClientC: any;
  adressClientC: any;
  mailClientC: any;

  constructor(
    private commandeService: CommandeService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router
    ) { 
      this.infoUser();
    }

  async ngOnInit() {
    await this.getListeCommande();
    this.infoUser();
    this.userService.updateTheMenu.subscribe(res => {
      this.createForm();       
    });    
    this.createForm();
  }

  /**
   * Form de la commande.
   */
  createForm() {
    this.commandeForm = this.formBuilder.group({
      namePlat: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      dateLivraison: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.commandeForm.controls;
  }

  // Nom d'utilisateur connecté.
  nameUser():any{
    return this.userService.nameOfUserConnected();
  }

  // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  infoUser() {    
    return this.userService.getUserById(this.idUser()).subscribe( res => {
      this.nameClientC =  res[0].name;
      this.adressClientC =  res[0].adress;
      this.mailClientC =  res[0].email;
    })
  }

  /**
   * Liste des commandes.
   */
  async getListeCommande()
  {
    await this.commandeService.getAll().subscribe( res => {
      this.commandes = res['commandes'];
    });
  }

  /**
   * Ajout de commande.
   */
   addCommande() {
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
}
