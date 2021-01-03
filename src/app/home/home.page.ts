import { TubeAmp_a } from './../clases/TubeAmp_a';
import { Component } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  apli: any = {
    titulo: "Tube calculator",
  };

  amp: TubeAmp_a;

  constructor(
    tubeAmp: TubeAmp_a,
    ) {
    this.amp = tubeAmp;
  }





  
}



