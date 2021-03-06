import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, MapsAPILoader } from "@agm/core"; //For Google Maps

import { MyplacesPage } from './myplaces.page';

const routes: Routes = [
  {
    path: '',
    component: MyplacesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyplacesPage]
})
export class MyplacesPageModule {}
