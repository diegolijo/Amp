import { TubeAmp_a } from './../clases/TubeAmp_a';
import { Component } from '@angular/core';
import { constants } from 'buffer';
import { IfStmt } from '@angular/compiler';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  app: any = {
    titulo: "Tube calculator",
  };

  t1Select: boolean = true;
  t2Select: boolean = false;
  rtSelect: boolean = true;
  ziSelect: boolean = false;

  amp: TubeAmp_a;


  constructor(
    tubeAmp: TubeAmp_a,
  ) {
    this.amp = tubeAmp;
  }

  ngOnInit() {
    document.body.setAttribute('data-theme', 'light');
    //  document.body.classList.toggle( 'dark' );
  }

  badgeSelected(key: string) {
    switch (key) {
      case 'RT':
        this.rtSelect = false;
        this.ziSelect = false;
        this.t1Select = true;
        this.t2Select = true;
        break;
      case 'T1':
        this.rtSelect = true;
        this.ziSelect = true;
        this.t1Select = false;
        this.t2Select = true;
        break;
      case 'T2':
        this.rtSelect = true;
        this.ziSelect = true;
        this.t1Select = true;
        this.t2Select = false;
        break;
      case 'Zi':
        this.ziSelect = false;
        this.rtSelect = false;
        this.t1Select = true;
        this.t2Select = true;
        break;
      default:
        break;
    }

  }

  rangeSelected(key: string) {
    switch (key) {
      case 'RT':
        this.rtSelect = true;
        if (this.t1Select == true) {
          this.t2Select = false;
        } else if (this.t2Select == true) {
          this.t1Select = false;
        }
        if (this.ziSelect == true) {
          this.ziSelect = false;
        }
        break;
      case 'T1':
        this.t1Select = true;
        if (this.rtSelect == true) {
          this.t2Select = false;
        }
        break;
      case 'T2':
        this.t2Select = true;
        if (this.rtSelect == true) {
          this.t1Select = false;
        }
        break;
      case 'Zi':
        this.ziSelect = true;
        if (this.t2Select == true && this.t1Select == true) {
          this.t1Select != this.t1Select;
        }
        if (this.t2Select == false && this.t1Select == false) {
          this.t1Select != this.t1Select;
        }
        break;
      default:
        break;
    }

  }




  public onChangeZSEC() {
      this.amp.setRtZ();  
  }

  public onChangeZPRI() {
    this.rangeSelected('Zi');
    this.rtSelect = false;
    this.amp.setRtZ();

    if (this.t1Select == false) {
      this.amp.setT1z();
    } else {
      this.amp.setT2z();
    }

  }


  public onChangePRI() {
    if (this.rtSelect == true) {
      this.rangeSelected('T1');
      this.amp.setT2();
    } else {
      this.amp.setRT();
      this.amp.setZi();
    }
  }


  public onChangeSEC() {
    if (this.rtSelect == true) {
      this.rangeSelected('T2');
      this.amp.setT1();
    } else {
      this.amp.setRtZ();
    //  this.amp.setZi();
    }
  }



  public onChangeRT() {
    this.rangeSelected('RT');
    if (this.rtSelect == true) {
      if (this.t2Select == true) {
        this.amp.setT1();
      } else {
        this.amp.setT2();
      }
      this.amp.setZi();
    }
  }






  public onChangeP() {
  }

}



