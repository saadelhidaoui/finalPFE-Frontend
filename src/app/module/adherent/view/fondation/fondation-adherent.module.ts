import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { AdherentCreateAdherentComponent } from './adherent-adherent/create-adherent/adherent-create-adherent.component';
import { AdherentEditAdherentComponent } from './adherent-adherent/edit-adherent/adherent-edit-adherent.component';
import { AdherentViewAdherentComponent } from './adherent-adherent/view-adherent/adherent-view-adherent.component';
import { AdherentListAdherentComponent } from './adherent-adherent/list-adherent/adherent-list-adherent.component';
import { AdherentAdherentComponent } from './adherent-adherent/adherent-adherent.component';
import { DemandeEstivageCreateAdherentComponent } from './demande-estivage-adherent/create-adherent/demande-estivage-create-adherent.component';
import { DemandeEstivageEditAdherentComponent } from './demande-estivage-adherent/edit-adherent/demande-estivage-edit-adherent.component';
import { DemandeEstivageViewAdherentComponent } from './demande-estivage-adherent/view-adherent/demande-estivage-view-adherent.component';
import { DemandeEstivageListAdherentComponent } from './demande-estivage-adherent/list-adherent/demande-estivage-list-adherent.component';
import { DemandeEstivageAdherentComponent } from './demande-estivage-adherent/demande-estivage-adherent.component';
import { EtatReclamationCreateAdherentComponent } from './etat-reclamation-adherent/create-adherent/etat-reclamation-create-adherent.component';
import { EtatReclamationEditAdherentComponent } from './etat-reclamation-adherent/edit-adherent/etat-reclamation-edit-adherent.component';
import { EtatReclamationViewAdherentComponent } from './etat-reclamation-adherent/view-adherent/etat-reclamation-view-adherent.component';
import { EtatReclamationListAdherentComponent } from './etat-reclamation-adherent/list-adherent/etat-reclamation-list-adherent.component';
import { EtatReclamationAdherentComponent } from './etat-reclamation-adherent/etat-reclamation-adherent.component';
import { EstivageCreateAdherentComponent } from './estivage-adherent/create-adherent/estivage-create-adherent.component';
import { EstivageEditAdherentComponent } from './estivage-adherent/edit-adherent/estivage-edit-adherent.component';
import { EstivageViewAdherentComponent } from './estivage-adherent/view-adherent/estivage-view-adherent.component';
import { EstivageListAdherentComponent } from './estivage-adherent/list-adherent/estivage-list-adherent.component';
import { EstivageAdherentComponent } from './estivage-adherent/estivage-adherent.component';
import { VilleCreateAdherentComponent } from './ville-adherent/create-adherent/ville-create-adherent.component';
import { VilleEditAdherentComponent } from './ville-adherent/edit-adherent/ville-edit-adherent.component';
import { VilleViewAdherentComponent } from './ville-adherent/view-adherent/ville-view-adherent.component';
import { VilleListAdherentComponent } from './ville-adherent/list-adherent/ville-list-adherent.component';
import { VilleAdherentComponent } from './ville-adherent/ville-adherent.component';
import { ProfilCreateAdherentComponent } from './profil-adherent/create-adherent/profil-create-adherent.component';
import { ProfilEditAdherentComponent } from './profil-adherent/edit-adherent/profil-edit-adherent.component';
import { ProfilViewAdherentComponent } from './profil-adherent/view-adherent/profil-view-adherent.component';
import { ProfilListAdherentComponent } from './profil-adherent/list-adherent/profil-list-adherent.component';
import { ProfilAdherentComponent } from './profil-adherent/profil-adherent.component';
import { ConventionCreateAdherentComponent } from './convention-adherent/create-adherent/convention-create-adherent.component';
import { ConventionEditAdherentComponent } from './convention-adherent/edit-adherent/convention-edit-adherent.component';
import { ConventionViewAdherentComponent } from './convention-adherent/view-adherent/convention-view-adherent.component';
import { ConventionListAdherentComponent } from './convention-adherent/list-adherent/convention-list-adherent.component';
import { ConventionAdherentComponent } from './convention-adherent/convention-adherent.component';
import { ImpressionCarteCreateAdherentComponent } from './impression-carte-adherent/create-adherent/impression-carte-create-adherent.component';
import { ImpressionCarteEditAdherentComponent } from './impression-carte-adherent/edit-adherent/impression-carte-edit-adherent.component';
import { ImpressionCarteViewAdherentComponent } from './impression-carte-adherent/view-adherent/impression-carte-view-adherent.component';
import { ImpressionCarteListAdherentComponent } from './impression-carte-adherent/list-adherent/impression-carte-list-adherent.component';
import { ImpressionCarteAdherentComponent } from './impression-carte-adherent/impression-carte-adherent.component';
import { PieceJointeEstivageCreateAdherentComponent } from './piece-jointe-estivage-adherent/create-adherent/piece-jointe-estivage-create-adherent.component';
import { PieceJointeEstivageEditAdherentComponent } from './piece-jointe-estivage-adherent/edit-adherent/piece-jointe-estivage-edit-adherent.component';
import { PieceJointeEstivageViewAdherentComponent } from './piece-jointe-estivage-adherent/view-adherent/piece-jointe-estivage-view-adherent.component';
import { PieceJointeEstivageListAdherentComponent } from './piece-jointe-estivage-adherent/list-adherent/piece-jointe-estivage-list-adherent.component';
import { PieceJointeEstivageAdherentComponent } from './piece-jointe-estivage-adherent/piece-jointe-estivage-adherent.component';
import { ProduitCreateAdherentComponent } from './produit-adherent/create-adherent/produit-create-adherent.component';
import { ProduitEditAdherentComponent } from './produit-adherent/edit-adherent/produit-edit-adherent.component';
import { ProduitViewAdherentComponent } from './produit-adherent/view-adherent/produit-view-adherent.component';
import { ProduitListAdherentComponent } from './produit-adherent/list-adherent/produit-list-adherent.component';
import { ProduitAdherentComponent } from './produit-adherent/produit-adherent.component';
import { StatutCreateAdherentComponent } from './statut-adherent/create-adherent/statut-create-adherent.component';
import { StatutEditAdherentComponent } from './statut-adherent/edit-adherent/statut-edit-adherent.component';
import { StatutViewAdherentComponent } from './statut-adherent/view-adherent/statut-view-adherent.component';
import { StatutListAdherentComponent } from './statut-adherent/list-adherent/statut-list-adherent.component';
import { StatutAdherentComponent } from './statut-adherent/statut-adherent.component';
import { EtatCarteCreateAdherentComponent } from './etat-carte-adherent/create-adherent/etat-carte-create-adherent.component';
import { EtatCarteEditAdherentComponent } from './etat-carte-adherent/edit-adherent/etat-carte-edit-adherent.component';
import { EtatCarteViewAdherentComponent } from './etat-carte-adherent/view-adherent/etat-carte-view-adherent.component';
import { EtatCarteListAdherentComponent } from './etat-carte-adherent/list-adherent/etat-carte-list-adherent.component';
import { EtatCarteAdherentComponent } from './etat-carte-adherent/etat-carte-adherent.component';
import { RegionCreateAdherentComponent } from './region-adherent/create-adherent/region-create-adherent.component';
import { RegionEditAdherentComponent } from './region-adherent/edit-adherent/region-edit-adherent.component';
import { RegionViewAdherentComponent } from './region-adherent/view-adherent/region-view-adherent.component';
import { RegionListAdherentComponent } from './region-adherent/list-adherent/region-list-adherent.component';
import { RegionAdherentComponent } from './region-adherent/region-adherent.component';
import { TacheCreateAdherentComponent } from './tache-adherent/create-adherent/tache-create-adherent.component';
import { TacheEditAdherentComponent } from './tache-adherent/edit-adherent/tache-edit-adherent.component';
import { TacheViewAdherentComponent } from './tache-adherent/view-adherent/tache-view-adherent.component';
import { TacheListAdherentComponent } from './tache-adherent/list-adherent/tache-list-adherent.component';
import { TacheAdherentComponent } from './tache-adherent/tache-adherent.component';
import { ReclamationCreateAdherentComponent } from './reclamation-adherent/create-adherent/reclamation-create-adherent.component';
import { ReclamationEditAdherentComponent } from './reclamation-adherent/edit-adherent/reclamation-edit-adherent.component';
import { ReclamationViewAdherentComponent } from './reclamation-adherent/view-adherent/reclamation-view-adherent.component';
import { ReclamationListAdherentComponent } from './reclamation-adherent/list-adherent/reclamation-list-adherent.component';
import { ReclamationAdherentComponent } from './reclamation-adherent/reclamation-adherent.component';
import { SituationModerateurCreateAdherentComponent } from './situation-moderateur-adherent/create-adherent/situation-moderateur-create-adherent.component';
import { SituationModerateurEditAdherentComponent } from './situation-moderateur-adherent/edit-adherent/situation-moderateur-edit-adherent.component';
import { SituationModerateurViewAdherentComponent } from './situation-moderateur-adherent/view-adherent/situation-moderateur-view-adherent.component';
import { SituationModerateurListAdherentComponent } from './situation-moderateur-adherent/list-adherent/situation-moderateur-list-adherent.component';
import { SituationModerateurAdherentComponent } from './situation-moderateur-adherent/situation-moderateur-adherent.component';
import { EtatPrestationCreateAdherentComponent } from './etat-prestation-adherent/create-adherent/etat-prestation-create-adherent.component';
import { EtatPrestationEditAdherentComponent } from './etat-prestation-adherent/edit-adherent/etat-prestation-edit-adherent.component';
import { EtatPrestationViewAdherentComponent } from './etat-prestation-adherent/view-adherent/etat-prestation-view-adherent.component';
import { EtatPrestationListAdherentComponent } from './etat-prestation-adherent/list-adherent/etat-prestation-list-adherent.component';
import { EtatPrestationAdherentComponent } from './etat-prestation-adherent/etat-prestation-adherent.component';
import { EnfantCreateAdherentComponent } from './enfant-adherent/create-adherent/enfant-create-adherent.component';
import { EnfantEditAdherentComponent } from './enfant-adherent/edit-adherent/enfant-edit-adherent.component';
import { EnfantViewAdherentComponent } from './enfant-adherent/view-adherent/enfant-view-adherent.component';
import { EnfantListAdherentComponent } from './enfant-adherent/list-adherent/enfant-list-adherent.component';
import { EnfantAdherentComponent } from './enfant-adherent/enfant-adherent.component';
import { MissionCreateAdherentComponent } from './mission-adherent/create-adherent/mission-create-adherent.component';
import { MissionEditAdherentComponent } from './mission-adherent/edit-adherent/mission-edit-adherent.component';
import { MissionViewAdherentComponent } from './mission-adherent/view-adherent/mission-view-adherent.component';
import { MissionListAdherentComponent } from './mission-adherent/list-adherent/mission-list-adherent.component';
import { MissionAdherentComponent } from './mission-adherent/mission-adherent.component';
import { PieceJointeMissionCreateAdherentComponent } from './piece-jointe-mission-adherent/create-adherent/piece-jointe-mission-create-adherent.component';
import { PieceJointeMissionEditAdherentComponent } from './piece-jointe-mission-adherent/edit-adherent/piece-jointe-mission-edit-adherent.component';
import { PieceJointeMissionViewAdherentComponent } from './piece-jointe-mission-adherent/view-adherent/piece-jointe-mission-view-adherent.component';
import { PieceJointeMissionListAdherentComponent } from './piece-jointe-mission-adherent/list-adherent/piece-jointe-mission-list-adherent.component';
import { PieceJointeMissionAdherentComponent } from './piece-jointe-mission-adherent/piece-jointe-mission-adherent.component';
import { DemandeEstivageCentreCreateAdherentComponent } from './demande-estivage-centre-adherent/create-adherent/demande-estivage-centre-create-adherent.component';
import { DemandeEstivageCentreEditAdherentComponent } from './demande-estivage-centre-adherent/edit-adherent/demande-estivage-centre-edit-adherent.component';
import { DemandeEstivageCentreViewAdherentComponent } from './demande-estivage-centre-adherent/view-adherent/demande-estivage-centre-view-adherent.component';
import { DemandeEstivageCentreListAdherentComponent } from './demande-estivage-centre-adherent/list-adherent/demande-estivage-centre-list-adherent.component';
import { DemandeEstivageCentreAdherentComponent } from './demande-estivage-centre-adherent/demande-estivage-centre-adherent.component';
import { NiveauImportanceCreateAdherentComponent } from './niveau-importance-adherent/create-adherent/niveau-importance-create-adherent.component';
import { NiveauImportanceEditAdherentComponent } from './niveau-importance-adherent/edit-adherent/niveau-importance-edit-adherent.component';
import { NiveauImportanceViewAdherentComponent } from './niveau-importance-adherent/view-adherent/niveau-importance-view-adherent.component';
import { NiveauImportanceListAdherentComponent } from './niveau-importance-adherent/list-adherent/niveau-importance-list-adherent.component';
import { NiveauImportanceAdherentComponent } from './niveau-importance-adherent/niveau-importance-adherent.component';
import { ChercheurCreateAdherentComponent } from './chercheur-adherent/create-adherent/chercheur-create-adherent.component';
import { ChercheurEditAdherentComponent } from './chercheur-adherent/edit-adherent/chercheur-edit-adherent.component';
import { ChercheurViewAdherentComponent } from './chercheur-adherent/view-adherent/chercheur-view-adherent.component';
import { ChercheurListAdherentComponent } from './chercheur-adherent/list-adherent/chercheur-list-adherent.component';
import { ChercheurAdherentComponent } from './chercheur-adherent/chercheur-adherent.component';
import { PieceJointeProduitCreateAdherentComponent } from './piece-jointe-produit-adherent/create-adherent/piece-jointe-produit-create-adherent.component';
import { PieceJointeProduitEditAdherentComponent } from './piece-jointe-produit-adherent/edit-adherent/piece-jointe-produit-edit-adherent.component';
import { PieceJointeProduitViewAdherentComponent } from './piece-jointe-produit-adherent/view-adherent/piece-jointe-produit-view-adherent.component';
import { PieceJointeProduitListAdherentComponent } from './piece-jointe-produit-adherent/list-adherent/piece-jointe-produit-list-adherent.component';
import { PieceJointeProduitAdherentComponent } from './piece-jointe-produit-adherent/piece-jointe-produit-adherent.component';
import { ProjetCreateAdherentComponent } from './projet-adherent/create-adherent/projet-create-adherent.component';
import { ProjetEditAdherentComponent } from './projet-adherent/edit-adherent/projet-edit-adherent.component';
import { ProjetViewAdherentComponent } from './projet-adherent/view-adherent/projet-view-adherent.component';
import { ProjetListAdherentComponent } from './projet-adherent/list-adherent/projet-list-adherent.component';
import { ProjetAdherentComponent } from './projet-adherent/projet-adherent.component';
import { PieceJointeConventionCreateAdherentComponent } from './piece-jointe-convention-adherent/create-adherent/piece-jointe-convention-create-adherent.component';
import { PieceJointeConventionEditAdherentComponent } from './piece-jointe-convention-adherent/edit-adherent/piece-jointe-convention-edit-adherent.component';
import { PieceJointeConventionViewAdherentComponent } from './piece-jointe-convention-adherent/view-adherent/piece-jointe-convention-view-adherent.component';
import { PieceJointeConventionListAdherentComponent } from './piece-jointe-convention-adherent/list-adherent/piece-jointe-convention-list-adherent.component';
import { PieceJointeConventionAdherentComponent } from './piece-jointe-convention-adherent/piece-jointe-convention-adherent.component';
import { EchelonCreateAdherentComponent } from './echelon-adherent/create-adherent/echelon-create-adherent.component';
import { EchelonEditAdherentComponent } from './echelon-adherent/edit-adherent/echelon-edit-adherent.component';
import { EchelonViewAdherentComponent } from './echelon-adherent/view-adherent/echelon-view-adherent.component';
import { EchelonListAdherentComponent } from './echelon-adherent/list-adherent/echelon-list-adherent.component';
import { EchelonAdherentComponent } from './echelon-adherent/echelon-adherent.component';
import { PrestationCreateAdherentComponent } from './prestation-adherent/create-adherent/prestation-create-adherent.component';
import { PrestationEditAdherentComponent } from './prestation-adherent/edit-adherent/prestation-edit-adherent.component';
import { PrestationViewAdherentComponent } from './prestation-adherent/view-adherent/prestation-view-adherent.component';
import { PrestationListAdherentComponent } from './prestation-adherent/list-adherent/prestation-list-adherent.component';
import { PrestationAdherentComponent } from './prestation-adherent/prestation-adherent.component';
import { PieceJointeProjetCreateAdherentComponent } from './piece-jointe-projet-adherent/create-adherent/piece-jointe-projet-create-adherent.component';
import { PieceJointeProjetEditAdherentComponent } from './piece-jointe-projet-adherent/edit-adherent/piece-jointe-projet-edit-adherent.component';
import { PieceJointeProjetViewAdherentComponent } from './piece-jointe-projet-adherent/view-adherent/piece-jointe-projet-view-adherent.component';
import { PieceJointeProjetListAdherentComponent } from './piece-jointe-projet-adherent/list-adherent/piece-jointe-projet-list-adherent.component';
import { PieceJointeProjetAdherentComponent } from './piece-jointe-projet-adherent/piece-jointe-projet-adherent.component';
import { PieceJointeReclamationCreateAdherentComponent } from './piece-jointe-reclamation-adherent/create-adherent/piece-jointe-reclamation-create-adherent.component';
import { PieceJointeReclamationEditAdherentComponent } from './piece-jointe-reclamation-adherent/edit-adherent/piece-jointe-reclamation-edit-adherent.component';
import { PieceJointeReclamationViewAdherentComponent } from './piece-jointe-reclamation-adherent/view-adherent/piece-jointe-reclamation-view-adherent.component';
import { PieceJointeReclamationListAdherentComponent } from './piece-jointe-reclamation-adherent/list-adherent/piece-jointe-reclamation-list-adherent.component';
import { PieceJointeReclamationAdherentComponent } from './piece-jointe-reclamation-adherent/piece-jointe-reclamation-adherent.component';
import { EchelleCreateAdherentComponent } from './echelle-adherent/create-adherent/echelle-create-adherent.component';
import { EchelleEditAdherentComponent } from './echelle-adherent/edit-adherent/echelle-edit-adherent.component';
import { EchelleViewAdherentComponent } from './echelle-adherent/view-adherent/echelle-view-adherent.component';
import { EchelleListAdherentComponent } from './echelle-adherent/list-adherent/echelle-list-adherent.component';
import { EchelleAdherentComponent } from './echelle-adherent/echelle-adherent.component';
import { TypePrestationCreateAdherentComponent } from './type-prestation-adherent/create-adherent/type-prestation-create-adherent.component';
import { TypePrestationEditAdherentComponent } from './type-prestation-adherent/edit-adherent/type-prestation-edit-adherent.component';
import { TypePrestationViewAdherentComponent } from './type-prestation-adherent/view-adherent/type-prestation-view-adherent.component';
import { TypePrestationListAdherentComponent } from './type-prestation-adherent/list-adherent/type-prestation-list-adherent.component';
import { TypePrestationAdherentComponent } from './type-prestation-adherent/type-prestation-adherent.component';
import { OrganismeCreateAdherentComponent } from './organisme-adherent/create-adherent/organisme-create-adherent.component';
import { OrganismeEditAdherentComponent } from './organisme-adherent/edit-adherent/organisme-edit-adherent.component';
import { OrganismeViewAdherentComponent } from './organisme-adherent/view-adherent/organisme-view-adherent.component';
import { OrganismeListAdherentComponent } from './organisme-adherent/list-adherent/organisme-list-adherent.component';
import { OrganismeAdherentComponent } from './organisme-adherent/organisme-adherent.component';
import { EtatTacheCreateAdherentComponent } from './etat-tache-adherent/create-adherent/etat-tache-create-adherent.component';
import { EtatTacheEditAdherentComponent } from './etat-tache-adherent/edit-adherent/etat-tache-edit-adherent.component';
import { EtatTacheViewAdherentComponent } from './etat-tache-adherent/view-adherent/etat-tache-view-adherent.component';
import { EtatTacheListAdherentComponent } from './etat-tache-adherent/list-adherent/etat-tache-list-adherent.component';
import { EtatTacheAdherentComponent } from './etat-tache-adherent/etat-tache-adherent.component';
import { ConjointCreateAdherentComponent } from './conjoint-adherent/create-adherent/conjoint-create-adherent.component';
import { ConjointEditAdherentComponent } from './conjoint-adherent/edit-adherent/conjoint-edit-adherent.component';
import { ConjointViewAdherentComponent } from './conjoint-adherent/view-adherent/conjoint-view-adherent.component';
import { ConjointListAdherentComponent } from './conjoint-adherent/list-adherent/conjoint-list-adherent.component';
import { ConjointAdherentComponent } from './conjoint-adherent/conjoint-adherent.component';
import { PieceJointeRendezVousCreateAdherentComponent } from './piece-jointe-rendez-vous-adherent/create-adherent/piece-jointe-rendez-vous-create-adherent.component';
import { PieceJointeRendezVousEditAdherentComponent } from './piece-jointe-rendez-vous-adherent/edit-adherent/piece-jointe-rendez-vous-edit-adherent.component';
import { PieceJointeRendezVousViewAdherentComponent } from './piece-jointe-rendez-vous-adherent/view-adherent/piece-jointe-rendez-vous-view-adherent.component';
import { PieceJointeRendezVousListAdherentComponent } from './piece-jointe-rendez-vous-adherent/list-adherent/piece-jointe-rendez-vous-list-adherent.component';
import { PieceJointeRendezVousAdherentComponent } from './piece-jointe-rendez-vous-adherent/piece-jointe-rendez-vous-adherent.component';
import { PieceJointePrestationCreateAdherentComponent } from './piece-jointe-prestation-adherent/create-adherent/piece-jointe-prestation-create-adherent.component';
import { PieceJointePrestationEditAdherentComponent } from './piece-jointe-prestation-adherent/edit-adherent/piece-jointe-prestation-edit-adherent.component';
import { PieceJointePrestationViewAdherentComponent } from './piece-jointe-prestation-adherent/view-adherent/piece-jointe-prestation-view-adherent.component';
import { PieceJointePrestationListAdherentComponent } from './piece-jointe-prestation-adherent/list-adherent/piece-jointe-prestation-list-adherent.component';
import { PieceJointePrestationAdherentComponent } from './piece-jointe-prestation-adherent/piece-jointe-prestation-adherent.component';
import { CentreEstivageCreateAdherentComponent } from './centre-estivage-adherent/create-adherent/centre-estivage-create-adherent.component';
import { CentreEstivageEditAdherentComponent } from './centre-estivage-adherent/edit-adherent/centre-estivage-edit-adherent.component';
import { CentreEstivageViewAdherentComponent } from './centre-estivage-adherent/view-adherent/centre-estivage-view-adherent.component';
import { CentreEstivageListAdherentComponent } from './centre-estivage-adherent/list-adherent/centre-estivage-list-adherent.component';
import { CentreEstivageAdherentComponent } from './centre-estivage-adherent/centre-estivage-adherent.component';
import { PieceJointeAdherentCreateAdherentComponent } from './piece-jointe-adherent-adherent/create-adherent/piece-jointe-adherent-create-adherent.component';
import { PieceJointeAdherentEditAdherentComponent } from './piece-jointe-adherent-adherent/edit-adherent/piece-jointe-adherent-edit-adherent.component';
import { PieceJointeAdherentViewAdherentComponent } from './piece-jointe-adherent-adherent/view-adherent/piece-jointe-adherent-view-adherent.component';
import { PieceJointeAdherentListAdherentComponent } from './piece-jointe-adherent-adherent/list-adherent/piece-jointe-adherent-list-adherent.component';
import { PieceJointeAdherentAdherentComponent } from './piece-jointe-adherent-adherent/piece-jointe-adherent-adherent.component';
import { GestionReclamationCreateAdherentComponent } from './gestion-reclamation-adherent/create-adherent/gestion-reclamation-create-adherent.component';
import { GestionReclamationEditAdherentComponent } from './gestion-reclamation-adherent/edit-adherent/gestion-reclamation-edit-adherent.component';
import { GestionReclamationViewAdherentComponent } from './gestion-reclamation-adherent/view-adherent/gestion-reclamation-view-adherent.component';
import { GestionReclamationListAdherentComponent } from './gestion-reclamation-adherent/list-adherent/gestion-reclamation-list-adherent.component';
import { GestionReclamationAdherentComponent } from './gestion-reclamation-adherent/gestion-reclamation-adherent.component';
import { FonctionCreateAdherentComponent } from './fonction-adherent/create-adherent/fonction-create-adherent.component';
import { FonctionEditAdherentComponent } from './fonction-adherent/edit-adherent/fonction-edit-adherent.component';
import { FonctionViewAdherentComponent } from './fonction-adherent/view-adherent/fonction-view-adherent.component';
import { FonctionListAdherentComponent } from './fonction-adherent/list-adherent/fonction-list-adherent.component';
import { FonctionAdherentComponent } from './fonction-adherent/fonction-adherent.component';
import { EtatDemandeEstivageCreateAdherentComponent } from './etat-demande-estivage-adherent/create-adherent/etat-demande-estivage-create-adherent.component';
import { EtatDemandeEstivageEditAdherentComponent } from './etat-demande-estivage-adherent/edit-adherent/etat-demande-estivage-edit-adherent.component';
import { EtatDemandeEstivageViewAdherentComponent } from './etat-demande-estivage-adherent/view-adherent/etat-demande-estivage-view-adherent.component';
import { EtatDemandeEstivageListAdherentComponent } from './etat-demande-estivage-adherent/list-adherent/etat-demande-estivage-list-adherent.component';
import { EtatDemandeEstivageAdherentComponent } from './etat-demande-estivage-adherent/etat-demande-estivage-adherent.component';
import { GradeCreateAdherentComponent } from './grade-adherent/create-adherent/grade-create-adherent.component';
import { GradeEditAdherentComponent } from './grade-adherent/edit-adherent/grade-edit-adherent.component';
import { GradeViewAdherentComponent } from './grade-adherent/view-adherent/grade-view-adherent.component';
import { GradeListAdherentComponent } from './grade-adherent/list-adherent/grade-list-adherent.component';
import { GradeAdherentComponent } from './grade-adherent/grade-adherent.component';
import { EstivageCentreEstivageCreateAdherentComponent } from './estivage-centre-estivage-adherent/create-adherent/estivage-centre-estivage-create-adherent.component';
import { EstivageCentreEstivageEditAdherentComponent } from './estivage-centre-estivage-adherent/edit-adherent/estivage-centre-estivage-edit-adherent.component';
import { EstivageCentreEstivageViewAdherentComponent } from './estivage-centre-estivage-adherent/view-adherent/estivage-centre-estivage-view-adherent.component';
import { EstivageCentreEstivageListAdherentComponent } from './estivage-centre-estivage-adherent/list-adherent/estivage-centre-estivage-list-adherent.component';
import { EstivageCentreEstivageAdherentComponent } from './estivage-centre-estivage-adherent/estivage-centre-estivage-adherent.component';
import { EtatProjetCreateAdherentComponent } from './etat-projet-adherent/create-adherent/etat-projet-create-adherent.component';
import { EtatProjetEditAdherentComponent } from './etat-projet-adherent/edit-adherent/etat-projet-edit-adherent.component';
import { EtatProjetViewAdherentComponent } from './etat-projet-adherent/view-adherent/etat-projet-view-adherent.component';
import { EtatProjetListAdherentComponent } from './etat-projet-adherent/list-adherent/etat-projet-list-adherent.component';
import { EtatProjetAdherentComponent } from './etat-projet-adherent/etat-projet-adherent.component';
import { QualiteCreateAdherentComponent } from './qualite-adherent/create-adherent/qualite-create-adherent.component';
import { QualiteEditAdherentComponent } from './qualite-adherent/edit-adherent/qualite-edit-adherent.component';
import { QualiteViewAdherentComponent } from './qualite-adherent/view-adherent/qualite-view-adherent.component';
import { QualiteListAdherentComponent } from './qualite-adherent/list-adherent/qualite-list-adherent.component';
import { QualiteAdherentComponent } from './qualite-adherent/qualite-adherent.component';
import { RendezVousCreateAdherentComponent } from './rendez-vous-adherent/create-adherent/rendez-vous-create-adherent.component';
import { RendezVousEditAdherentComponent } from './rendez-vous-adherent/edit-adherent/rendez-vous-edit-adherent.component';
import { RendezVousViewAdherentComponent } from './rendez-vous-adherent/view-adherent/rendez-vous-view-adherent.component';
import { RendezVousListAdherentComponent } from './rendez-vous-adherent/list-adherent/rendez-vous-list-adherent.component';
import { RendezVousAdherentComponent } from './rendez-vous-adherent/rendez-vous-adherent.component';
import { ModerateurCreateAdherentComponent } from './moderateur-adherent/create-adherent/moderateur-create-adherent.component';
import { ModerateurEditAdherentComponent } from './moderateur-adherent/edit-adherent/moderateur-edit-adherent.component';
import { ModerateurViewAdherentComponent } from './moderateur-adherent/view-adherent/moderateur-view-adherent.component';
import { ModerateurListAdherentComponent } from './moderateur-adherent/list-adherent/moderateur-list-adherent.component';
import { ModerateurAdherentComponent } from './moderateur-adherent/moderateur-adherent.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
  declarations: [

    AdherentCreateAdherentComponent,
    AdherentListAdherentComponent,
    AdherentViewAdherentComponent,
    AdherentEditAdherentComponent,
    AdherentAdherentComponent,
    DemandeEstivageCreateAdherentComponent,
    DemandeEstivageListAdherentComponent,
    DemandeEstivageViewAdherentComponent,
    DemandeEstivageEditAdherentComponent,
    DemandeEstivageAdherentComponent,
    EtatReclamationCreateAdherentComponent,
    EtatReclamationListAdherentComponent,
    EtatReclamationViewAdherentComponent,
    EtatReclamationEditAdherentComponent,
    EtatReclamationAdherentComponent,
    EstivageCreateAdherentComponent,
    EstivageListAdherentComponent,
    EstivageViewAdherentComponent,
    EstivageEditAdherentComponent,
    EstivageAdherentComponent,
    VilleCreateAdherentComponent,
    VilleListAdherentComponent,
    VilleViewAdherentComponent,
    VilleEditAdherentComponent,
    VilleAdherentComponent,
    ProfilCreateAdherentComponent,
    ProfilListAdherentComponent,
    ProfilViewAdherentComponent,
    ProfilEditAdherentComponent,
    ProfilAdherentComponent,
    ConventionCreateAdherentComponent,
    ConventionListAdherentComponent,
    ConventionViewAdherentComponent,
    ConventionEditAdherentComponent,
    ConventionAdherentComponent,
    ImpressionCarteCreateAdherentComponent,
    ImpressionCarteListAdherentComponent,
    ImpressionCarteViewAdherentComponent,
    ImpressionCarteEditAdherentComponent,
    ImpressionCarteAdherentComponent,
    PieceJointeEstivageCreateAdherentComponent,
    PieceJointeEstivageListAdherentComponent,
    PieceJointeEstivageViewAdherentComponent,
    PieceJointeEstivageEditAdherentComponent,
    PieceJointeEstivageAdherentComponent,
    ProduitCreateAdherentComponent,
    ProduitListAdherentComponent,
    ProduitViewAdherentComponent,
    ProduitEditAdherentComponent,
    ProduitAdherentComponent,
    StatutCreateAdherentComponent,
    StatutListAdherentComponent,
    StatutViewAdherentComponent,
    StatutEditAdherentComponent,
    StatutAdherentComponent,
    EtatCarteCreateAdherentComponent,
    EtatCarteListAdherentComponent,
    EtatCarteViewAdherentComponent,
    EtatCarteEditAdherentComponent,
    EtatCarteAdherentComponent,
    RegionCreateAdherentComponent,
    RegionListAdherentComponent,
    RegionViewAdherentComponent,
    RegionEditAdherentComponent,
    RegionAdherentComponent,
    TacheCreateAdherentComponent,
    TacheListAdherentComponent,
    TacheViewAdherentComponent,
    TacheEditAdherentComponent,
    TacheAdherentComponent,
    ReclamationCreateAdherentComponent,
    ReclamationListAdherentComponent,
    ReclamationViewAdherentComponent,
    ReclamationEditAdherentComponent,
    ReclamationAdherentComponent,
    SituationModerateurCreateAdherentComponent,
    SituationModerateurListAdherentComponent,
    SituationModerateurViewAdherentComponent,
    SituationModerateurEditAdherentComponent,
    SituationModerateurAdherentComponent,
    EtatPrestationCreateAdherentComponent,
    EtatPrestationListAdherentComponent,
    EtatPrestationViewAdherentComponent,
    EtatPrestationEditAdherentComponent,
    EtatPrestationAdherentComponent,
    EnfantCreateAdherentComponent,
    EnfantListAdherentComponent,
    EnfantViewAdherentComponent,
    EnfantEditAdherentComponent,
    EnfantAdherentComponent,
    MissionCreateAdherentComponent,
    MissionListAdherentComponent,
    MissionViewAdherentComponent,
    MissionEditAdherentComponent,
    MissionAdherentComponent,
    PieceJointeMissionCreateAdherentComponent,
    PieceJointeMissionListAdherentComponent,
    PieceJointeMissionViewAdherentComponent,
    PieceJointeMissionEditAdherentComponent,
    PieceJointeMissionAdherentComponent,
    DemandeEstivageCentreCreateAdherentComponent,
    DemandeEstivageCentreListAdherentComponent,
    DemandeEstivageCentreViewAdherentComponent,
    DemandeEstivageCentreEditAdherentComponent,
    DemandeEstivageCentreAdherentComponent,
    NiveauImportanceCreateAdherentComponent,
    NiveauImportanceListAdherentComponent,
    NiveauImportanceViewAdherentComponent,
    NiveauImportanceEditAdherentComponent,
    NiveauImportanceAdherentComponent,
    ChercheurCreateAdherentComponent,
    ChercheurListAdherentComponent,
    ChercheurViewAdherentComponent,
    ChercheurEditAdherentComponent,
    ChercheurAdherentComponent,
    PieceJointeProduitCreateAdherentComponent,
    PieceJointeProduitListAdherentComponent,
    PieceJointeProduitViewAdherentComponent,
    PieceJointeProduitEditAdherentComponent,
    PieceJointeProduitAdherentComponent,
    ProjetCreateAdherentComponent,
    ProjetListAdherentComponent,
    ProjetViewAdherentComponent,
    ProjetEditAdherentComponent,
    ProjetAdherentComponent,
    PieceJointeConventionCreateAdherentComponent,
    PieceJointeConventionListAdherentComponent,
    PieceJointeConventionViewAdherentComponent,
    PieceJointeConventionEditAdherentComponent,
    PieceJointeConventionAdherentComponent,
    EchelonCreateAdherentComponent,
    EchelonListAdherentComponent,
    EchelonViewAdherentComponent,
    EchelonEditAdherentComponent,
    EchelonAdherentComponent,
    PrestationCreateAdherentComponent,
    PrestationListAdherentComponent,
    PrestationViewAdherentComponent,
    PrestationEditAdherentComponent,
    PrestationAdherentComponent,
    PieceJointeProjetCreateAdherentComponent,
    PieceJointeProjetListAdherentComponent,
    PieceJointeProjetViewAdherentComponent,
    PieceJointeProjetEditAdherentComponent,
    PieceJointeProjetAdherentComponent,
    PieceJointeReclamationCreateAdherentComponent,
    PieceJointeReclamationListAdherentComponent,
    PieceJointeReclamationViewAdherentComponent,
    PieceJointeReclamationEditAdherentComponent,
    PieceJointeReclamationAdherentComponent,
    EchelleCreateAdherentComponent,
    EchelleListAdherentComponent,
    EchelleViewAdherentComponent,
    EchelleEditAdherentComponent,
    EchelleAdherentComponent,
    TypePrestationCreateAdherentComponent,
    TypePrestationListAdherentComponent,
    TypePrestationViewAdherentComponent,
    TypePrestationEditAdherentComponent,
    TypePrestationAdherentComponent,
    OrganismeCreateAdherentComponent,
    OrganismeListAdherentComponent,
    OrganismeViewAdherentComponent,
    OrganismeEditAdherentComponent,
    OrganismeAdherentComponent,
    EtatTacheCreateAdherentComponent,
    EtatTacheListAdherentComponent,
    EtatTacheViewAdherentComponent,
    EtatTacheEditAdherentComponent,
    EtatTacheAdherentComponent,
    ConjointCreateAdherentComponent,
    ConjointListAdherentComponent,
    ConjointViewAdherentComponent,
    ConjointEditAdherentComponent,
    ConjointAdherentComponent,
    PieceJointeRendezVousCreateAdherentComponent,
    PieceJointeRendezVousListAdherentComponent,
    PieceJointeRendezVousViewAdherentComponent,
    PieceJointeRendezVousEditAdherentComponent,
    PieceJointeRendezVousAdherentComponent,
    PieceJointePrestationCreateAdherentComponent,
    PieceJointePrestationListAdherentComponent,
    PieceJointePrestationViewAdherentComponent,
    PieceJointePrestationEditAdherentComponent,
    PieceJointePrestationAdherentComponent,
    CentreEstivageCreateAdherentComponent,
    CentreEstivageListAdherentComponent,
    CentreEstivageViewAdherentComponent,
    CentreEstivageEditAdherentComponent,
    CentreEstivageAdherentComponent,
    PieceJointeAdherentCreateAdherentComponent,
    PieceJointeAdherentListAdherentComponent,
    PieceJointeAdherentViewAdherentComponent,
    PieceJointeAdherentEditAdherentComponent,
    PieceJointeAdherentAdherentComponent,
    GestionReclamationCreateAdherentComponent,
    GestionReclamationListAdherentComponent,
    GestionReclamationViewAdherentComponent,
    GestionReclamationEditAdherentComponent,
    GestionReclamationAdherentComponent,
    FonctionCreateAdherentComponent,
    FonctionListAdherentComponent,
    FonctionViewAdherentComponent,
    FonctionEditAdherentComponent,
    FonctionAdherentComponent,
    EtatDemandeEstivageCreateAdherentComponent,
    EtatDemandeEstivageListAdherentComponent,
    EtatDemandeEstivageViewAdherentComponent,
    EtatDemandeEstivageEditAdherentComponent,
    EtatDemandeEstivageAdherentComponent,
    GradeCreateAdherentComponent,
    GradeListAdherentComponent,
    GradeViewAdherentComponent,
    GradeEditAdherentComponent,
    GradeAdherentComponent,
    EstivageCentreEstivageCreateAdherentComponent,
    EstivageCentreEstivageListAdherentComponent,
    EstivageCentreEstivageViewAdherentComponent,
    EstivageCentreEstivageEditAdherentComponent,
    EstivageCentreEstivageAdherentComponent,
    EtatProjetCreateAdherentComponent,
    EtatProjetListAdherentComponent,
    EtatProjetViewAdherentComponent,
    EtatProjetEditAdherentComponent,
    EtatProjetAdherentComponent,
    QualiteCreateAdherentComponent,
    QualiteListAdherentComponent,
    QualiteViewAdherentComponent,
    QualiteEditAdherentComponent,
    QualiteAdherentComponent,
    RendezVousCreateAdherentComponent,
    RendezVousListAdherentComponent,
    RendezVousViewAdherentComponent,
    RendezVousEditAdherentComponent,
    RendezVousAdherentComponent,
    ModerateurCreateAdherentComponent,
    ModerateurListAdherentComponent,
    ModerateurViewAdherentComponent,
    ModerateurEditAdherentComponent,
    ModerateurAdherentComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
  ],
  exports: [
  AdherentCreateAdherentComponent,
  AdherentListAdherentComponent,
  AdherentViewAdherentComponent,
  AdherentEditAdherentComponent,
  AdherentAdherentComponent,
  DemandeEstivageCreateAdherentComponent,
  DemandeEstivageListAdherentComponent,
  DemandeEstivageViewAdherentComponent,
  DemandeEstivageEditAdherentComponent,
  DemandeEstivageAdherentComponent,
  EtatReclamationCreateAdherentComponent,
  EtatReclamationListAdherentComponent,
  EtatReclamationViewAdherentComponent,
  EtatReclamationEditAdherentComponent,
  EtatReclamationAdherentComponent,
  EstivageCreateAdherentComponent,
  EstivageListAdherentComponent,
  EstivageViewAdherentComponent,
  EstivageEditAdherentComponent,
  EstivageAdherentComponent,
  VilleCreateAdherentComponent,
  VilleListAdherentComponent,
  VilleViewAdherentComponent,
  VilleEditAdherentComponent,
  VilleAdherentComponent,
  ProfilCreateAdherentComponent,
  ProfilListAdherentComponent,
  ProfilViewAdherentComponent,
  ProfilEditAdherentComponent,
  ProfilAdherentComponent,
  ConventionCreateAdherentComponent,
  ConventionListAdherentComponent,
  ConventionViewAdherentComponent,
  ConventionEditAdherentComponent,
  ConventionAdherentComponent,
  ImpressionCarteCreateAdherentComponent,
  ImpressionCarteListAdherentComponent,
  ImpressionCarteViewAdherentComponent,
  ImpressionCarteEditAdherentComponent,
  ImpressionCarteAdherentComponent,
  PieceJointeEstivageCreateAdherentComponent,
  PieceJointeEstivageListAdherentComponent,
  PieceJointeEstivageViewAdherentComponent,
  PieceJointeEstivageEditAdherentComponent,
  PieceJointeEstivageAdherentComponent,
  ProduitCreateAdherentComponent,
  ProduitListAdherentComponent,
  ProduitViewAdherentComponent,
  ProduitEditAdherentComponent,
  ProduitAdherentComponent,
  StatutCreateAdherentComponent,
  StatutListAdherentComponent,
  StatutViewAdherentComponent,
  StatutEditAdherentComponent,
  StatutAdherentComponent,
  EtatCarteCreateAdherentComponent,
  EtatCarteListAdherentComponent,
  EtatCarteViewAdherentComponent,
  EtatCarteEditAdherentComponent,
  EtatCarteAdherentComponent,
  RegionCreateAdherentComponent,
  RegionListAdherentComponent,
  RegionViewAdherentComponent,
  RegionEditAdherentComponent,
  RegionAdherentComponent,
  TacheCreateAdherentComponent,
  TacheListAdherentComponent,
  TacheViewAdherentComponent,
  TacheEditAdherentComponent,
  TacheAdherentComponent,
  ReclamationCreateAdherentComponent,
  ReclamationListAdherentComponent,
  ReclamationViewAdherentComponent,
  ReclamationEditAdherentComponent,
  ReclamationAdherentComponent,
  SituationModerateurCreateAdherentComponent,
  SituationModerateurListAdherentComponent,
  SituationModerateurViewAdherentComponent,
  SituationModerateurEditAdherentComponent,
  SituationModerateurAdherentComponent,
  EtatPrestationCreateAdherentComponent,
  EtatPrestationListAdherentComponent,
  EtatPrestationViewAdherentComponent,
  EtatPrestationEditAdherentComponent,
  EtatPrestationAdherentComponent,
  EnfantCreateAdherentComponent,
  EnfantListAdherentComponent,
  EnfantViewAdherentComponent,
  EnfantEditAdherentComponent,
  EnfantAdherentComponent,
  MissionCreateAdherentComponent,
  MissionListAdherentComponent,
  MissionViewAdherentComponent,
  MissionEditAdherentComponent,
  MissionAdherentComponent,
  PieceJointeMissionCreateAdherentComponent,
  PieceJointeMissionListAdherentComponent,
  PieceJointeMissionViewAdherentComponent,
  PieceJointeMissionEditAdherentComponent,
  PieceJointeMissionAdherentComponent,
  DemandeEstivageCentreCreateAdherentComponent,
  DemandeEstivageCentreListAdherentComponent,
  DemandeEstivageCentreViewAdherentComponent,
  DemandeEstivageCentreEditAdherentComponent,
  DemandeEstivageCentreAdherentComponent,
  NiveauImportanceCreateAdherentComponent,
  NiveauImportanceListAdherentComponent,
  NiveauImportanceViewAdherentComponent,
  NiveauImportanceEditAdherentComponent,
  NiveauImportanceAdherentComponent,
  ChercheurCreateAdherentComponent,
  ChercheurListAdherentComponent,
  ChercheurViewAdherentComponent,
  ChercheurEditAdherentComponent,
  ChercheurAdherentComponent,
  PieceJointeProduitCreateAdherentComponent,
  PieceJointeProduitListAdherentComponent,
  PieceJointeProduitViewAdherentComponent,
  PieceJointeProduitEditAdherentComponent,
  PieceJointeProduitAdherentComponent,
  ProjetCreateAdherentComponent,
  ProjetListAdherentComponent,
  ProjetViewAdherentComponent,
  ProjetEditAdherentComponent,
  ProjetAdherentComponent,
  PieceJointeConventionCreateAdherentComponent,
  PieceJointeConventionListAdherentComponent,
  PieceJointeConventionViewAdherentComponent,
  PieceJointeConventionEditAdherentComponent,
  PieceJointeConventionAdherentComponent,
  EchelonCreateAdherentComponent,
  EchelonListAdherentComponent,
  EchelonViewAdherentComponent,
  EchelonEditAdherentComponent,
  EchelonAdherentComponent,
  PrestationCreateAdherentComponent,
  PrestationListAdherentComponent,
  PrestationViewAdherentComponent,
  PrestationEditAdherentComponent,
  PrestationAdherentComponent,
  PieceJointeProjetCreateAdherentComponent,
  PieceJointeProjetListAdherentComponent,
  PieceJointeProjetViewAdherentComponent,
  PieceJointeProjetEditAdherentComponent,
  PieceJointeProjetAdherentComponent,
  PieceJointeReclamationCreateAdherentComponent,
  PieceJointeReclamationListAdherentComponent,
  PieceJointeReclamationViewAdherentComponent,
  PieceJointeReclamationEditAdherentComponent,
  PieceJointeReclamationAdherentComponent,
  EchelleCreateAdherentComponent,
  EchelleListAdherentComponent,
  EchelleViewAdherentComponent,
  EchelleEditAdherentComponent,
  EchelleAdherentComponent,
  TypePrestationCreateAdherentComponent,
  TypePrestationListAdherentComponent,
  TypePrestationViewAdherentComponent,
  TypePrestationEditAdherentComponent,
  TypePrestationAdherentComponent,
  OrganismeCreateAdherentComponent,
  OrganismeListAdherentComponent,
  OrganismeViewAdherentComponent,
  OrganismeEditAdherentComponent,
  OrganismeAdherentComponent,
  EtatTacheCreateAdherentComponent,
  EtatTacheListAdherentComponent,
  EtatTacheViewAdherentComponent,
  EtatTacheEditAdherentComponent,
  EtatTacheAdherentComponent,
  ConjointCreateAdherentComponent,
  ConjointListAdherentComponent,
  ConjointViewAdherentComponent,
  ConjointEditAdherentComponent,
  ConjointAdherentComponent,
  PieceJointeRendezVousCreateAdherentComponent,
  PieceJointeRendezVousListAdherentComponent,
  PieceJointeRendezVousViewAdherentComponent,
  PieceJointeRendezVousEditAdherentComponent,
  PieceJointeRendezVousAdherentComponent,
  PieceJointePrestationCreateAdherentComponent,
  PieceJointePrestationListAdherentComponent,
  PieceJointePrestationViewAdherentComponent,
  PieceJointePrestationEditAdherentComponent,
  PieceJointePrestationAdherentComponent,
  CentreEstivageCreateAdherentComponent,
  CentreEstivageListAdherentComponent,
  CentreEstivageViewAdherentComponent,
  CentreEstivageEditAdherentComponent,
  CentreEstivageAdherentComponent,
  PieceJointeAdherentCreateAdherentComponent,
  PieceJointeAdherentListAdherentComponent,
  PieceJointeAdherentViewAdherentComponent,
  PieceJointeAdherentEditAdherentComponent,
  PieceJointeAdherentAdherentComponent,
  GestionReclamationCreateAdherentComponent,
  GestionReclamationListAdherentComponent,
  GestionReclamationViewAdherentComponent,
  GestionReclamationEditAdherentComponent,
  GestionReclamationAdherentComponent,
  FonctionCreateAdherentComponent,
  FonctionListAdherentComponent,
  FonctionViewAdherentComponent,
  FonctionEditAdherentComponent,
  FonctionAdherentComponent,
  EtatDemandeEstivageCreateAdherentComponent,
  EtatDemandeEstivageListAdherentComponent,
  EtatDemandeEstivageViewAdherentComponent,
  EtatDemandeEstivageEditAdherentComponent,
  EtatDemandeEstivageAdherentComponent,
  GradeCreateAdherentComponent,
  GradeListAdherentComponent,
  GradeViewAdherentComponent,
  GradeEditAdherentComponent,
  GradeAdherentComponent,
  EstivageCentreEstivageCreateAdherentComponent,
  EstivageCentreEstivageListAdherentComponent,
  EstivageCentreEstivageViewAdherentComponent,
  EstivageCentreEstivageEditAdherentComponent,
  EstivageCentreEstivageAdherentComponent,
  EtatProjetCreateAdherentComponent,
  EtatProjetListAdherentComponent,
  EtatProjetViewAdherentComponent,
  EtatProjetEditAdherentComponent,
  EtatProjetAdherentComponent,
  QualiteCreateAdherentComponent,
  QualiteListAdherentComponent,
  QualiteViewAdherentComponent,
  QualiteEditAdherentComponent,
  QualiteAdherentComponent,
  RendezVousCreateAdherentComponent,
  RendezVousListAdherentComponent,
  RendezVousViewAdherentComponent,
  RendezVousEditAdherentComponent,
  RendezVousAdherentComponent,
  ModerateurCreateAdherentComponent,
  ModerateurListAdherentComponent,
  ModerateurViewAdherentComponent,
  ModerateurEditAdherentComponent,
  ModerateurAdherentComponent,
  ],
  entryComponents: [],
})
export class FondationAdherentModule { }
