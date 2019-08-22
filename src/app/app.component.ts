import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    { 
      title: 'Login',
      url:'/login',
      icon:'lock',
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Places',
      url: '/myplaces',
      icon: 'contact'
    },
    {
      title:'Favoutites',
      url:'/favourites',
      icon:'heart'
    },
    {
      title:'TopRated',
      url:'/toprated',
      icon:'star'
    },
    {
      title:'Logout',
      url:'/logout',
      icon:'power'
    }  
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
