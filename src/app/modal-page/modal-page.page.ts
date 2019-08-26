import { Component, OnInit, NgZone, ElementRef } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import * as googleMaps from "@google/maps";
import * as geofirex from "geofirex";
import {
  NgbModal,
  ModalDismissReasons,
  NgbRatingConfig,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
// import { GeoFireClient } from "geofirex";
// import * as geofirex from "geofirex";
import * as firebaseApp from "firebase/app";
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: "app-modal-page",
  templateUrl: "./modal-page.page.html",
  styleUrls: ["./modal-page.page.scss"]
})
export class ModalPagePage implements OnInit {

coffeeshop:boolean = false;
fastfood:boolean = false;
desserts:boolean = false;

  public  categories=[
    {name:'Coffee Shop',isChecked:'false'},
    {name:'Italian:',isChecked:'false'},
    {name:'Chinese',isChecked:'false'},
    {name:'Fast Food',isChecked:'false'},
    {name:'Dessert',isChecked:'false'},
   
  ]
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = [
    "s\u00f8n",
    "man",
    "tir",
    "ons",
    "tor",
    "fre",
    "l\u00f8r"
  ];
  customPickerOptions: any;
  submitForm: any;
  fileRef: any;
  ranking: any;
  restaurantsName: any;
  usersCustomerId: string;
  imageURL: any;
  imageName: any;



  // Regarding google location....
  public searchElementRef: ElementRef;
  lng: any;
  lat: any;
  center: any;
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public searchControl: FormControl;
  public zoom: number;
  Location: any;
  closeResult: string;
  //GeoFireX
  geo = geofirex.init(firebaseApp);
  points: Observable<any>;
  radius = new BehaviorSubject(0.5);
  geoPoint: geofirex.GeoFirePoint;
  //----------
  
 
  constructor(
    private modalCotroller: ModalController,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private ngZone: NgZone, // private google:GooglePlaceModule,
    private modalService: NgbModal,
    public loader: LoadingController
  ) {
    this.submitForm = new FormGroup({
      name: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      rating: new FormControl("", Validators.required),
      image: new FormControl("", Validators.required),
      date: new FormControl('',Validators.required),
      coffeeshop: new FormControl('',Validators.required),
      fastfood: new FormControl('',Validators.required),
      desserts: new FormControl('',Validators.required)
    });

    this.customPickerOptions = {
      buttons: [
        {
          text: "Save",
          handler: () => console.log("Clicked Save!")
        },
        {
          text: "Log",
          handler: () => {
            console.log("Clicked Log. Do not Dismiss.");
            return false;
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

  }
  async submit() {
    console.log(this.submitForm.value.date);
         //....................For loader(initialization)...........................

         let load1 = await this.loader.create({
          message: "loading...",
          spinner:'bubbles'
        });
        await load1.present();
        if(this.submitForm.value.desserts == true){
          this.submitForm.value.coffeeshop = false;
          this.submitForm.value.fastfood = false;
        }

        if(this.submitForm.value.coffeeshop == true){
          this.submitForm.value.desserts = false;
          this.submitForm.value.fastfood = false;
        }
        if(this.submitForm.value.fastfood == true){
          this.submitForm.value.desserts = false;
          this.submitForm.value.coffeeshop = false;
        }


    const cities = this.geo.collection("placePointsIonic");
    this.restaurantsName = this.submitForm.value.name;
    this.ranking = this.submitForm.value.rating;
    const filePath = this.fileRef.name;

    const task = this.storage
      .upload(filePath, this.fileRef)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.afAuth.authState.subscribe(auth => {
          this.usersCustomerId = auth.uid;

          this.db
            .collection("restaurantsIonic")
            .add({
              name: this.restaurantsName,
              image: downloadURL,
              rating: this.ranking,
              location: this.Location,
              date:this.submitForm.value.date,
              uid: this.usersCustomerId,
              favourites: false,
              users: [],
              coffeeshop: this.submitForm.value.coffeeshop,
              fastfood: this.submitForm.value.fastfood,
              desserts: this.submitForm.value.desserts
            })
            .catch(err => {
              console.log(err); console.log('location',this.Location);
              // this.submitData = true;
              // this.toastr.error(err);
            });
          cities
          .add({
            name: this.restaurantsName,
            image: downloadURL,
            rating: this.ranking,
            location: this.Location,
            position: this.geoPoint.data
          })
          .then(x => console.log(x))
          .catch(y => {
            console.log('City points added!');
            // this.toastr.error(y);
            // this.submitData = true;
          });
            load1.dismiss();
          // this.submitData = true;
          // this.toastr.info("Data has been recorded!");
          this.imageURL = downloadURL;
          return downloadURL;
        });
      })
      .catch(err => {
        console.log(err);
      });

    // this.submitForm.reset();
     this.modalCotroller.dismiss();
  }


  
  public handleAddressChange1(address: any) {
    this.Location = address.formatted_address;
    console.log(this.Location);
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
     this.geoPoint = this.geo.point(this.lng, this.lat);
  }
  uploadFile(event) {
    const file = event.target.files[0];
    this.fileRef = file;
    this.imageName = file.name;
  }

  async closeModal() {
    await this.modalCotroller.dismiss();
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
   //.............Following function will help to close the modal..................................

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
