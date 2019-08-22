import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  // afAuth: any;
  toastr: any;
  uid:any;
  constructor(private afAuth:AngularFireAuth,private router:Router) { 
   }
  ngOnInit() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
