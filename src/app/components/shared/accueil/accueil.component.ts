import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icommande } from 'src/app/models/icommande';
import { IDelivery } from 'src/app/models/idelivery';
import { IDeliveryInfo } from 'src/app/models/ideliveryinfo';
import { CommandeService } from 'src/app/services/commande.service';
import { LivraisonService } from 'src/app/services/livraison.service';
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
  idPlat: any;
  namePlat: any;
  platNumber: any;
  commandeModal: any;
 
  displayCommande: any;
  curentRole: any;

  commandeForm!: FormGroup;
  model!: Icommande;
  modelDelivery!: IDelivery;
  modelDeliveryInfo!: IDeliveryInfo;
  nameClientC: any;
  adressClientC: any;
  mailClientC: any;

  constructor(
    private platListeService: PlatService,
    private userService: UserService,
    private commandeService: CommandeService,
    private deliveryService: LivraisonService,
    private formBuilder: FormBuilder,
    private route: Router
    ) { }

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
    this.userService.spinner();
  }

  // Modals Commande :

  openCommandeModal(){
    this.commandeModal.show();
  }

  closeCommandeModal(){
    this.commandeModal.hide();
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

    getPlatById(id: any) {
      return this.platListeService.getPlatById(new Object(id)).subscribe(res => {
        this.commandeForm =  this.formBuilder.group({
          namePlat: this.formBuilder.control(res[0].name),
          number: new FormControl('', [Validators.required]),
          dateLivraison: new FormControl('', [Validators.required])
        })
        this.idPlat = id;
        this.namePlat = res[0].name;
        this.platNumber = res[0].numberRemain;
        console.log("Nombre de plat est ", res[0].numberRemain);
        
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
      this.model["idClient"] = this.idUser();
      this.model["adressClient"] = this.adressClientC;
      this.model["emailClient"] = this.mailClientC;
      let number = {
        numberSold: (this.model.number),
        numberRemain: (this.platNumber - this.model.number),
      };
      console.log("MODEL TY", number);
      if (confirm("Confirmer la commande")) { 
        this.commandeService.create(this.model)
        .subscribe({
          next: ( data: any ) => {
            alert("Commade terminé avec succès.");
            console.log("DATA COMMANDE nuber--------------------",data["commandes"].number);
            console.log("DATA COMMANDE --------------------",data);

            // Mettre à jour le nombre restant du plats.
            let dataPlat = {
              numberSold: (data["commandes"].number),
              numberRemain: (this.platNumber - data["commandes"].number),
              status: "sold"
            };

            this.platListeService.update(this.idPlat, number).subscribe({
              next: (dataPlat: any) => {
                console.log("DATA PLATS------------ ", dataPlat);
              },
              error: (errPlat) => {
                console.error("ERREUR MISE A JOUR NOMBRE DE PLAT ", errPlat);                
              }
            })

            this.modelDelivery = {
              idPlat: this.idPlat,
              idCommande: data["commandes"]._id,
              number: data["commandes"].number,
              dateLivraison: data["commandes"].dateLivraison,
              status: "pending"
            };            

            this.deliveryService.create(this.modelDelivery).subscribe({
              next: (dataDelivery: any) => {
                console.log("DATA LIVRAISON------------ ", dataDelivery);

                this.modelDeliveryInfo = {
                  idLivraison: dataDelivery["livraison"]._id,
                  idDeliverer: "",
                  plat: this.namePlat,
                  dateLivraison: data["commandes"].dateLivraison,
                  status: "pending",
                  number: data["commandes"].number,
                  client: '('+ this.nameClientC +', '+ this.mailClientC +', '+ this.adressClientC + ')'
                };
                console.log("DATA INFORMATION LIVRAISON------------ ", this.modelDeliveryInfo); 

                this.deliveryService.createDeliveryInfo(this.modelDeliveryInfo).subscribe({
                  next: (dataDeliveryinfo) => {
                    console.log("DATA INFORMATION LIVRAISON AFTER SUCCES------------ ", dataDeliveryinfo);
                    window.location.href= "commandeliste";
                  },
                  error: (err) => {
                    console.error("ERREUR INFORMATION LIVRAISON ",err);                
                  }
                });
                             
              },
              error: (err) => {
                console.error(err);                
              }
            });            
          },
          error: (e) => {
            console.error(e);
          }
        })
      }
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
