import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { Firebase } from "@ionic-native/firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireStorage } from "@angular/fire/storage";
import { AgmCoreModule, MapsAPILoader } from "@agm/core"; //For Google Maps
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FormControl } from "@angular/forms";
import { ToastController, LoadingController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import * as googleMaps from "@google/maps";
import {} from "@google/maps";
import { google } from "@agm/core/services/google-maps-types";
import { ModalController } from "@ionic/angular";
import { ModalPagePage } from "src/app/modal-page/modal-page.page";
import * as geofirex from "geofirex";
import * as firebaseApp from "firebase/app";
import {
  CollectionReference,
  QuerySnapshot,
  GeoPoint
} from "@firebase/firestore-types";
import { toGeoJSON } from "geofirex";
// import { NgOnChangesFeature, defineBase } from "@angular/core/src/render3";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { Observable, BehaviorSubject } from "rxjs";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  providers: [NgbRatingConfig]
})
export class HomePage implements OnInit {
  restaurantDetails = [];
  userscollection = [];
  // @ViewChild("search")
  public searchElementRef: ElementRef;
  lng: any;
  lat: any;
  center: any;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public searchControl: FormControl;
  public zoom: number;
  Location: any;
  date2: any;
  geoPoint: geofirex.GeoFirePoint;

  //GeoFireX
  geo = geofirex.init(firebaseApp);
  points: Observable<any>;
  radius = new BehaviorSubject(0.5);

