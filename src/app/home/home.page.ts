import { Component, OnInit } from '@angular/core';
import { TubeAmpA } from './../clases/TubeAmp_a';
import { Helper } from '../clases/helper';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  app: any = {
    titulo: 'Tube calculator',
  };

  public CALCULAR_V = 'V';
  public CALCULAR_R = 'R';


  t1Result = true;
  t2Result = false;
  rtResult = true;
  ziResult = false;
  viResult = false;

  public modo = this.CALCULAR_V;

  amp: TubeAmpA;

  // Chart Values //
  // Data
  chartData: ChartDataSets[] = [];

  // Options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    },
    pan: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      //  backgroundColor: ['#ff4961', '#ffd534', '#2fdf75']
    }
  ];
  chartType = 'line';
  showLegend = false;



  constructor(
    public tubeAmp: TubeAmpA,
    public helper: Helper
  ) {
    this.amp = tubeAmp;
    document.body.setAttribute('color-theme', 'dark');
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.amp.setIi();
    this.onChangeZSEC();
    this.setGrafica();
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



  public togglePageMode(k: any) {
    switch (k) {
      case this.CALCULAR_V:
        this.modo = this.CALCULAR_V;
        this.amp.getPOuts();
        break;
      case this.CALCULAR_R:
        this.modo = this.CALCULAR_R;
        break;
      default:
        break;
    }
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




  public getIPriTrunc() {
    let Iintrunc = this.amp.intensidadIn * 10000;
    Iintrunc = Math.trunc(Iintrunc);
    Iintrunc = Iintrunc / 10;
    const s = Iintrunc.toString();
    const l = s.length;
    const decimalLength = s.indexOf('.') + 1;
    if (decimalLength !== 0) {
      const numStr = s.substr(0, decimalLength + 1);
      return Number(numStr);
    } else {
      return Iintrunc.toString() + '.0';
    }
  }



  public getZPriTrunc() {
    let Zintrunc = this.amp.impedanciaIn / 100;
    Zintrunc = Math.trunc(Zintrunc);
    Zintrunc = Zintrunc / 10;
    const s = Zintrunc.toString();
    const l = s.length;
    const decimalLength = s.indexOf('.') + 1;
    if (decimalLength !== 0) {
      const numStr = s.substr(0, decimalLength + 1);
      return Number(numStr);
    } else {
      return Zintrunc.toString() + '.0';
    }
  }

  getImgTube3(activar: number) {
    if (activar === 0) {
      return false;
    } else {
      if (this.amp.intensidadIn >= this.amp.i843) {
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
      if (this.amp.i843 > this.amp.intensidadIn && this.amp.intensidadIn >= this.amp.i842) {
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
      if (this.amp.i842 > this.amp.intensidadIn && this.amp.intensidadIn >= this.amp.i841) {
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
      if (this.amp.intensidadIn < this.amp.i841) {
        return false;
      } else {
        return true;
      }
    }
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
      // this.amp.impedanciaIn = 0;
    } else {
      this.amp.impedanciaIn = this.helper.redondea50(this.amp.impedanciaIn);
      if (this.amp.impedanciaIn === 0) {
        this.amp.impedanciaIn = 50;
      }
      this.rangeSelected('Zi');
      this.rtResult = false;
      this.amp.setRtZ();
      this.amp.setIi();
      this.setGrafica();
      if (this.t1Result === false) {
        this.amp.setT1z();
      } else {
        this.amp.setT2z();
      }
      // TODO shitch entre onChangePRI / onChangeP
      this.onChangeP();
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
        this.amp.setIi();
        this.setGrafica();
      }
      // TODO shitch entre onChangePRI / onChangeP
      this.onChangeP();
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
        this.amp.setIi();
        this.setGrafica();
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
        this.amp.setIi();
        this.setGrafica();
      } else {
        this.rangeSelected('T2');
        this.amp.setT1();
      }
    }
  }

  public onChangeVPri() {
    if ((Number.isNaN(this.amp.voltajeInTns)) || (this.amp.voltajeInTns === 0) || this.amp.voltajeInTns === null) {
      //    this.amp.voltajeInPp = 0;
    } else {
      this.rangeSelected('VI');
      this.amp.setV(this.amp.VI_PICO, this.amp.voltajeInTns);
      this.amp.getPOuts();
      this.amp.setIi();
      this.setGrafica();
    }
  }

  public onChangeVopp() {
    if ((Number.isNaN(this.amp.voltajeOutPp)) || (this.amp.voltajeOutPp === 0) || this.amp.voltajeOutPp === null) {
      //    this.amp.voltajeOutPp = 0;
    } else {
      this.rangeSelected('VOPP');
      this.amp.setV(this.amp.VO_PICO_PICO, this.amp.voltajeOutPp);
      this.amp.getPOuts();
      this.amp.setIi();
      this.setGrafica();
    }
  }

  public onChangeVorms() {
    if ((Number.isNaN(this.amp.voltajeOutRms)) || (this.amp.voltajeOutRms === 0) || this.amp.voltajeOutRms === null) {
      //      this.amp.voltajeOutRms = 0;
    } else {
      this.rangeSelected('VORMS');
      this.amp.setV(this.amp.VO_RNS, this.amp.voltajeOutRms);
      this.amp.getPOuts();
      this.amp.setIi();
      this.setGrafica();
    }
  }

  public onChangeP() {
    if ((Number.isNaN(this.amp.potenciaRms)) || (this.amp.potenciaRms === 0) || this.amp.potenciaRms === null) {
      //    this.amp.potenciaRms = 0;
    } else {
      this.amp.setVP();
      this.amp.setIi();
      this.setGrafica();
    }
  }



  public setGrafica() {
    this.chartData = [{
      data: [{ x: 0, y: this.amp.intensidadIn }, { x: this.amp.voltajeInTns, y: 0 }]
    }];

  }

}



