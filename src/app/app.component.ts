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
  darkMode: boolean = true;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);

    }
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      this.darkMode = prefersDark.matches;
      this.setAppTheme(this.darkMode);

      this.statusBar.styleDefault();
      this.splashScreen.hide();



    });
  }


  public setAppTheme(dark: boolean) {
/*     if (dark) {
      document.body.setAttribute('color-theme', 'dark');
      return;
    } */
    document.body.setAttribute('color-theme', 'light');
    document.body.setAttribute('data-theme', 'light');    
  }

}
