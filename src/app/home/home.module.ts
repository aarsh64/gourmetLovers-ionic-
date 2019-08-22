import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from "@agm/core"; //For Google Maps
import { GooglePlaceModule } from "ngx-google-places-autocomplete"; //For auto-complete 
import { HomePage } from './home.page';
import { MapsAPILoader } from '@agm/core';
import { } from '@google/maps';
import { IonicRatingModule } from 'ionic-rating';
import { ModalPagePage } from '../modal-page/modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    IonicRatingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCEqAIFrdKSkWDM3BOkgQ8vgODNp8G2Oig",
      libraries: ["places"]
    }),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,ModalPagePage],
  entryComponents:[ModalPagePage]
})
export class HomePageModule {}
