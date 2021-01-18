import { Injectable } from '@angular/core';
import { Helper } from './helper';



@Injectable()
export class TubeAmpA {


    public VI_PICO = 'vip';
    public VO_RNS = 'vorms';
    public VO_PICO_PICO = 'vopp';


    public i840 = 0.030;
    public i841 = 0.035;
    public i842 = 0.040;
    public i843 = 0.045;


    public intensidadIn: number;
    public voltajeInTns: number;
    public voltajeInDc: number;

    public voltajeOutPp: number;
    public voltajeOutRms: number;
    public potenciaRms: number;

    public impedanciaIn: number;
    public impedanciaOut: number;
    public relacionTrans: number;
    public turn1: number;
    public turn2: number;

    public ziRange: number;


    constructor(public helper: Helper) {
        this.reset();
    }

    public reset() {
        this.relacionTrans = 12.6;
        this.turn1 = 650;
        this.turn2 = 51;
        this.ziRange = 5000;
        this.voltajeInTns = 0;
        this.voltajeInDc = 0;
        this.voltajeOutPp = 1 * Helper.RMS_FACTOR;
        this.voltajeOutRms = 1;
        this.potenciaRms = 15;
        this.intensidadIn = 0;
        this.impedanciaIn = 2550;
        this.impedanciaOut = 8;
        this.setVP();
    }




    public setT1() {
        this.turn1 = this.turn2 * this.relacionTrans;
        this.turn1 = Math.trunc(this.turn1);
    }

    public setT2() {
        this.turn2 = this.turn1 / this.relacionTrans;
        this.turn2 = Math.trunc(this.turn2);
    }

    public setRT() {
        this.relacionTrans = this.turn1 / this.turn2;
        this.relacionTrans = this.helper.trunc(this.relacionTrans, 1);
    }

    public setRtZ() {
        this.relacionTrans = Math.sqrt(this.impedanciaIn / this.impedanciaOut);
        this.relacionTrans = this.helper.trunc(this.relacionTrans, 1);
    }

    public setT1z() {
        this.turn1 = this.turn2 * this.relacionTrans;
        this.turn1 = Math.trunc(this.turn1);
    }
    public setT2z() {
        this.turn2 = this.turn1 / this.relacionTrans;
        this.turn2 = Math.trunc(this.turn2);
    }

    public setZi() {
        this.impedanciaIn = this.impedanciaOut * this.relacionTrans * this.relacionTrans;
        this.impedanciaIn = Math.trunc(this.impedanciaIn);
    }

    public setIi() {
        this.intensidadIn = this.voltajeInTns / this.impedanciaIn;
        this.intensidadIn = this.intensidadIn / Helper.RMS_FACTOR;
    }


    public setRangePri() {

    }

    //            this.potenciaRms = (Math.pow(this.voltajeOutRms, 2));
    //           this.voltajeOutRms = Math.sqrt(this.potenciaRms * this.impedanciaOut);




    // ------------------------tensiones--------------------------
    public setV(p: string, v: number) {
        switch (p) {
            case this.VI_PICO:
                this.voltajeOutPp = this.voltajeInTns / this.relacionTrans;
                this.voltajeOutRms = this.voltajeOutPp / Helper.RMS_FACTOR;
                this.potenciaRms = (Math.pow(this.voltajeOutRms, 2) / this.impedanciaOut);

                this.potenciaRms = this.helper.trunc(this.potenciaRms, 1);
                this.voltajeOutPp = this.helper.trunc(this.voltajeOutPp, 1);
                this.voltajeOutRms = this.helper.trunc(this.voltajeOutRms, 1);
                break;
            case this.VO_PICO_PICO:
                this.voltajeOutRms = this.voltajeOutPp / Helper.RMS_FACTOR;

                this.voltajeOutRms = this.helper.trunc(this.voltajeOutRms, 1);
                break;
            case this.VO_RNS:
                this.voltajeOutPp = this.voltajeOutRms * Helper.RMS_FACTOR;

                this.voltajeOutPp = this.helper.trunc(this.voltajeOutPp, 1);
                break;
            default:
                break;
        }
        
    }


    public getPOuts() {
        this.potenciaRms = (Math.pow(this.voltajeOutRms, 2) / this.impedanciaOut);
        this.potenciaRms = this.helper.trunc(this.potenciaRms, 1);
        return this;
    }


    public setVP() {
        if (Number.isNaN(this.potenciaRms)) {
            this.potenciaRms = 0;
        }
        const res = this.potenciaRms * this.impedanciaOut;
        this.voltajeOutRms = Math.sqrt(res);
        this.voltajeOutPp = this.voltajeOutRms * Helper.RMS_FACTOR;
        this.voltajeInTns = this.voltajeOutPp * this.relacionTrans;

        this.voltajeOutRms = this.helper.trunc(this.voltajeOutRms, 1);
        this.voltajeOutPp = this.helper.trunc(this.voltajeOutPp, 1);
        this.voltajeInTns = this.helper.trunc(this.voltajeInTns, 1);

    }
}
