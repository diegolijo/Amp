import { TubeAmpA } from './../clases/TubeAmp_a';
import { Component, OnInit } from '@angular/core';
import { constants } from 'buffer';
import { IfStmt } from '@angular/compiler';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  app: any = {
    titulo: 'Tube calculator',
  };

  t1Select = true;
  t2Select = false;
  rtSelect = true;
  ziSelect = false;
  viSelect = false;

  amp: TubeAmpA;

  darkMode = true;


  constructor(
    public tubeAmp: TubeAmpA,
  ) {
    this.amp = tubeAmp;
    document.body.setAttribute('color-theme', 'dark');
    this.onChangeZSEC();
  }

  ngOnInit() {
  }


  public setAppTheme(dark: boolean) {
    if (dark) {
      document.body.setAttribute('color-theme', 'dark');
      return;
    }
    document.body.setAttribute('color-theme', 'light');
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
      case 'VI':
        this.viSelect = false;
        break;
      default:
        break;
    }

  }

  rangeSelected(key: string) {
    switch (key) {
      case 'RT':
        this.rtSelect = true;
        if (this.t1Select === true) {
          this.t2Select = false;
        } else if (this.t2Select === true) {
          this.t1Select = false;
        }
        if (this.ziSelect === true) {
          this.ziSelect = false;
        }
        break;
      case 'T1':
        this.t1Select = true;
        if (this.rtSelect !== this.ziSelect) {
          this.t2Select = false;
        }
        break;
      case 'T2':
        this.t2Select = true;
        if (this.rtSelect !== this.ziSelect) {
          this.t1Select = false;
        }
        break;
      case 'Zi':
        this.ziSelect = true;
        if (this.t2Select === true && this.t1Select === true) {
          this.t1Select = !this.t1Select;
        }
        if (this.t2Select === false && this.t1Select === false) {
          this.t1Select = !this.t1Select;
        }
        break;
      default:
        break;
    }
  }

  public onChangeZRangePri() {
    this.amp.setRangePri();
  }

  public onChangeZSEC() {
    if ((Number.isNaN(this.amp.impedanciaOut)) || (this.amp.impedanciaOut === 0) || this.amp.impedanciaOut === null) {
      this.amp.impedanciaIn = 0;
    } else {
      this.amp.setRtZ();
      if (this.t1Select === false) {
        this.amp.setT1z();
      } else {
        this.amp.setT2z();
      }
    }
  }

  public onChangeZPRI() {
    if ((Number.isNaN(this.amp.impedanciaIn)) || (this.amp.impedanciaIn === 0) || this.amp.impedanciaIn === null) {
   //   this.amp.impedanciaIn = 0;
    } else {
      // this.amp.impedanciaIn = this.amp.redondea10(this.amp.impedanciaIn);
      this.rangeSelected('Zi');
      this.rtSelect = false;
      this.amp.setRtZ();
      if (this.t1Select === false) {
        this.amp.setT1z();
      } else {
        this.amp.setT2z();
      }
    }
  }





  public onChangePRI() {
    if ((Number.isNaN(this.amp.turn1)) || (this.amp.turn1 === 0) || this.amp.turn1 === null) {
      this.amp.turn1 = 0;
    } else {
      if (this.ziSelect === true) {
        this.rangeSelected('T1');
        this.amp.setT2();
      }
      else if (this.rtSelect === false) {
        this.amp.setRT();
        this.amp.setZi();
      } else {
        this.amp.setT2();
        this.rangeSelected('T1');
      }
    }
  }



  public onChangeSEC() {
    if ((Number.isNaN(this.amp.turn2)) || (this.amp.turn2 === 0) || this.amp.turn2 === null) {
      this.amp.turn2 = 0;
    } else {
      if (this.ziSelect === true) {
        this.rangeSelected('T2');
        this.amp.setT1();
      } else if (this.rtSelect === false) {
        this.amp.setRT();
        this.amp.setZi();
      } else {
        this.rangeSelected('T2');
        this.amp.setT1();
      }
    }
  }


  public onChangeRT() {
    if ((Number.isNaN(this.amp.relacionTrans)) || (this.amp.relacionTrans === 0) || this.amp.relacionTrans === null) {
      this.amp.relacionTrans = 0;
    } else {
      this.rangeSelected('RT');
      if (this.rtSelect === true) {
        if (this.t2Select === true) {
          this.amp.setT1();
        } else {
          this.amp.setT2();
        }
        this.amp.setZi();
      }
    }
  }


  public onChangeVPri() {
    if ((Number.isNaN(this.amp.voltajeInPp)) || (this.amp.voltajeInPp === 0) || this.amp.voltajeInPp === null) {
      this.amp.voltajeInPp = 0;
    } else {
      this.rangeSelected('VI');
      this.amp.setV(this.amp.VI_PICO, this.amp.voltajeInDc);
    }
  }

  public onChangeVopp() {
    if ((Number.isNaN(this.amp.voltajeOutPp)) || (this.amp.voltajeOutPp === 0) || this.amp.voltajeOutPp === null) {
      this.amp.voltajeOutPp = 0;
    } else {
      this.rangeSelected('VOPP');
      this.amp.setV(this.amp.VO_PICO_PICO, this.amp.voltajeOutPp);
    }
  }

  public onChangeVorms() {
    if ((Number.isNaN(this.amp.voltajeOutRms)) || (this.amp.voltajeOutRms === 0) || this.amp.voltajeOutRms === null) {
      this.amp.voltajeOutRms = 0;
    } else {
      this.rangeSelected('VORMS');
      this.amp.setV(this.amp.VO_RNS, this.amp.voltajeOutRms);
    }
  }



  public onChangeP() {
    if ((Number.isNaN(this.amp.potenciaRms)) || (this.amp.potenciaRms === 0) || this.amp.potenciaRms === null) {
  //    this.amp.potenciaRms = 0;
    } else {
      this.amp.setVP();
    }
  }



}



