import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icommande } from 'src/app/models/icommande';
import { CommandeService } from 'src/app/services/commande.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

declare var window: any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title: any;
  information: any

  plats: any;
  commandeModal: any;
 
  displayCommande: any;
  curentRole: any;

  commandeForm!: FormGroup;
  model!: Icommande;
  nameClientC: any;
  adressClientC: any;
  mailClientC: any;

  constructor(
    private platListeService: PlatService,
    private userService: UserService,
    private commandeService: CommandeService,
    private formBuilder: FormBuilder,
    private route: Router
    ) { 
      this.infoUser();
    }

  async ngOnInit() {

    this.title = "Plats diponibles"
    this.information = "Etes-vous un client ? Connectez pour faire la commande."

    this.commandeModal = new window.bootstrap.Modal(
      document.getElementById("commandemodal")
    );
    await this.getListePlat();

    this.userService.updateTheMenu.subscribe(res => {
      this.displayButtonCommandForClient();       
    });    
    this.displayButtonCommandForClient();
    this.infoUser();
    this.userService.updateTheMenu.subscribe(res => {
      this.createForm();       
    });    
    this.createForm();
  }

  // Modals Commande :

  openCommandeModal(){
    this.commandeModal.show();
  }

  closeCommandeModal(){
    this.commandeModal.hide();
    this.route.navigate(['']);
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

   // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  /**
   * Informations de l'utilisateur connecté.
   * @returns 
   */
  infoUser() {
    console.log('IDDusereser',this.idUser());
    
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

  /**
   * Afficher le bouton commande sur l'accueil si 
   * l'utilisateur connecté est un client.
   */
  displayButtonCommandForClient(){
    if (this.userService.getToken() != '') {
      this.curentRole = this.userService.getRoleByToken(this.userService.getToken());
      // Client seulement
      this.displayCommande = this.curentRole == 'client';
    }
  }

   // Si un utilisateur est connecté.
  loggedIn(){
    return localStorage.getItem('token');
  }

  /**
   * Liste des plats.
   */
  async getListePlat()
  {
    await this.platListeService.getAll().subscribe( res => {
      this.plats = res['plats'];
    });
  }
}
