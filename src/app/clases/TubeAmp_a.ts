import { Injectable } from '@angular/core';



@Injectable()
export class TubeAmp_a {



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


    constructor() {
        this.reset();
    }


    public getPOuts() {
     //   this.Pp_Rms();
      //  this.zTs();
        // hay altavoz
        if (this.impedanciaOut != 0) {
            // hay tension secundario trafo
            if (this.voltajeOutRms != 0) {
                this.potenciaRms = (Math.pow(this.voltajeOutRms, 2));
                //si hay z primario trafo
            } else if (this.impedanciaIn != 0) {
                // hay pot de salida
            } else if (this.potenciaRms != 0) {
                this.voltajeOutRms = Math.sqrt(this.potenciaRms * this.impedanciaOut);

            }
            // no hay altavoz    
        } else {

            // hay tension secundario trafo
            if (this.voltajeOutRms != 0 || this.voltajeOutRms) {
                //si hay z primario trafo
            } else if (this.impedanciaIn != 0) {
            }
        }
        return this;
    }

    private Pp_Rms() {
        if (this.voltajeOutPp != 0) {
            this.voltajeOutRms = this.voltajeOutRms / this.RMS_FACTOR;
        } else if (this.voltajeOutRms != 0) {
            this.voltajeOutRms = this.voltajeOutRms * this.RMS_FACTOR;
        }
        if (this.voltajeInDc != 0) {
            this.voltajeInPp = this.voltajeInDc / 2;
        } else if (this.voltajeInPp != 0) {
            this.voltajeInDc = this.voltajeInPp * 2;
        }
    }

    private zTs() {
        if (this.impedanciaOut != 0 && this.relacionTrans != 0) {
            this.impedanciaIn = (Math.pow(this.relacionTrans, 2) * this.impedanciaOut);
        } else if (this.impedanciaIn != 0 && this.impedanciaOut != 0) {
            this.relacionTrans = Math.sqrt(this.impedanciaOut / this.impedanciaIn);
        } else if (this.impedanciaIn != 0 && this.relacionTrans != 0) {
            this.impedanciaOut = this.impedanciaIn / this.relacionTrans;
        } else if (this.impedanciaOut != 0 && this.voltajeOutPp != 0 && this.voltajeInPp != 0) {
            this.relacionTrans = this.voltajeInPp / this.voltajeOutPp;
        }
    }

    public reset() {
        this.voltajeInTns = 0;
        this.voltajeInPp = 0;
        this.voltajeInDc = 0;
        this.voltajeOutPp = 0;
        this.voltajeOutRms = 0;
        this.potenciaRms = 0;
        this.impedanciaIn = 0;
        this.impedanciaOut = 0;
        this.relacionTrans = 0;
        this.turn1 = 0;
        this.turn2 = 0;
    }








}