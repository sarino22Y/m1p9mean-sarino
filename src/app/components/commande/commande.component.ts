import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icommande } from 'src/app/models/icommande';
import { IDelivery } from 'src/app/models/idelivery';
import { CommandeService } from 'src/app/services/commande.service';
import { LivraisonService } from 'src/app/services/livraison.service';
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

  modelLivraison!: IDelivery;

  nameClientC: any;
  adressClientC: any;
  mailClientC: any;
  ekalyRole: boolean = true;

  constructor(
    private commandeService: CommandeService,
    private deliveryService: LivraisonService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router
    ) { 
      this.infoUser();
    }

  async ngOnInit() {
    this.userService.spinner();
    await this.getListeCommande();
    this.infoUser();
    this.userService.updateTheMenu.subscribe(res => {
      this.createForm();       
    });    
    this.createForm();
    this.isCurrentRoleRestaurant();
  }

  /**
   * Form de la commande.
   */
  createForm() {
    this.commandeForm = this.formBuilder.group({
      namePlat: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
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

  isEqualsIdClients(id: any): boolean {
    if (id == this.idUser()) {
      return true
    } else {
      return false
    }
  }

   /**
   * Est-ce que le role en cour est 'ekaly'
   */
    isCurrentRoleRestaurant(): boolean {
      let role = this.userService.roleOfUserConnected();
      if (role != "ekaly" ) {
        return this.ekalyRole = false;
      }
      return this.ekalyRole;
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
    this.model["idClient"] = this.idUser();
    this.model["adressClient"] = this.adressClientC;
    this.model["emailClient"] = this.mailClientC;
    // console.log(this.model);

    if (confirm("Confirmer la commande")) {      
      this.commandeService.create(this.model)
      .subscribe({
        next: ( data ) => {
          console.log("DATA--------------------",data);
          this.route.navigate(["commandeliste"]);
          // this.deliveryService.create().subscribe({
          //   next: ( data ) => {
          //     console.log("DATA--------------------",data);
          //   },
          //   error: (e) => {
          //     console.error(e);
          //   }
          // })
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
   }

   /**
    * Supprimer un utilisateur.
    */
  async delete(idCommande:any) {   
      if (confirm("Supprimer la commande")) {
        this.commandeService.delete(idCommande)
           .subscribe({ 
              next: ( data ) => {
              window.location.href= "/commandeliste";
              console.log("DATA-----",data);
           },
           error: (e) => {
              alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
              console.error(e);
           }
         })
     }
  }
}
