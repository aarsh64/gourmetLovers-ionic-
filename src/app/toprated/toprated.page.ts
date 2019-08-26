import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-toprated',
  templateUrl: './toprated.page.html',
  styleUrls: ['./toprated.page.scss'],
})
export class TopratedPage implements OnInit {
    restaurantDetails=[];
  constructor(private db:AngularFirestore,public loader:LoadingController) { }

 async ngOnInit() {

    let load = await this.loader.create({
      message:'loading...',
      spinner:'bubbles'
    });
    await load.present();

    this.restaurantDetails.splice(0, this.restaurantDetails.length);

    this.db
      .collection("restaurantsIonic", ref => ref.orderBy("rating", "desc"))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(result => {
          this.restaurantDetails.push({
            name: result.data().name,
            location: result.data().location,
            rating: result.data().rating,
            image: result.data().image,
            objID: result.id
          });
          // this.loadingData = true;
        });
        // this.toastr.success("Top Rated ★ Restaurants Loaded!");
      });
      await load.dismiss(); 
  }
 
}