  constructor(
    public db: AngularFirestore,
    private storage: AngularFireStorage,
    public config: NgbRatingConfig,
    public toastController: ToastController,
    private afAuth: AngularFireAuth,
    private modalController: ModalController,
    public loader: LoadingController
  ) {
    config.max = 5; //To make rating star max to 5.
    config.readonly = false;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage
    });
    return await modal.present();
  } 

  public handleAddressChange(address: any) {
    this.Location = address.formatted_address;
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
    this.geoPoint = this.geo.point(this.lng, this.lat);
    this.searchByLocation();
  }

  async ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    let load = await this.loader.create({
      message: "loading Home...",
      spinner:'bubbles'
    });
    await load.present();

    this.db
      .collection("restaurants").get().subscribe(querySnapshot => {
        querySnapshot.forEach(result => {
          this.restaurantDetails.push({
            name: result.data().name,
            location: result.data().location,
            rating: result.data().rating,
            image: result.data().image,
            coffeeshop:result.data().coffeeshop,
            desserts:result.data().desserts,
            fastfood:result.data().fastfood,
              objID: result.id,
            users: result.data().users,
            favourites: result.data().favourites
          });
        });
      });
      this.db
      .collection("restaurantsIonic").get().subscribe(querySnapshot => {
        querySnapshot.forEach(result => {
          this.restaurantDetails.push({
            name: result.data().name,
            location: result.data().location,
            rating: result.data().rating,
            image: result.data().image,
            coffeeshop:result.data().coffeeshop,
            desserts:result.data().desserts,
            fastfood:result.data().fastfood,
              objID: result.id,
            users: result.data().users,
            favourites: result.data().favourites
          });
        });
      });
    
      
    await load.dismiss();
  }
  addToFavourites(w: any, i: number) {
    this.afAuth.authState.subscribe(auth => {
       console.log('inside auth function!',auth.uid)
      if (w.users == undefined) {
      console.log('auth.uid',auth.uid);
        this.userscollection.push(auth.uid);
          this.db
            .collection("restaurantsIonic")
            .doc(w.objID)
            .update({ users: this.userscollection })
            .then(() => { console.log('added to favourites!');} )
            .catch((err) => { console.log('error!',err);
              // this.toastr.error("must be wrong while adding to favourites!");
            });
            this.db
            .collection("restaurants")
            .doc(w.objID)
            .update({ users: this.userscollection })
            .then(() => { console.log('added to favourites!');} )
            .catch((err) => { console.log('error!',err);
              // this.toastr.error("must be wrong while adding to favourites!");
            });
      } else {
        w.users.push(auth.uid);
        this.userscollection.push(w.users);
        this.db
          .collection("restaurantsIonic")
          .doc(w.objID)
          .update({ users: w.users })
          .then(() => {console.log('added to favourites!');} )
          .catch((err) => { console.log(err);
            // this.toastr.error("must be wrong while adding to favourites!");
          });
          this.db
          .collection("restaurants")
          .doc(w.objID)
          .update({ users: w.users })
          .then(() => {console.log('added to favourites!');} )
          .catch((err) => { console.log(err);
            // this.toastr.error("must be wrong while adding to favourites!");
          });
      }
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  //...........Location Based Search.........
  async searchByLocation() {

    if (this.Location == undefined) {
      console.log("No data/new data is entered!");
    }
    const collection = this.geo.collection("placePointsIonic");
    const center = this.geoPoint;
    const radius = 7.25; //........Will give restaurants within given point with radius of 5.5km
    const field = "position";
    const q = collection.within(center, radius, field);
    this.restaurantDetails.splice(0, this.restaurantDetails.length);

    //....................For loader(initialization)...........................

    let load1 = await this.loader.create({
      message: "loading"+this.Location+"near by resaurants",
      spinner:'bubbles'
    });
    await load1.present();
    // ..........................................................

    //.........The following lines will fetch the data from the database based on provided location...........
    q.subscribe(querySnapshot => {
      querySnapshot.forEach(result => {
        this.date2 = result.date;
        this.restaurantDetails.push({
          name: result.name,
          location: result.location,  
          rating: result.rating,
          image: result.image,
          objID: result.id
        });
      });
      if (this.restaurantDetails.length == 0) {
        console.log("No data right now,we will reach in this area soon!");
      } else {
      }
      this.Location = undefined;
    });
    await load1.dismiss(); //This will end the loader.....
  }


  async coffeeshop(){

    this.restaurantDetails.splice(0, this.restaurantDetails.length);
   
    //....................For loader(initialization)...........................
    
    let load1 = await this.loader.create({
      message: "loading Coffee Shops...",
      spinner:'bubbles'
    });
    await load1.present();
    // ....................................................................
    
    //..........The following lines will fetch the restaurants which are coffeeshops...........
    this.db.collection("restaurantsIonic", ref =>ref.where("coffeeshop", "==", true ))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(result => {
        this.restaurantDetails.push({
          name: result.data().name,
          location: result.data().location,
           rating: result.data().rating,
          image: result.data().image,
         });
         });
      if (this.restaurantDetails.length == 0) {
         console.log('not found!');
            }
        });
    await load1.dismiss(); //This will end the loader.....
  }

  async desserts(){

    this.restaurantDetails.splice(0, this.restaurantDetails.length);
    
     //....................For loader(initialization)...........................

     let load1 = await this.loader.create({
      message: "loading Desserts...",
      spinner:'bubbles'
    });
    await load1.present();
    // ....................................................................

    //..........The following lines will fetch the restaurants which are dessert shops...........
    
    this.db.collection("restaurantsIonic", ref =>ref.where("desserts", "==", true ))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(result => {
        this.restaurantDetails.push({
          name: result.data().name,
          location: result.data().location,
           rating: result.data().rating,
          image: result.data().image,
         });
         });
      if (this.restaurantDetails.length == 0) {
         console.log('not found!');
            }
        });
    await load1.dismiss(); //This will end the loader.....
  }

  async fastfood(){

    this.restaurantDetails.splice(0, this.restaurantDetails.length);

     //....................For loader(initialization)...........................
     let load1 = await this.loader.create({
      message: "loading Fast Foods...",
      spinner:'bubbles'
    });
    await load1.present();
    // ....................................................................

   //..........The following lines will fetch the restaurants which are fastfood shops...........
   
    this.db.collection("restaurantsIonic", ref =>ref.where("fastfood", "==", true ))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(result => {
        this.restaurantDetails.push({
          name: result.data().name,
          location: result.data().location,
           rating: result.data().rating,
          image: result.data().image,
         });
         });
      if (this.restaurantDetails.length == 0) {
         console.log('not found!');
            }
        });
    await load1.dismiss(); //This will end the loader.....
  }
}
