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

  t1Result = true;
  t2Result = false;
  rtResult = true;
  ziResult = false;
  viResult = false;

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

  async ionViewWillEnter() {

  }
  async ionViewDidEnter() {
    this.getImgTube0(0);
    this.getImgTube1(0);
    this.getImgTube2(0);
    this.getImgTube3(0);
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
        this.rtResult = false;
        this.ziResult = false;
        this.t1Result = true;
        this.t2Result = true;
        break;
      case 'T1':
        this.rtResult = true;
        this.ziResult = true;
        this.t1Result = false;
        this.t2Result = true;
        break;
      case 'T2':
        this.rtResult = true;
        this.ziResult = true;
        this.t1Result = true;
        this.t2Result = false;
        break;
      case 'Zi':
        this.ziResult = false;
        this.rtResult = false;
        this.t1Result = true;
        this.t2Result = true;
        break;
      case 'VI':
        this.viResult = false;
        break;
      default:
        break;
    }

  }

  rangeSelected(key: string) {
    switch (key) {
      case 'RT':
        this.rtResult = true;
        if (this.t1Result === true) {
          this.t2Result = false;
        } else if (this.t2Result === true) {
          this.t1Result = false;
        }
        if (this.ziResult === true) {
          this.ziResult = false;
        }
        break;
      case 'T1':
        this.t1Result = true;
        if (this.rtResult !== this.ziResult) {
          this.t2Result = false;
        }
        break;
      case 'T2':
        this.t2Result = true;
        if (this.rtResult !== this.ziResult) {
          this.t1Result = false;
        }
        break;
      case 'Zi':
        this.ziResult = true;
        if (this.t2Result === true && this.t1Result === true) {
          this.t1Result = !this.t1Result;
        }
        if (this.t2Result === false && this.t1Result === false) {
          this.t1Result = !this.t1Result;
        }
        if (this.rtResult === true) {
          this.rtResult = false;
        }
        break;
      default:
        break;
    }
  }


  getImgTube3(activar: number) {
    if (activar === 0) {
      return false;
    } else {
      if (this.amp.impedanciaIn <= 1000) {
        return false;
      } else {
        return true;
      }
    }
  }

  getImgTube2(activar: number) {
    if (activar === 0) {
      return false;
    } else {
      if (this.amp.impedanciaIn > 1000 && this.amp.impedanciaIn <= 2200) {
        return false;
      } else {
        return true;
      }
    }
  }
  getImgTube1(activar: number) {
    if (activar === 0) {
      return false;
    } else {
      if (this.amp.impedanciaIn > 2200 && this.amp.impedanciaIn <= 3300) {
        return false;
      } else {
        return true;
      }
    }
  }
  getImgTube0(activar: number) {
    if (activar === 0) {
      return false;
    } else {
      if (this.amp.impedanciaIn > 3300 && this.amp.impedanciaIn < 5500) {
        return false;
      } else {
        return true;
      }
    }
  }

  showTube(val: boolean) {
    return val;
  }





  public onChangeZRangePri() {
    this.amp.setRangePri();
  }

  public onChangeZSEC() {
    if ((Number.isNaN(this.amp.impedanciaOut)) || (this.amp.impedanciaOut === 0) || this.amp.impedanciaOut === null) {
      //  this.amp.impedanciaIn = 0;
    } else {
      this.amp.setRtZ();
      if (this.t1Result === false) {
        this.amp.setT1z();
      } else {
        this.amp.setT2z();
      }
    }
  }





  public onChangeZPRI() {
    if ((Number.isNaN(this.amp.impedanciaIn)) || (this.amp.impedanciaIn === 0) || this.amp.impedanciaIn === null) {
      //this.amp.impedanciaIn = 0;
    } else {
      this.amp.impedanciaIn = this.amp.redondea10(this.amp.impedanciaIn);
      this.rangeSelected('Zi');
      this.rtResult = false;
      this.amp.setRtZ();
      if (this.t1Result === false) {
        this.amp.setT1z();
      } else {
        this.amp.setT2z();
      }
      this.onChangeVopp();
    }
  }


  public onChangeRT() {
    if ((Number.isNaN(this.amp.relacionTrans)) || (this.amp.relacionTrans === 0) || this.amp.relacionTrans === null) {
      //   this.amp.relacionTrans = 0;
    } else {
      this.rangeSelected('RT');
      if (this.rtResult === true) {
        if (this.t2Result === true) {
          this.amp.setT1();
        } else {
          this.amp.setT2();
        }
        this.amp.setZi();
      }
      this.onChangeVopp();
    }
  }




  public onChangePRI() {
    if ((Number.isNaN(this.amp.turn1)) || (this.amp.turn1 === 0) || this.amp.turn1 === null) {
      //   this.amp.turn1 = 0;
    } else {
      if (this.ziResult === true) {
        this.rangeSelected('T1');
        this.amp.setT2();
      }
      else if (this.rtResult === false) {
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
      //   this.amp.turn2 = 0;
    } else {
      if (this.ziResult === true) {
        this.rangeSelected('T2');
        this.amp.setT1();
      } else if (this.rtResult === false) {
        this.amp.setRT();
        this.amp.setZi();
      } else {
        this.rangeSelected('T2');
        this.amp.setT1();
      }
    }
  }




  public onChangeVPri() {
    if ((Number.isNaN(this.amp.voltajeInDc)) || (this.amp.voltajeInDc === 0) || this.amp.voltajeInDc === null) {
      //    this.amp.voltajeInPp = 0;
    } else {
      this.rangeSelected('VI');
      this.amp.setV(this.amp.VI_PICO, this.amp.voltajeInDc);
    }
  }

  public onChangeVopp() {
    if ((Number.isNaN(this.amp.voltajeOutPp)) || (this.amp.voltajeOutPp === 0) || this.amp.voltajeOutPp === null) {
      //    this.amp.voltajeOutPp = 0;
    } else {
      this.rangeSelected('VOPP');
      this.amp.setV(this.amp.VO_PICO_PICO, this.amp.voltajeOutPp);
    }
  }

  public onChangeVorms() {
    if ((Number.isNaN(this.amp.voltajeOutRms)) || (this.amp.voltajeOutRms === 0) || this.amp.voltajeOutRms === null) {
      //      this.amp.voltajeOutRms = 0;
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



