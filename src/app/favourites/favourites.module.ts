import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { IonicModule } from '@ionic/angular';

import { FavouritesPage } from './favourites.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesPage
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
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
