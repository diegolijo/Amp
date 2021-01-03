import { Injectable } from '@angular/core';



@Injectable()
export class TubeAmp_a {


    public VI_PICO = "vip";
    public VO_RNS = "vorms";
    public VO_PICO_PICO = "vopp";

    public CALCULAR_V = "V"
    public CALCULAR_R = "R"



    public calculaR: boolean = false;
    public calculaV: boolean = true;
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


    constructor() {
        this.reset();
        document.body.setAttribute('data-theme', 'dark');
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

    /*                   
                    this.potenciaRms = (Math.pow(this.voltajeOutRms, 2));         
                    this.voltajeOutRms = Math.sqrt(this.potenciaRms * this.impedanciaOut);              
    */


    public toggleVR(k: any) {
        switch (k) {
            case this.CALCULAR_V:
                this.calculaV = true;
                this.calculaR = false;
                this.modo = this.CALCULAR_V;
                this.getPOuts()
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




    public setV(p: string, v: number) {
        switch (p) {
            case this.VI_PICO:
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
        this.getPOuts()
    }



    public onChangeP() {

    }

    public onChangeSEC() {

    }

    public onChangePRI() {

    }

    public onChangeRT() {

    }
    public onChangeZO() {

    }
    public onChangeZI() {

    }


    public getPOuts() {
        switch (this.modo) {
            case this.CALCULAR_V:
                if (this.impedanciaOut != 0) {
                    if (this.impedanciaIn != 0) {
                        this.relacionTrans = Math.sqrt(this.impedanciaIn / this.impedanciaOut);
                        this.voltajeInDc = this.relacionTrans * this.voltajeOutPp;
                    }
                    // hay tension secundario trafo
                    if (this.voltajeOutRms != 0) {
                        this.potenciaRms = (Math.pow(this.voltajeOutRms, 2) / this.impedanciaOut);
                        //si hay z primario trafo  calculamos la tension entreda necesaria para satisfacer la relacionon de espiras Zs
                    }
                }
                break;
            case this.CALCULAR_R:
                if (this.impedanciaIn != 0 && this.impedanciaOut != 0) {
                    this.relacionTrans = Math.sqrt(this.impedanciaIn / this.impedanciaOut);
                }
                break;
            default:
                break;
        }
        return this;
    }








}