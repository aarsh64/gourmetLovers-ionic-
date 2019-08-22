import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { IonicModule } from '@ionic/angular';

import { TopratedPage } from './toprated.page';

const routes: Routes = [
  {
    path: '',
    component: TopratedPage
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
  declarations: [TopratedPage]
})
export class TopratedPageModule {}
