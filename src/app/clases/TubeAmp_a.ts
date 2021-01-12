import { Injectable } from '@angular/core';



@Injectable()
export class TubeAmpA {


    public VI_PICO = 'vip';
    public VO_RNS = 'vorms';
    public VO_PICO_PICO = 'vopp';

    public CALCULAR_V = 'V';
    public CALCULAR_R = 'R';



    public calculaR = true;
    public calculaV = false;
    public modo: string = this.CALCULAR_V;

    public voltajeInTns: number;
    public voltajeInPp: number;
    public voltajeInDc: number;
    public voltajeOutPp: number;
    public voltajeOutRms: number;
    public potenciaRms: number;
    public impedanciaIn: number;
    public impedanciaOut: number;
    public relacionTrans: number;
    public turn1: number;
    public turn2: number;
    public readonly RMS_FACTOR = 2 * Math.sqrt(2);

    public ziRange: number;

    constructor() {
        this.reset();
    }

    public reset() {
        this.relacionTrans = 12.6;
        this.turn1 = 650;
        this.turn2 = 51;

        this.ziRange = 5000;


        this.voltajeInTns = 0;
        this.voltajeInPp = 1;
        this.voltajeInDc = 1 / 2;
        this.voltajeOutPp = 1 * this.RMS_FACTOR;
        this.voltajeOutRms = 1;
        this.potenciaRms = 15;
        this.impedanciaIn = 2550;
        this.impedanciaOut = 8;
        this.setVP();
    }

    public toggleVR(k: any) {
        switch (k) {
            case this.CALCULAR_V:
                this.calculaV = true;
                this.calculaR = false;
                this.modo = this.CALCULAR_V;
                this.getPOuts();
                break;
            case this.CALCULAR_R:
                this.calculaV = false;
                this.calculaR = true;
                this.modo = this.CALCULAR_R;
                break;
            default:
                break;
        }
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
        this.relacionTrans = this.trunc(this.relacionTrans, 1);
    }

    public setRtZ() {
        this.relacionTrans = Math.sqrt(this.impedanciaIn / this.impedanciaOut);
     //   this.relacionTrans = this.trunc(this.relacionTrans, 1);
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


    public setRangePri() {

    }

    //            this.potenciaRms = (Math.pow(this.voltajeOutRms, 2));
    //           this.voltajeOutRms = Math.sqrt(this.potenciaRms * this.impedanciaOut);


    // ---------------funciones matematicas-----------------
    /**
     * redondea el numero de decimales
     * @param posiciones numero de decimales
     */
    public trunc(x, posiciones: number) {
        const s = x.toString();
        const l = s.length;
        const decimalLength = s.indexOf('.') + 1;
        if (decimalLength !== 0) {
            const numStr = s.substr(0, decimalLength + posiciones);
            return Number(numStr);
        } else {
            return x;
        }
    }
    /**
     * redondeda a la decena mas proxima;
     */
    public redondea10(v: number) {
        v /= 10;
        v = Math.round(v);
        return v *= 10;
    }


    // ------------------------tensiones--------------------------
    public setV(p: string, v: number) {
        switch (p) {
            case this.VI_PICO:
                this.voltajeOutPp = this.voltajeInDc / this.relacionTrans;
                this.voltajeOutRms = this.voltajeOutPp / this.RMS_FACTOR;
                this.potenciaRms = (Math.pow(this.voltajeOutRms, 2) / this.impedanciaOut);
                break;
            case this.VO_PICO_PICO:
                this.voltajeOutRms = this.voltajeOutPp / this.RMS_FACTOR;
                break;
            case this.VO_RNS:
                this.voltajeOutPp = this.voltajeOutRms * this.RMS_FACTOR;
                break;
            default:
                break;
        }
        this.getPOuts();
    }


    public getPOuts() {
        this.voltajeInDc = this.relacionTrans * this.voltajeOutPp;
        this.potenciaRms = (Math.pow(this.voltajeOutRms, 2) / this.impedanciaOut);
        return this;
    }


    public setVP() {
        if (Number.isNaN(this.potenciaRms)) {
            this.potenciaRms = 0;
        }
        const res = this.potenciaRms * this.impedanciaOut;
        this.voltajeOutRms = Math.sqrt(res);
        this.voltajeOutPp = this.voltajeOutRms * this.RMS_FACTOR;
        this.voltajeInDc = this.voltajeOutPp * this.relacionTrans;
    }
}
