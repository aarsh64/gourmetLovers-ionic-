import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  usersCustomerId: string;
  restaurantDetails=[];

  constructor(private afAuth:AngularFireAuth,
              private db:AngularFirestore ,
              private loader:LoadingController) {}
 
async ngOnInit() {
  let load = await this.loader.create({
    message: "loading Favourites...",
    spinner: "bubbles"
  });
  await load.present();

    this.restaurantDetails.splice(0, this.restaurantDetails.length);

    this.afAuth.authState.subscribe(auth => {
      this.usersCustomerId = auth.uid;

       //............Query to get the user-specific favourites restaurants..............
      this.db
        .collection("restaurants", ref =>
          ref.where("users", "array-contains", this.usersCustomerId)
        )
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(result => {
            this.restaurantDetails.push({
              name: result.data().name,
              date: {
                day: result.data().date.day,
                month: result.data().date.month,
                year: result.data().date.year
              },
              location: result.data().location,
               rating: result.data().rating,
              image: result.data().image,
              favourites: result.data().favourites,
              objID: result.id
            });
            // console.log('rating',result.data().rating);
            // this.loadingData = true;
          });
          if (this.restaurantDetails.length == 0) {
            // this.loadingData = true;
            // this.toastr.info("No favourites yet!");
          } else {
            // this.toastr.success("Favourites💙 Loaded Succesfullly");
          }
        });
    });
    await load.dismiss();
  }

}
