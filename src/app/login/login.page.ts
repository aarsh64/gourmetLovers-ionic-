import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit() {
  }

  loginForm : any;
  // afAuth: any;
  constructor(public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    private loader: LoadingController,
    private router: Router) { 
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ])
    }); 
  }

 async login() {
    // this.loaduser = true;
    let load = await this.loader.create({
      message:'loading...',
      spinner:'bubbles'
    });
    load.present();
    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(
        success => {
          this.afAuth.authState.subscribe(v => console.log("login"));
          this.router.navigate(["/home"]);
          // this.toastr.success("Logged In Successfully!");
          // this.loaduser = false;
        },
        error => {
         
          // this.toastr.error(error.message);
        }
        
      );
      load.dismiss();
    this.loginForm.reset();
  }
 async signup() {
    // this.loaduser = true;
   let load = await this.loader.create({
     message:'loading...',
     spinner:'bubbles'
   });
   load.present();

    this.db
      .collection("users")
      .add({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
      .then(success => {
        console.log("success", success);
        // this.toastr.info('acc');
      })
      .catch(err => {
        console.log(err);
        // this.toastr.error(err.message);
        // this.loaduser = false;
      });
      load.dismiss();

    return this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(success => {
        console.log("success", success);
        this.loginForm.reset();
        // this.toastr.info("Account Successfully Created.");
        this.router.navigate(["/home"]);
      });
     }
}
