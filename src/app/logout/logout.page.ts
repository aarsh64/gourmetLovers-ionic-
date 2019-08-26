import { Component, OnInit, Directive } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  // afAuth: any;
  uid:any;
  constructor(private afAuth:AngularFireAuth,private router:Router,private db:AngularFirestore) { 
   }
  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      this.uid = auth.uid;
    });
     this.afAuth.auth.signOut();
   
    this.router.navigate(['/login']);
  }
}
