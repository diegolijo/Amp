import { File } from '@ionic-native/file/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TubeAmpA } from './clases/TubeAmp_a';
import { Helper } from './clases/Helper';
import { ChartsModule } from 'ng2-charts';
import { Camera } from '@ionic-native/camera/ngx';
import { Foto } from './clases/Foto';
import { WebView } from '@ionic-native/ionic-webview/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ChartsModule],
  providers: [
    StatusBar,
    SplashScreen,
    TubeAmpA,
    Helper,
    Camera,
    Foto,
    File,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
