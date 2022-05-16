import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin: any[];
  modelanonymous: any[];
    modeladmin: any[];
  modelchercheur: any[];
  modelmoderateur: any[];
  modeladherent: any[];
  constructor(public app: AppComponent,
              public appMain: AppMainComponent,
              private roleService: RoleService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {


    this.modeladmin =
      [
          {
              label: 'Dashboard',
              icon: 'pi pi-home',
              routerLink: ['/app/admin/dashboard']
          },
          {
              label: 'Impression Carte',
              icon: 'pi pi-id-card',
              items: [
                  {
                      label: 'Liste Impression carte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/impression-carte/list']
                  },
              ]
          },
              {
                label: 'Les Prestations',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Liste des Dossiers',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/Fondation/prestation/list']
                    },
                    {
                      label: 'Etat prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/etat-prestation/list']
                    },
                    {
                      label: 'Niveau importance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/niveau-importance/list']
                    },

                    {
                      label: 'Type prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/type-prestation/list']
                    },
                    {
                      label: 'Pieces jointe prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/piece-jointe-prestation/list']
                    },
                ]
              },
          {
              label: 'Estivage',
              icon: 'pi pi-flag',
              items: [
                  {
                      label: 'Les Demandes d\'estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/demande-estivage/list']
                  },
                  {
                      label: 'Ville',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/ville/list']
                  },
                  {
                      label: 'Piece jointe estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/piece-jointe-estivage/list']
                  },
                  {
                      label: 'Regions',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/region/list']
                  },
                  {
                      label: 'Demande estivage centre',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/demande-estivage-centre/list']
                  },
                  {
                      label: 'Centre estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/centre-estivage/list']
                  },
                  {
                      label: 'Etat demande estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/etat-demande-estivage/list']
                  },
              ]
          },
          // {
          //     label: 'Les Adherents',
          //     icon: 'pi pi-users',
          //     items: [
          //         {
          //             label: 'Liste des Adherents',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/adherent/list']
          //         },
          //         {
          //             label: 'Statut d\'adherents',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/statut/list']
          //         },
          //         {
          //             label: 'Etat carte',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/etat-carte/list']
          //         },
          //         {
          //             label: 'Enfants',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/enfant/list']
          //         },
          //         {
          //             label: 'Conjoints',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/conjoint/list']
          //         },
          //         {
          //             label: 'Piece jointe adherent',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/piece-jointe-adherent/list']
          //         },
          //         {
          //             label: 'Fonction d\'adherents',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/fonction/list']
          //         },
          //         {
          //             label: 'Qualite d\'adherents',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/qualite/list']
          //         },
          //     ]
          // },
          //     {
          //       label: 'Les projets',
          //       icon: 'pi pi-briefcase',
          //       items: [
          //           {
          //             label: 'Liste des Projets',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/projet/list']
          //           },
          //           {
          //             label: 'Pieces jointe des projets',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/piece-jointe-projet/list']
          //           },
          //           {
          //             label: 'Etat projet',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/etat-projet/list']
          //           },
          //       ]
          //     },
          //     {
          //       label: 'Rendez-Vous',
          //       icon: 'pi pi-calendar',
          //       items: [
          //           {
          //               label: 'Liste Rendez vous',
          //               icon: 'pi pi-fw pi-plus-circle',
          //               routerLink: ['/app/admin/Fondation/rendez-vous/list']
          //           },
          //           {
          //             label: 'Pieces jointe rendez-vous',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/piece-jointe-rendez-vous/list']
          //           },
          //       ]
          //     },
          //     {
          //       label: 'Les missions',
          //       icon: 'pi pi-briefcase',
          //       items: [
          //           {
          //             label: 'Liste des Missions',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/mission/list']
          //           },
          //           {
          //             label: 'Pieces jointe mission',
          //             icon: 'pi pi-fw pi-plus-circle',
          //             routerLink: ['/app/admin/Fondation/piece-jointe-mission/list']
          //           },
          //       ]
          //     },




              // {
              //   label: 'Checheurs',
              //   icon: 'pi pi-user',
              //   items:[
              //       {
              //         label: 'Liste Chercheur',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/chercheur/list']
              //       },
              //   ]
              // },




              // {
              //   label: 'Produits',
              //   icon: 'pi pi-tags',
              //   items:[
              //       {
              //         label: 'Liste Produit',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/produit/list']
              //       },
              //       {
              //         label: 'Liste Piece jointe produit',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/piece-jointe-produit/list']
              //       },
              //   ]
              // },
              // {
              //   label: 'Les Conventions',
              //   icon: 'pi pi-file',
              //   items: [
              //       {
              //         label: 'Liste des Conventions',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/convention/list']
              //       },
              //       {
              //         label: 'Pieces jointe convention',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/piece-jointe-convention/list']
              //       },
              //       {
              //         label: 'Liste des Organismes',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/organisme/list']
              //       },
              //   ]
              // },
              //
              // {
              //   label: 'Les Tâches',
              //   icon: 'pi pi-check-circle',
              //   items: [
              //       {
              //         label: 'Liste des Tâches',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/tache/list']
              //       },
              //       {
              //         label: 'Etat tâche',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/etat-tache/list']
              //       },
              //   ]
              // },
              {
                label: 'Les Reclamations',
                icon: 'pi pi-inbox',
                items: [
                    {
                        label: 'Liste des Reclamations',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/app/admin/Fondation/reclamation/list']
                    },
                    {
                      label: 'Etat reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/etat-reclamation/list']
                    },
                    {
                      label: 'Pieces jointe reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/piece-jointe-reclamation/list']
                    },
                    /*{
                      label: 'Gestion reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/gestion-reclamation/list']
                    },*/
                ]
              },
              // {
              //   label: 'Les Moderateurs',
              //   icon: 'pi pi-user',
              //   items: [
              //       {
              //           label: 'Liste des Moderateurs',
              //           icon: 'pi pi-fw pi-plus-circle',
              //           routerLink: ['/app/admin/Fondation/moderateur/list']
              //       },
              //       {
              //         label: 'Profil des modérateurs',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/profil/list']
              //       },
              //       {
              //         label: 'Situation des moderateurs',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/situation-moderateur/list']
              //       },
              //       {
              //         label: 'Echelon',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/echelon/list']
              //       },
              //       {
              //         label: 'Echelle',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/echelle/list']
              //       },
              //       {
              //         label: 'Grade',
              //         icon: 'pi pi-fw pi-plus-circle',
              //         routerLink: ['/app/admin/Fondation/grade/list']
              //       },
              //   ]
              // },
    ];
    this.modelchercheur =
      [
          {
              label: 'Impression Carte',
              icon: 'pi pi-id-card',
              items: [
                  {
                      label: 'Liste Impression carte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/impression-carte/list']
                  },
              ]
          },
          {
              label: 'Prestations',
              icon: 'pi pi-file',
              items: [
                  {
                      label: 'Liste Etat prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/etat-prestation/list']
                  },
                  {
                      label: 'Liste Niveau importance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/niveau-importance/list']
                  },
                  {
                      label: 'Liste Prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/prestation/list']
                  },
                  {
                      label: 'Liste Type prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/type-prestation/list']
                  },
                  {
                      label: 'Liste Piece jointe prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/piece-jointe-prestation/list']
                  },
              ]
          },
          {
              label: 'Estivage',
              icon: 'pi pi-flag',
              items: [
                  {
                      label: 'Liste Demande estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/demande-estivage/list']
                  },
                  {
                      label: 'Liste Piece jointe estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/piece-jointe-estivage/list']
                  },
              ]
          },
          {
              label: 'Adherents',
              icon: 'pi pi-users',
              items: [
                  {
                      label: 'Liste Adherent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/adherent/list']
                  },
                  {
                      label: 'Liste Enfant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/enfant/list']
                  },
                  {
                      label: 'Liste Conjoint',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/conjoint/list']
                  },
                  {
                      label: 'Liste Piece jointe adherent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/piece-jointe-adherent/list']
                  },
              ]
          },
          {
              label: 'Rendez-Vous',
              icon: 'pi pi-calendar',
              items: [
                  {
                      label: 'Liste Rendez vous',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/rendez-vous/list']
                  },
              ]
          },
          {
              label: 'Missions',
              icon: 'pi pi-briefcase',
              items: [
                  {
                      label: 'Liste Mission',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/mission/list']
                  },
                  {
                      label: 'Liste Piece jointe mission',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/piece-jointe-mission/list']
                  },
              ]
          },
          {
              label: 'Produits',
              icon: 'pi pi-tags',
              items: [
                  {
                      label: 'Liste Produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/produit/list']
                  },
              ]
          },

          {
              label: 'Tâches',
              icon: 'pi pi-check-circle',
              items: [
                  {
                      label: 'Liste Tache',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/tache/list']
                  },
              ]
          },
          {
              label: 'Reclamations',
              icon: 'pi pi-inbox',
              items: [
                  {
                      label: 'Liste Reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/reclamation/list']
                  },
                  {
                      label: 'Liste Piece jointe reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/Fondation/piece-jointe-reclamation/list']
                  },
              ]
          },
    ];
    this.modelmoderateur =
      [
          {
              label: 'Impression Carte',
              icon: 'pi pi-id-card',
              items: [
                  {
                      label: 'Liste Impression carte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/impression-carte/list']
                  },
              ]
          },
          {
              label: 'Prestations',
              icon: 'pi pi-file',
              items: [
                  {
                      label: 'Liste Etat prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-prestation/list']
                  },
                  {
                      label: 'Liste Niveau importance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/niveau-importance/list']
                  },
                  {
                      label: 'Liste Prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/prestation/list']
                  },
                  {
                      label: 'Liste Type prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/type-prestation/list']
                  },
                  {
                      label: 'Liste Piece jointe prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-prestation/list']
                  },
              ]
          },
          {
              label: 'Estivage',
              icon: 'pi pi-flag',
              items: [
                  {
                      label: 'Liste Demande estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/demande-estivage/list']
                  },
                  /*{
                      label: 'Liste Estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/estivage/list']
                  },
                  {
                      label: 'Liste Ville',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/ville/list']
                  },*/
                  {
                      label: 'Liste Piece jointe estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-estivage/list']
                  },
                  /*{
                      label: 'Liste Region',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/region/list']
                  },
                  {
                      label: 'Liste Demande estivage centre',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/demande-estivage-centre/list']
                  },
                  {
                      label: 'Liste Centre estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/centre-estivage/list']
                  },
                  {
                      label: 'Liste Etat demande estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-demande-estivage/list']
                  },
                  {
                      label: 'Liste Estivage centre estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/estivage-centre-estivage/list']
                  },*/
              ]
          },
          {
              label: 'Adherents',
              icon: 'pi pi-users',
              items: [
                  {
                      label: 'Liste Adherent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/adherent/list']
                  },
                  /*{
                      label: 'Liste Statut',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/statut/list']
                  },
                  {
                      label: 'Liste Etat carte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-carte/list']
                  },*/
                  {
                      label: 'Liste Enfant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/enfant/list']
                  },
                  {
                      label: 'Liste Conjoint',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/conjoint/list']
                  },
                  {
                      label: 'Liste Piece jointe adherent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-adherent/list']
                  },
                  /*{
                      label: 'Liste Fonction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/fonction/list']
                  },
                  {
                      label: 'Liste Qualite',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/qualite/list']
                  },*/
              ]
          },
          /*{
              label: 'Projets',
              icon: 'pi pi-briefcase',
              items:[
                  {
                      label: 'Liste Projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/projet/list']
                  },
                  {
                      label: 'Liste Piece jointe projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-projet/list']
                  },
                  {
                      label: 'Liste Etat projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-projet/list']
                  },
              ]
          },*/
          {
              label: 'Rendez-Vous',
              icon: 'pi pi-calendar',
              items: [
                  /*{
                      label: 'Liste Piece jointe rendez vous',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-rendez-vous/list']
                  },*/
                  {
                      label: 'Liste Rendez vous',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/rendez-vous/list']
                  },
              ]
          },
          {
              label: 'Missions',
              icon: 'pi pi-briefcase',
              items: [
                  {
                      label: 'Liste Mission',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/mission/list']
                  },
                  {
                      label: 'Liste Piece jointe mission',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-mission/list']
                  },
              ]
          },
          /*{
              label: 'Checheurs',
              icon: 'pi pi-user',
              items:[
                  {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/chercheur/list']
                  },
              ]
          },*/
          {
              label: 'Produits',
              icon: 'pi pi-tags',
              items: [
                  {
                      label: 'Liste Produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/produit/list']
                  },
                  /*{
                      label: 'Liste Piece jointe produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-produit/list']
                  },*/
              ]
          },
           /*
          {
              label: 'Conventions',
              icon: 'pi pi-file',
              items:[
                  {
                      label: 'Liste Convention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/convention/list']
                  },
                  {
                      label: 'Liste Piece jointe convention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-convention/list']
                  },
                  {
                      label: 'Liste Organisme',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/organisme/list']
                  },
              ]
          },*/

          {
              label: 'Tâches',
              icon: 'pi pi-check-circle',
              items: [
                  {
                      label: 'Liste Tache',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/tache/list']
                  },
                  /*
                  {
                      label: 'Liste Etat tache',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-tache/list']
                  },*/
              ]
          },
          {
              label: 'Reclamations',
              icon: 'pi pi-inbox',
              items: [
                  /*{
                      label: 'Liste Etat reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/etat-reclamation/list']
                  },*/
                  {
                      label: 'Liste Reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/reclamation/list']
                  },
                  {
                      label: 'Liste Piece jointe reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/piece-jointe-reclamation/list']
                  },
                  /*{
                      label: 'Liste Gestion reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/gestion-reclamation/list']
                  },*/
              ]
          },
          /*{
              label: 'Moderateurs',
              icon: 'pi pi-user',
              items:[
                  {
                      label: 'Liste Profil',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/profil/list']
                  },
                  {
                      label: 'Liste Situation moderateur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/situation-moderateur/list']
                  },
                  {
                      label: 'Liste Echelon',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/echelon/list']
                  },
                  {
                      label: 'Liste Echelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/echelle/list']
                  },
                  {
                      label: 'Liste Grade',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/grade/list']
                  },
                  {
                      label: 'Liste Moderateur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/moderateur/Fondation/moderateur/list']
                  },
              ]
          },*/
    ];
    this.modeladherent =
      [
          {
              label: 'Prestations',
              icon: 'pi pi-file',
              items: [
                  {
                      label: 'Liste Prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/prestation/list']
                  },
                  {
                      label: 'Liste Piece jointe prestation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/piece-jointe-prestation/list']
                  },
              ]
          },
          {
              label: 'Estivage',
              icon: 'pi pi-flag',
              items: [
                  {
                      label: 'Liste Demande estivage',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/demande-estivage/list']
                  },
              ]
          },
          {
              label: 'Reclamations',
              icon: 'pi pi-inbox',
              items: [
                  {
                      label: 'Liste Reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/Fondation/reclamation/list']
                  },
              ]
          },
    ];
    if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        });
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
