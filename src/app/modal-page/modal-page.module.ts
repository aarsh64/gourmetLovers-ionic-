import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NgbModule,NgbDate,NgbModal,
  ModalDismissReasons,} from '@ng-bootstrap/ng-bootstrap';
import { ModalPagePage } from './modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    NgbDate,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPagePage]
})
export class ModalPagePageModule {}
