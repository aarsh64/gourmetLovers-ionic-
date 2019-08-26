import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoadingController } from "@ionic/angular";
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: "app-myplaces",
  templateUrl: "./myplaces.page.html",
  styleUrls: ["./myplaces.page.scss"]
})
export class MyplacesPage implements OnInit {
  restaurantDetails = [];
  usersCustomerId : string;
  constructor(
    private db: AngularFirestore,
    private loader: LoadingController,
    private afAuth:AngularFireAuth,
  ) {}

  async ngOnInit() {
    let load = await this.loader.create({
      message: "loading My Places...",
      spinner: "bubbles"
    });
    await load.present();


    this.restaurantDetails.splice(0, this.restaurantDetails.length);

    this.afAuth.authState.subscribe(auth => {
      this.usersCustomerId = auth.uid;

      this.db
        .collection("restaurantsIonic", ref =>
          ref.where("uid", "==", this.usersCustomerId)
        )
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
            });
        });
        load.dismiss();
    });

  }
}